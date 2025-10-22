import React, { useEffect, useState } from 'react';

type EventItem = {
  _id?: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  antenna?: string | null;
  isGeneral?: boolean;
};

const API_BASE = 'http://localhost:5001';

export default function AgendaAdmin() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [form, setForm] = useState<EventItem>({ title: '', date: '', isGeneral: false });
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/events/`);
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!form.title || !form.date) return;
    try {
      const method = form._id ? 'PUT' : 'POST';
      const url = form._id ? `${API_BASE}/api/events/${form._id}` : `${API_BASE}/api/events`;
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setForm({ title: '', date: '', isGeneral: false });
      await fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  const edit = (ev: EventItem) => setForm(ev);

  const remove = async (id?: string) => {
    if (!id || !confirm('Supprimer cet événement ?')) return;
    try {
      await fetch(`${API_BASE}/api/events/${id}`, { method: 'DELETE' });
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Gestion Agenda</h2>
        <p className="text-gray-600">Gérer les événements (agenda général et antennes)</p>
      </div>

      <form onSubmit={submit} className="bg-white p-4 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          className="p-2 border rounded"
          placeholder="Titre"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="date"
          className="p-2 border rounded"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          className="p-2 border rounded"
          placeholder="Heure (ex: 14:00)"
          value={form.time ?? ''}
          onChange={e => setForm({ ...form, time: e.target.value })}
        />
        <input
          className="p-2 border rounded col-span-1 md:col-span-2"
          placeholder="Lieu"
          value={form.location ?? ''}
          onChange={e => setForm({ ...form, location: e.target.value })}
        />
        <input
          className="p-2 border rounded col-span-1 md:col-span-2"
          placeholder="Antenne (laisser vide = agenda général)"
          value={form.antenna ?? ''}
          onChange={e => setForm({ ...form, antenna: e.target.value || null })}
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={!!form.isGeneral}
            onChange={e => setForm({ ...form, isGeneral: e.target.checked })}
          />
          Agenda général
        </label>
        <textarea
          className="p-2 border rounded col-span-1 md:col-span-3"
          placeholder="Description"
          value={form.description ?? ''}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <div className="col-span-1 md:col-span-3 flex gap-2 justify-end">
          {form._id && (
            <button type="button" onClick={() => setForm({ title: '', date: '', isGeneral: false })} className="px-3 py-1 border rounded">
              Annuler
            </button>
          )}
          <button type="submit" onClick={submit} className="px-4 py-2 bg-yellow-500 text-white rounded">
            {form._id ? 'Mettre à jour' : 'Créer'}
          </button>
        </div>
      </form>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-semibold mb-3">Événements {loading ? '(chargement...)' : `(${events.length})`}</h3>
        <ul className="space-y-2">
          {events.map(ev => (
            <li key={ev._id} className="flex items-center justify-between p-2 border rounded">
              <div>
                <div className="font-medium">{ev.title}</div>
                <div className="text-xs text-gray-500">{ev.date} {ev.time ? `— ${ev.time}` : ''} — {ev.antenna || 'Général'}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => edit(ev)} className="px-2 py-1 border rounded text-sm">Modifier</button>
                <button onClick={() => remove(ev._id)} className="px-2 py-1 border rounded text-sm text-red-600">Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
