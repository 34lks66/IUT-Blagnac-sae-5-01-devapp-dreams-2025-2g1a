import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Event } from "../../data/type";

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

const FeaturedCard = ({ event, index }: { event: Event; index: number }) => {
  const dateObj = new Date(event.date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("fr-FR", { month: "short" }).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col h-full overflow-hidden"
    >
      {/* Background Image Area */}
      <div className="absolute top-0 left-0 w-full h-32 z-0 overflow-hidden rounded-t-2xl">
        {event.image ? (
          <img
            src={event.image}
            alt=""
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
        )}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-white"></div>
      </div>

      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex flex-col items-center bg-neutral-50 rounded-xl p-3 border border-gray-100 min-w-[70px]">
          <span className="text-xs font-bold text-[#d4af37] tracking-wider uppercase">{month}</span>
          <span className="text-2xl font-black text-gray-900">{day}</span>
        </div>
        {event.antenna && (
          <span className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold rounded-full shadow-sm">
            {event.antenna}
          </span>
        )}
      </div>

      <div className="mt-2 mb-4 flex-grow relative z-10">
        <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-[#d4af37] transition-colors line-clamp-2 mb-2">
          {event.title}
        </h3>
        <div className="flex flex-col gap-1 text-sm text-gray-500">
          {event.location && (
            <div className="flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1.5 opacity-70" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
          {event.time && (
            <div className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1.5 opacity-70" />
              <span>{event.time}</span>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 mt-auto pt-4 border-t border-gray-50">
        <div className="flex items-center text-sm font-semibold text-gray-900 group-hover:text-[#d4af37] transition-colors">
          En savoir plus <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

const ListItem = ({ event }: { event: Event }) => {
  const dateObj = new Date(event.date);
  const day = dateObj.getDate();
  const weekday = dateObj.toLocaleString("fr-FR", { weekday: "long" });

  return (
    <div className="group relative flex items-start sm:items-center gap-4 p-4 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 transition-all duration-200 overflow-hidden">
      {/* Background Image (Right Side Only, offset) */}
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
          {event.antenna && (
            <span className="flex items-center text-[#d4af37]">
              <span className="w-1 h-1 bg-current rounded-full mr-2"></span>
              {event.antenna}
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

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export default function Agenda() {
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/event/get/`, { signal: ctrl.signal });
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
        const data = await res.json();

        let normalized: Event[] = Array.isArray(data) ? data.map((e: any, idx: number) => ({
          id: e.id ?? e._id ?? idx,
          title: e.title,
          date: e.date,
          time: e.time,
          location: e.location,
          description: e.description,
          antenna: e.antenna ?? null,
          image: e.image
            ? (e.image.startsWith('http') ? e.image : `${API_BASE}${e.image}`)
            : null,
        })) : [];

        // Sort by date ascending (closest first)
        normalized.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setEvents(normalized);

      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error(err);
          setError(err.message || 'Erreur lors du chargement');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    return () => ctrl.abort();
  }, [API_BASE]);

  // Logic: Top 5, then All (grouped)
  const topEvents = events.slice(0, 5);
  const groupedEvents = groupEventsByMonth(events);

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-gray-900 pb-20">

      {/* Minimal Header */}
      <div className="bg-white border-b border-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-10 h-1 bg-[#d4af37]"></span>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 uppercase">
              Agenda <span className="text-[#d4af37] notranslate" translate="no">DREAMS</span>
            </h1>
          </div>
          <p className="text-gray-500 max-w-xl text-lg">
            Participez à nos événements, rencontres et ateliers pour faire vivre l'association.
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
            <p>Aucun événement programmé.</p>
          </div>
        )}

        {!loading && events.length > 0 && (
          <>
            {/* SECTION 1: A LA UNE (TOP 5) */}
            <section>
              <div className="flex items-baseline justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  À ne pas manquer
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                {topEvents.map((event, idx) => {
                  const antenneSlug = event.antenna
                    ? slugify(event.antenna)
                    : "";

                  const content = <FeaturedCard event={event} index={idx} />;

                  return event.antenna ? (
                    <a key={event.id} href={`/villes/${encodeURIComponent(antenneSlug)}`} className="block h-full">
                      {content}
                    </a>
                  ) : (
                    <div key={event.id} className="h-full">{content}</div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 2: CALENDRIER COMPLET (ALL) */}
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
                      {monthEvents.map((event) => {
                        const antenneSlug = event.antenna
                          ? slugify(event.antenna)
                          : "";
                        const content = <ListItem event={event} />;

                        return event.antenna ? (
                          <a key={`list-${event.id}`} href={`/villes/${encodeURIComponent(antenneSlug)}`} className="block">
                            {content}
                          </a>
                        ) : (
                          <div key={`list-${event.id}`}>{content}</div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}