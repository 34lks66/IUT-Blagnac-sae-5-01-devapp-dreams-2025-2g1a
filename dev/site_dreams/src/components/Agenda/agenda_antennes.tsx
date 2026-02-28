import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, ArrowRight, X } from "lucide-react";
import type { Event } from "../../data/type";

interface AgendaProps {
  antennaName?: string;
}

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

//--- UTILS ---
function groupEventsByMonth(events: Event[]) {
  const groups: Record<string, Event[]> = {};
  events.forEach((event) => {
    const date = new Date(event.date);
    const monthYear = date.toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
    });
    const formatted = monthYear.charAt(0).toUpperCase() + monthYear.slice(1);
    if (!groups[formatted]) groups[formatted] = [];
    groups[formatted].push(event);
  });
  return groups;
}

//--- COMPONENTS ---

const ListItem = ({ event, onClick }: { event: Event; onClick: () => void }) => {
  const dateObj = new Date(event.date);
  const day = dateObj.getDate();
  const weekday = dateObj.toLocaleString("fr-FR", { weekday: "long" });

  return (
    <div onClick={onClick} className="cursor-pointer group relative flex items-start sm:items-center gap-4 p-4 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 transition-all duration-200 overflow-hidden">
      {/* Background Image */}
      {event.image && (
        <div className="absolute inset-y-0 right-0 left-24 z-0 overflow-hidden">
          <img
            src={event.image}
            alt=""
            className="w-full h-full object-cover blur-[2px] opacity-[0.30] scale-105"
          />
        </div>
      )}

      {/* Left: Date */}
      <div className="relative z-10 flex-shrink-0 w-16 text-center">
        <span className="block text-2xl font-bold text-gray-900 leading-none">{day}</span>
        <span className="block text-xs text-gray-400 font-medium capitalize mt-1">{weekday}</span>
      </div>

      {/* Divider */}
      <div className="relative z-10 h-8 w-px bg-gray-200 mx-2 hidden sm:block"></div>

      {/* Right: Content */}
      <div className="relative z-10 flex-grow min-w-0">
        <h4 className="text-base font-bold text-gray-900 truncate group-hover:text-[#d4af37] transition-colors">
          {event.title}
        </h4>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
          {event.time && <span>{event.time}</span>}
          {event.location && (
            <span className="flex items-center">
              <span className="w-1 h-1 bg-gray-300 rounded-full mr-2"></span>
              {event.location}
            </span>
          )}
        </div>
      </div>

      {/* Arrow */}
      <div className="relative z-10 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform duration-200">
        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
          <ArrowRight className="w-4 h-4 text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default function Agenda({ antennaName }: AgendaProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  function getAntennaFromQuery(): string | null {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get("antenna") || params.get("antenne") || null;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    const ctrl = new AbortController();
    const antennaParam = antennaName ?? getAntennaFromQuery();

    const isObjectId = (s: string) => /^[0-9a-fA-F]{24}$/.test(s);

    async function fetchEventsByAntennaId(id: string) {
      const res = await fetch(`${API_BASE}/api/event/get/?antenna=${encodeURIComponent(id)}`, { signal: ctrl.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) || [];
    }

    async function fetchAll() {
      setLoading(true);
      setError(null);
      try {
        if (!antennaParam) {
          const res = await fetch(`${API_BASE}/api/events`, { signal: ctrl.signal });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          const normalized = Array.isArray(data) ? data : [];
          const mapped = normalized.map((e: any, idx: number) => ({
            id: e.id ?? e._id ?? idx,
            title: e.title ?? "",
            date: e.date ?? "",
            time: [e.starttime, e.endtime].filter(Boolean).join(" - ") || e.time || "",
            location: e.location ?? "",
            description: e.description ?? "",
            antenna: e.antennaName ?? e.antenna ?? "",
            image: e.image
              ? (e.image.startsWith("http") ? e.image : `${API_BASE}${e.image}`)
              : null,
          })) as Event[];
          mapped.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          setEvents(mapped);
          return;
        }

        if (isObjectId(antennaParam)) {
          const data = await fetchEventsByAntennaId(antennaParam);
          const normalized = Array.isArray(data) ? data : [];
          const mapped = normalized.map((e: any, idx: number) => ({
            id: e.id ?? e._id ?? idx,
            title: e.title ?? "",
            date: e.date ?? "",
            time: [e.starttime, e.endtime].filter(Boolean).join(" - ") || e.time || "",
            location: e.location ?? "",
            description: e.description ?? "",
            antenna: e.antennaName ?? e.antenna ?? antennaParam,
            image: e.image
              ? (e.image.startsWith("http") ? e.image : `${API_BASE}${e.image}`)
              : null,
          })) as Event[];
          mapped.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          setEvents(mapped);
          return;
        }

        const resAnt = await fetch(`${API_BASE}/api/antenne/get`, { signal: ctrl.signal });
        if (!resAnt.ok) throw new Error(`HTTP ${resAnt.status} fetching antennes`);
        const antennes = await resAnt.json();
        const matches = (antennes || []).filter((a: any) =>
          String(a.nom).trim().toLowerCase() === String(antennaParam).trim().toLowerCase()
        );

        if (matches.length === 0) {
          setEvents([]);
          return;
        }

        const idToName = new Map<string, string>();
        matches.forEach((m: any) => idToName.set(String(m._id), m.nom || antennaParam));

        const promises = matches.map((m: any) => fetchEventsByAntennaId(String(m._id)));
        const results = await Promise.all(promises);
        const allEventsRaw = results.flat();
        const normalized = Array.isArray(allEventsRaw) ? allEventsRaw : [];
        const mapped = normalized.map((e: any, idx: number) => {
          const antennaId = e.antenna ?? e.antennaId ?? e._id ?? null;
          const antennaLabel = (antennaId && idToName.get(String(antennaId))) || e.antennaName || antennaParam;
          return {
            id: e.id ?? e._id ?? idx,
            title: e.title ?? "",
            date: e.date ?? "",
            time: [e.starttime, e.endtime].filter(Boolean).join(" - ") || e.time || "",
            location: e.location ?? "",
            description: e.description ?? "",
            antenna: antennaLabel,
            image: e.image
              ? (e.image.startsWith("http") ? e.image : `${API_BASE}${e.image}`)
              : null,
          } as Event;
        });

        const uniqMap = new Map<string | number, Event>();
        mapped.forEach((ev) => uniqMap.set(ev.id ?? `${ev.title}-${ev.date}`, ev));
        const uniq = Array.from(uniqMap.values());
        uniq.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setEvents(uniq);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(err.message || "Erreur lors du chargement");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
    return () => ctrl.abort();
  }, [antennaName]);

  const groupedEvents = groupEventsByMonth(events);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-20">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-10 h-1 bg-[#d4af37]"></span>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 uppercase">
              Agenda {antennaName && <span className="text-[#d4af37]">{antennaName}</span>}
            </h1>
          </div>
          <p className="text-gray-500 max-w-xl text-lg">
            Découvrez les prochains événements et activités de cette antenne.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-20">
        {loading && (
          <div className="animate-pulse space-y-8">
            <div className="h-8 w-48 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-64 bg-gray-200 rounded-2xl"></div>
              <div className="h-64 bg-gray-200 rounded-2xl"></div>
              <div className="h-64 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-6 bg-red-50 text-red-600 rounded-xl border border-red-100">
            <b>Erreur:</b> {error}
          </div>
        )}

        {!loading && events.length === 0 && (
          <div className="text-center py-20 opacity-60">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>Aucun événement programmé pour cette antenne.</p>
          </div>
        )}

        {!loading && events.length > 0 && (
          <>
            {/* CALENDRIER COMPLET */}
            <section>
              <div className="flex items-baseline justify-between mb-8 border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  Calendrier Complet
                </h2>
              </div>

              <div className="space-y-12">
                {Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
                  <div key={monthYear}>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 pl-4 border-l-2 border-[#d4af37]">
                      {monthYear}
                    </h3>
                    <div className="grid gap-2">
                      {monthEvents.map((event) => (
                        <div key={`list-${event.id}`}>
                          <ListItem event={event} onClick={() => setSelectedEvent(event)} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      {/* Modal détail événement */}
      {selectedEvent !== null && (() => {
        const ev = selectedEvent;
        const dateObj = new Date(ev.date);
        return (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <div
              className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {ev.image && (
                <div className="relative h-56 overflow-hidden rounded-t-2xl">
                  <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              )}

              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex flex-col items-center bg-[#d4af37]/10 rounded-xl px-4 py-2 border border-[#d4af37]/20">
                    <span className="text-xs font-bold text-[#d4af37] uppercase">
                      {dateObj.toLocaleString("fr-FR", { month: "short" }).toUpperCase()}
                    </span>
                    <span className="text-2xl font-black text-gray-900">
                      {dateObj.getDate()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 capitalize">
                    {dateObj.toLocaleString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">{ev.title}</h2>

                <div className="flex flex-wrap gap-3 mb-6">
                  {ev.time && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
                      <Clock className="w-4 h-4 text-[#d4af37]" />
                      {ev.time}
                    </div>
                  )}
                  {ev.location && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
                      <MapPin className="w-4 h-4 text-[#d4af37]" />
                      {ev.location}
                    </div>
                  )}
                </div>

                {ev.description && (
                  <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{ev.description}</p>
                  </div>
                )}

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="px-6 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}