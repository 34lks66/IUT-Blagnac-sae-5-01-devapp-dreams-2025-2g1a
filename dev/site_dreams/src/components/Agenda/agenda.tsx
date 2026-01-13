import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, Info } from "lucide-react";
import type { Event } from "../../data/type";

function groupEventsByMonth(events: Event[]) {
  const groups: Record<string, Event[]> = {};

  events.forEach((event) => {
    const date = new Date(event.date);
    const monthYear = date.toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
    });
    if (!groups[monthYear]) groups[monthYear] = [];
    groups[monthYear].push(event);
  });

  return groups;
}

export default function Agenda() {
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    async function fetchGeneral() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/event/get/?general=true`, { signal: ctrl.signal });
        if (!res.ok) {
          throw new Error(`Erreur HTTP ${res.status}`);
        }
        const data = await res.json();
        const normalized: Event[] = Array.isArray(data) ? data.map((e: any, idx: number) => ({
          id: e.id ?? e._id ?? idx,
          title: e.title,
          date: e.date,
          time: e.time,
          location: e.location,
          description: e.description,
          antenna: e.antenna ?? null,
        })) : [];
        normalized.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setEvents(normalized);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error(err);
          setError(err.message || 'Erreur lors du chargement des événements');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchGeneral();
    return () => ctrl.abort();
  }, [API_BASE]);

  const groupedEvents = groupEventsByMonth(events);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#d4af37] to-[#a87700] text-white py-12 px-4 border-b-2" style={{ borderImage: "linear-gradient(to right, #f59e0b, #93720a) 1" }}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center mb-3">
            <Calendar className="w-10 h-10 mr-3" />
            <h1 className="text-4xl font-bold">Agenda <span className="notranslate" translate="no">DREAMS</span></h1>
          </div>
          <p className="text-lg text-white/95 mt-2">
            Découvrez tous nos événements à venir
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#d4af37] border-t-transparent"></div>
            <p className="mt-4 text-gray-700">Chargement des événements…</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow">
            <p className="text-red-700 font-semibold">⚠ Erreur : {error}</p>
          </div>
        )}

        {!loading && events.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center border border-gray-200">
            <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-700 font-semibold">
              Aucun événement à venir pour le moment.
            </p>
            <p className="text-gray-500 mt-2">Revenez bientôt pour découvrir nos prochaines activités !</p>
          </div>
        )}

        {/* Events grouped by month */}
        {Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
          <div key={monthYear} className="mb-10">
            <div className="flex items-center mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#d4af37] to-[#a87700] bg-clip-text text-transparent capitalize">
                {monthYear}
              </h2>
              <div className="h-[2px] flex-grow ml-4 bg-gradient-to-r from-[#d4af37] to-transparent"></div>
            </div>

            <div className="grid gap-5">
              {monthEvents.map((event) => {
                const dateObj = new Date(event.date);
                const day = dateObj.getDate();
                const month = dateObj
                  .toLocaleString("fr-FR", { month: "short" })
                  .toUpperCase();
                const dayName = dateObj
                  .toLocaleString("fr-FR", { weekday: "long" });

                const card = (
                  <div
                    key={String(event.id)}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Date Box */}
                      <div className="bg-blue-500 text-white p-5 md:w-28 flex md:flex-col items-center justify-center text-center">
                        <div>
                          <p className="text-4xl font-bold leading-none">{day}</p>
                          <p className="text-sm font-semibold mt-1">{month}</p>
                          <p className="text-xs mt-1 opacity-90 capitalize">{dayName}</p>
                        </div>
                      </div>

                      {/* Event Content */}
                      <div className="flex-1 p-5">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#a87700] transition">
                            {event.title}
                          </h3>
                          {event.antenna && (
                            <span className="bg-gradient-to-r from-[#d4af37] to-[#a87700] text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ml-2">
                              {event.antenna}
                            </span>
                          )}
                        </div>

                        <div className="space-y-2 mb-3">
                          {event.time && (
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-4 h-4 mr-2 text-[#a87700]" />
                              <span className="text-sm">{event.time}</span>
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center text-gray-600">
                              <MapPin className="w-4 h-4 mr-2 text-[#a87700]" />
                              <span className="text-sm">{event.location}</span>
                            </div>
                          )}
                        </div>

                        {event.description && (
                          <div className="flex items-start text-gray-700 bg-gray-50 p-3 rounded-lg">
                            <Info className="w-4 h-4 mr-2 text-[#a87700] mt-0.5 flex-shrink-0" />
                            <p className="text-sm leading-relaxed">{event.description}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );

                const antenneSlug = String(event.antenna)
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  //.toLowerCase()
                  .replace(/\s+/g, "-");

                return event.antenna ? (
                  <a
                    key={String(event.id)}
                    href={`/villes/${encodeURIComponent(antenneSlug)}`}
                    className="block no-underline text-inherit"
                  >
                    {card}
                  </a>
                ) : (
                  <div key={String(event.id)}>{card}</div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}