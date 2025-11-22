import  { useEffect, useState } from "react";
import type { Event } from "../../data/type";

interface AgendaProps {
  antennaName?: string; // optionnel : peut venir de la query ou du parent
}

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Agenda({ antennaName }: AgendaProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        // pas d'antenne => récupérer tous les events
        if (!antennaParam) {
          const res = await fetch(`${API_BASE}/api/events`, { signal: ctrl.signal });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          const normalized = Array.isArray(data) ? data : [];
          const mapped = normalized.map((e: any, idx: number) => ({
            id: e.id ?? e._id ?? idx,
            title: e.title ?? "",
            date: e.date ?? "",
            time: e.time ?? "",
            location: e.location ?? "",
            description: e.description ?? "",
            antenna: e.antennaName ?? e.antenna ?? "",
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
            time: e.time ?? "",
            location: e.location ?? "",
            description: e.description ?? "",
            antenna: e.antennaName ?? e.antenna ?? antennaParam,
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
        // aplatir et normaliser
        const allEventsRaw = results.flat();
        const normalized = Array.isArray(allEventsRaw) ? allEventsRaw : [];
        const mapped = normalized.map((e: any, idx: number) => {
          const antennaId = e.antenna ?? e.antennaId ?? e._id ?? null;
          const antennaLabel = (antennaId && idToName.get(String(antennaId))) || e.antennaName || antennaParam;
          return {
            id: e.id ?? e._id ?? idx,
            title: e.title ?? "",
            date: e.date ?? "",
            time: e.time ?? "",
            location: e.location ?? "",
            description: e.description ?? "",
            antenna: antennaLabel,
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

  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      {loading && <p className="text-center text-gray-600">Chargement des événements…</p>}
      {error && <p className="text-center text-red-600">Erreur : {error}</p>}
      {!loading && events.length === 0 && <p className="text-center text-gray-600">Aucun événement à venir pour le moment.</p>}

      <div className="space-y-4">
        {events.map((event) => {
          const dateObj = new Date(event.date);
          const day = dateObj.getDate();
          const month = dateObj.toLocaleString("fr-FR", { month: "short" }).toUpperCase();
          return (
            <div
              key={String(event.id ?? `${event.title}-${event.date}`)}
              className="flex items-center bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
            >
              <div className="bg-yellow-400 text-white rounded-xl px-3 py-2 text-center mr-4">
                <p className="text-2xl font-bold">{day}</p>
                <p className="text-xs uppercase">{month}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-gray-600">{event.location} {event.time ? `— ${event.time}` : ""}</p>
                <p className="text-sm text-gray-500">{event.description}</p>
                <p className="text-base text-yellow-600">{event.antenna ?? "Général"}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}