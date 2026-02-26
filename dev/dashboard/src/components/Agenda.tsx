import React, { useEffect, useState } from "react";

import { apiFetch } from "../services/api";
import { useAuth } from "./utils/useAuth";


type EventItem = {
  _id?: string;
  title: string;
  date: string;
  starttime?: string;
  endtime?: string;
  location?: string;
  description?: string;
  image?: string;
  antenna?: string | null;
  isGeneral?: boolean;
};

type AntenneItem = {
  _id: string;
  nom: string;
  pays: PaysItem;
};

type PaysItem = {
  _id: string;
  nom: string;
};

export default function AgendaAdmin() {
  const { role, pays, loading: authLoading } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [antennes, setAntennes] = useState<AntenneItem[]>([]);
  const [form, setForm] = useState<EventItem>({
    title: "",
    date: "",
    isGeneral: false,
    antenna: null,
  });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const API_BASE = "http://localhost:5000"; 

  useEffect(() => {
    if (!imageFile) {
      setImagePreview("");
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setImagePreview(url);

    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const fetchAntennes = async () => {
    if (authLoading) return;

    try {
      let endpoint = "/api/antenne/get";
      const res = await apiFetch(endpoint, { method: "GET" });
      if (!res.ok) return setAntennes([]);
      const data = await res.json();

      const filteredData = data.filter((antenne: AntenneItem) => antenne.pays.nom === pays);

      if (role === "X") {
        setAntennes(Array.isArray(filteredData) ? filteredData : []);
      } else {
        setAntennes(Array.isArray(data) ? data : []);
      }

    } catch (err) {
      console.error("fetchAntennes", err);
      setAntennes([]);
    }
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/api/event/get/`, { method: "GET" });
      const data = await res.json();

      const antenneNames = antennes.map(a => a.nom);

      const filteredData = data.filter((event: EventItem) =>
        antenneNames.includes(event.antenna || "")
      );

      if (role === "X") {
        setEvents(Array.isArray(filteredData) ? filteredData : []);
      } else {
        setEvents(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);

    }
  };

  useEffect(() => {
    fetchAntennes();
  }, [authLoading, pays, role]);

  useEffect(() => {
    fetchEvents();
  }, [antennes])

  const isFormValid = () => {
    const hasTimeError =
      form.starttime && form.endtime && form.endtime < form.starttime;

    const isRoleX = role === "X";
    const isAntennaMissing = isRoleX && !form.antenna;

    return (
      !!form.title &&
      !!form.date &&
      !hasTimeError &&
      !isAntennaMissing
    );
  };

  const resetForm = () => {
    setForm({
      title: "",
      date: "",
      isGeneral: false,
      antenna: null,
      starttime: "",
      endtime: "",
      location: "",
      description: "",
    });
    setFormError(null);
    setImageFile(null);
    setImagePreview("");
  };

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setFormError(null);

    if (!isFormValid()) {
      setFormError(
        "Remplissez le titre et la date. Vérifiez les horaires si renseignés."
      );
      return;
    }
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const method = form._id ? "PUT" : "POST";
      const url = form._id
        ? `/api/event/update/${form._id}`
        : `/api/event/save`;

      await apiFetch(url, {
        method,
        // headers: { "Content-Type": "application/json" },
        body: formData,
      });

      resetForm();
      setShowForm(false); // fermer la modale après succès
      await fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  const edit = (ev: EventItem) => {
    const foundAntenne = antennes.find(a => a.nom === ev.antenna);
    setForm({
      ...ev,
      antenna: foundAntenne ? foundAntenne._id : "",
      isGeneral: !!ev.isGeneral,
    });

    setImagePreview(`${API_BASE}${ev.image}`);

    setImageFile(null); 
    setFormError(null);
    };

  const remove = async (id?: string) => {
    if (!id) return;
    try {
      await apiFetch(`/api/event/delete/${id}`, {
        method: "DELETE",
      });
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  const openModalForCreate = () => {
    resetForm();
    setShowForm(true);
  };

  const handleCloseModal = () => {
    resetForm();
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-extrabold">Gestion Agenda</h1>
      </div>

      {/* SOUS-TITRE */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-yellow-500">Agenda</h2>
          <p className="text-gray-600">
            Gérez les événements (agenda général et antennes)
          </p>
        </div>
        <button
          onClick={openModalForCreate}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
        >
          Ajouter
        </button>
      </div>

      {/* SECTION TABLEAU */}
      <section className="border-t border-gray-200 pt-6">
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b-2 border-yellow-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Titre
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Horaire
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Antenne
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Lieu
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    Chargement des événements...
                  </td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    Aucun événement pour le moment
                  </td>
                </tr>
              ) : (
                events.map((ev) => (
                  <tr
                    key={ev._id}
                    className="border-b border-gray-100 hover:bg-yellow-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {ev.title}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{ev.date}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {ev.starttime
                        ? `${ev.starttime}${ev.endtime ? " - " + ev.endtime : ""}`
                        : "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {antennes.find(a => a.nom === ev.antenna)?.nom || "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {ev.isGeneral ? "Agenda général" : "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {ev.location || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setShowForm(true);
                            edit(ev);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-sm font-medium"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => {
                            setDeleteId(ev._id!);
                            setShowDeleteModal(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 text-sm font-medium"
                        >
                          Supprimer
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODALE AGENDA (style Users) */}
      {showForm && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-yellow-500">
              {form._id ? "Modifier un événement" : "Créer un événement"}
            </h2>

            <form onSubmit={submit} className="space-y-6">
              {/* Titre + Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Titre
                  </label>
                  <input
                    value={form.title}
                    onChange={(e) => {
                      setForm({ ...form, title: e.target.value });
                      setFormError(null);
                    }}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => {
                      setForm({ ...form, date: e.target.value });
                      setFormError(null);
                    }}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Heures */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Heure de début
                  </label>
                  <input
                    type="time"
                    value={form.starttime ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, starttime: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Heure de fin
                  </label>
                  <input
                    type="time"
                    value={form.endtime ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, endtime: e.target.value })
                    }
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${form.starttime &&
                      form.endtime &&
                      form.endtime < form.starttime
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 focus:border-yellow-500"
                      }`}
                  />
                  {form.starttime &&
                    form.endtime &&
                    form.endtime < form.starttime && (
                      <p className="text-red-500 text-sm mt-1">
                        L&apos;heure de fin doit être supérieure à l&apos;heure
                        de début.
                      </p>
                    )}
                </div>
              </div>

              {/* Lieu */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Lieu
                </label>
                <input
                  placeholder="Lieu"
                  value={form.location ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Antenne + Agenda général */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Antenne
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors"
                    value={form.antenna ?? ""}
                    onChange={(e) => {
                      const val = e.target.value || null;
                      setForm({
                        ...form,
                        antenna: val,
                      });
                      setFormError(null);
                    }}
                  >
                    <option value="">Sélectionner une antenne</option>
                    {antennes.map((a) => (
                      <option key={a._id} value={a._id}>
                        {a.nom}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center mt-2 sm:mt-8">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!form.isGeneral}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setForm({
                            ...form,
                            isGeneral: checked,
                          });
                          setFormError(null);
                        }}
                        className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Agenda général
                      </span>
                    </label>
                  </div>
                  {role === "X" && (
                    <div className="mt-3 p-3 bg-orange-50 border border-orange-200 text-orange-800 rounded-lg text-sm">
                      <p className="font-bold mb-1">Attention</p>
                      Vous êtes connecté en tant que Admin {pays}, en cochant agenda général vous êtes sur le point de créer un événement affiché dans la page agenda général. Pour créer un événement dédié à votre pays, ne cochez pas "Agenda général".
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image
                </label>

                <label
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl cursor-pointer 
                       hover:border-yellow-400 hover:bg-yellow-50 transition-colors block text-center"
                >
                  Choisir une image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setImageFile(file);
                    }}
                  />
                </label>

                {imageFile && (
                  <p className="mt-1 text-xs text-gray-500">{imageFile.name}</p>
                )}

                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Aperçu :
                    </p>
                    <div className="w-48 h-32 border border-gray-300 rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Aperçu"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Description"
                  value={form.description ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors min-h-[100px]"
                />
              </div>

              {/* Erreur globale */}
              {formError && (
                <div className="text-red-600 text-sm">{formError}</div>
              )}

              {/* Boutons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid()}
                  className={`flex-1 px-6 py-3 text-white rounded-xl font-medium ${isFormValid()
                    ? "bg-yellow-500 hover:bg-yellow-600 hover:shadow-lg transition-all"
                    : "bg-gray-300 cursor-not-allowed"
                    }`}
                >
                  {form._id ? "Mettre à jour" : "Créer l'événement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* MODALE SUPPRESSION */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-red-600">
              Confirmer la suppression
            </h2>

            <p className="text-gray-700 mb-6">
              Voulez-vous vraiment supprimer cet événement ? <br />
              Cette action est irréversible.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
              >
                Annuler
              </button>

              <button
                onClick={async () => {
                  await remove(deleteId!);
                  setShowDeleteModal(false);
                }}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:shadow-lg transition-all font-medium"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
