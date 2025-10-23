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

type AntenneItem = {
  _id: string;
  nom: string;
};

const API_BASE = 'http://localhost:5001';

export default function AgendaAdmin() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [antennes, setAntennes] = useState<AntenneItem[]>([]);
  const [form, setForm] = useState<EventItem>({ title: '', date: '', isGeneral: false, antenna: null });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchAntennes = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/antenne/get`);
      if (!res.ok) return setAntennes([]);
      const data = await res.json();
      setAntennes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('fetchAntennes', err);
      setAntennes([]);
    }
  };

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
    fetchAntennes();
    fetchEvents();
  }, []);

  const isFormValid = () => {
    // titre et date requis + soit antenne soit isGeneral coché
    return !!form.title && !!form.date && (!!form.isGeneral || !!form.antenna);
  };

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setFormError(null);
    if (!isFormValid()) {
      setFormError("Remplissez le titre, la date et choisissez une antenne ou cochez 'Agenda général'.");
      return;
    }
    try {
      const method = form._id ? 'PUT' : 'POST';
      const url = form._id ? `${API_BASE}/api/events/${form._id}` : `${API_BASE}/api/events`;

      const payload = { ...form };
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setForm({ title: '', date: '', isGeneral: false, antenna: null });
      await fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  const edit = (ev: EventItem) => {
    const selectedAntenne = antennes.find(a => a.nom === ev.antenna);
    setForm({
      ...ev,
      antenna: selectedAntenne ? selectedAntenne._id : ev.antenna ?? null,
    });
    setFormError(null);
  };

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
          onChange={e => { setForm({ ...form, title: e.target.value }); setFormError(null); }}
          required
        />
        <input
          type="date"
          className="p-2 border rounded"
          value={form.date}
          onChange={e => { setForm({ ...form, date: e.target.value }); setFormError(null); }}
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

        <select
          className="p-2 border rounded col-span-1 md:col-span-2"
          value={form.antenna ?? ''}
          onChange={e => {
            const val = e.target.value || null;
            setForm({ ...form, antenna: val, isGeneral: val ? false : form.isGeneral });
            setFormError(null);
          }}
          disabled={!!form.isGeneral}
        >
          <option value="">Sélectionner une antenne</option>
          {antennes.map(a => (
            <option key={a._id} value={a._id}>{a.nom}</option>
          ))}
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={!!form.isGeneral}
            onChange={e => {
              const checked = e.target.checked;
              setForm({ ...form, isGeneral: checked, antenna: checked ? null : form.antenna });
              setFormError(null);
            }}
            disabled={!!form.antenna}
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
            <button
              type="button"
              onClick={() => { setForm({ title: '', date: '', isGeneral: false, antenna: null }); setFormError(null); }}
              className="px-3 py-1 border rounded"
            >
              Annuler
            </button>
          )}
          <button
            type="submit"
            onClick={submit}
            disabled={!isFormValid()}
            className={`px-4 py-2 text-white rounded ${isFormValid() ? 'bg-yellow-500' : 'bg-gray-300 cursor-not-allowed'}`}
          >
            {form._id ? 'Mettre à jour' : 'Créer'}
          </button>
        </div>
        {formError && <div className="col-span-1 md:col-span-3 text-red-600 text-sm">{formError}</div>}
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
