// ...existing code...
import { useEffect, useState } from "react";
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
    const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001';
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const ctrl = new AbortController();
        async function fetchGeneral() {
            setLoading(true);
            setError(null);
            try {
                // on demande uniquement l'agenda général
                const res = await fetch(`${API_BASE}/api/events?general=true`, { signal: ctrl.signal });
                if (!res.ok) {
                    throw new Error(`Erreur HTTP ${res.status}`);
                }
                const data = await res.json();
                // normaliser les ids (backend peut renvoyer _id)
                const normalized: Event[] = Array.isArray(data) ? data.map((e: any, idx: number) => ({
                    id: e.id ?? e._id ?? idx,
                    title: e.title,
                    date: e.date,
                    time: e.time,
                    location: e.location,
                    description: e.description,
                    antenna: e.antenna ?? null,
                })) : [];
                // trier par date descendante (comme avant)
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
        <div className="max-w-4xl mx-auto my-12 px-4">
            <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
                Agenda <span className="text-yellow-500">DREAMS</span>
            </h1>

            {loading && <p className="text-center text-gray-600">Chargement des événements…</p>}
            {error && <p className="text-center text-red-600">Erreur : {error}</p>}
            {!loading && events.length === 0 && (
                <p className="text-center text-gray-600">Aucun événement à venir pour le moment. Revenez bientôt !</p>
            )}

            {Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
                <div key={monthYear} className="mb-10">
                    <h2 className="text-2xl font-semibold text-yellow-500 mb-4 capitalize border-b pb-2">
                        {monthYear}
                    </h2>

                    {/* Liste des événements */}
                    <div className="space-y-4">
                        {monthEvents.map((event) => {
                            const dateObj = new Date(event.date);
                            const day = dateObj.getDate();
                            const month = dateObj
                                .toLocaleString("fr-FR", { month: "short" })
                                .toUpperCase();

                            return (
                                <div
                                    key={String(event.id)}
                                    className="flex items-center bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
                                >
                                    <div className="bg-yellow-400 text-white rounded-xl px-3 py-2 text-center mr-4">
                                        <p className="text-2xl font-bold">{day}</p>
                                        <p className="text-xs uppercase">{month}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold">{event.title}</h3>
                                        <p className="text-gray-600">
                                            {event.location} {event.time ? `à ${event.time}` : ''}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {event.description}
                                        </p>
                                        <p className="text-base text-yellow-600">
                                            {event.antenna ?? 'Général'}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            ))}
        </div>
    );
}
// ...existing code...