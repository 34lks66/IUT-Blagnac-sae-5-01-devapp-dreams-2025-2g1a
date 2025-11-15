import React, { useEffect, useState } from 'react';

type EventItem = {
  _id?: string;
  title: string;
  date: string;
  starttime?: string;
  endtime?: string;
  location?: string;
  description?: string;
  antenna?: string | null;
  isGeneral?: boolean;
};

type AntenneItem = {
  _id: string;
  nom: string;
};

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AgendaAdmin() {
  const [showForm, setShowForm] = useState(false);
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
      const res = await fetch(`${API_BASE}/api/event/get/`);
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
    // Vérifie les champs requis ET qu'il n'y a pas d'erreur de temps
    const hasTimeError = form.starttime && form.endtime && form.endtime < form.starttime;
    return !!form.title && !!form.date && (!!form.isGeneral || !!form.antenna) && !hasTimeError;
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
      const url = form._id ? `${API_BASE}/api/event/update/${form._id}` : `${API_BASE}/api/event/save`;

      const payload = { ...form };
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
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
      await fetch(`${API_BASE}/api/event/delete/${id}`, { method: 'DELETE', credentials: "include" });
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-extrabold ">Gestion Agenda</h1>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg transition-all duration-200 font-semibold inline-flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Ajouter
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="bg-white p-4 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
            <input 
              value={form.title}
              onChange={e => { setForm({ ...form, title: e.target.value }); setFormError(null); }}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input 
              type="date"
              value={form.date}
              onChange={e => { setForm({ ...form, date: e.target.value }); setFormError(null); }}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Heure de début</label>
            <input 
              type="time"
              value={form.starttime ?? ''}
              onChange={e => setForm({ ...form, starttime: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Heure de fin</label>
            <input 
              type="time"
              value={form.endtime ?? ''}
              onChange={e => setForm({ ...form, endtime: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                form.starttime && form.endtime && form.endtime < form.starttime 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-gray-300'
              }`}
            />
            {form.starttime && form.endtime && form.endtime < form.starttime && (
              <p className="text-red-500 text-sm mt-1">L'heure de fin doit être supérieure à l'heure de début</p>
            )}
          </div>

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
            <button
              type="button"
              onClick={() => { 
                setForm({ title: '', date: '', isGeneral: false, antenna: null }); 
                setFormError(null); 
                setShowForm(false);
              }}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-medium"
            >
              Annuler
            </button>
            
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`px-6 py-2 text-white rounded-lg font-medium ${
                isFormValid() 
                  ? 'bg-yellow-500 hover:bg-yellow-600' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {form._id ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
          
          {formError && <div className="col-span-1 md:col-span-3 text-red-600 text-sm">{formError}</div>}
        </form>
      )}

      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="font-semibold mb-3">Événements {loading ? '(chargement...)' : `(${events.length})`}</h3>
        <ul className="space-y-2">
          {events.map(ev => (
            <li key={ev._id} className="flex items-center justify-between p-2 border border-gray-300 rounded-lg">
              <div>
                <div className="font-medium">{ev.title}</div>
                <div className="text-xs text-gray-500">{ev.date} {ev.starttime ? `— ${ev.starttime}` : ''} : {ev.endtime ? ` ${ev.endtime}` : ''} — {ev.antenna || 'Général'}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setShowForm(true); edit(ev);}} 
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-sm font-medium"
                >Modifier</button>
                <button onClick={() => remove(ev._id)} 
                  className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 text-sm font-medium"
                >Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}