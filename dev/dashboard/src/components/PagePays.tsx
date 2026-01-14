import React, { useEffect, useState } from "react";
import PagePaysForm from "./PagePaysForm";
import { apiFetch } from "../services/api";
import { useAuth } from "./utils/useAuth";

type Country = {
  _id: string;
  nom: string;
  description: string;
  image?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CardFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
    {children}
  </div>
);

const PagesSite: React.FC = () => {
  const { role, pays } = useAuth();
  const [mode, setMode] = useState<"list" | "edit">("list");
  const [editingCountryId, setEditingCountryId] = useState<string | null>(null);

  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);

  // Recherche
  const [search, setSearch] = useState("");

  // Ajout pays
  const [creatingOpen, setCreatingOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newCountry, setNewCountry] = useState<{
    nom: string;
    description: string;
    image: File | null;
  }>({
    nom: "",
    description: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState<string>("");

  // Modale suppression
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const loadCountries = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/pays/get");

      if (!res.ok) throw new Error("Erreur");
      const data: Country[] = await res.json();
      setCountries(data);
    } catch (e) {
      console.error(e);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCountries();
  }, []);

  // Suppression
  const handleDelete = async (id: string) => {
    try {
      const res = await apiFetch(`/api/pays/delete/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Suppression impossible");

      setCountries((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
      alert("Impossible de supprimer le pays.");
    }
  };

  // Création
  const handleCreate = async () => {
    if (!newCountry.nom.trim() || !newCountry.description.trim()) {
      alert("Renseigne le nom et la description.");
      return;
    }

    try {
      setCreating(true);
      const fd = new FormData();
      fd.append("nom", newCountry.nom.trim());
      fd.append("description", newCountry.description.trim());
      if (newCountry.image) fd.append("image", newCountry.image);

      const res = await apiFetch("/api/pays/save", {
        method: "POST",
        body: fd,
      });


      if (!res.ok) throw new Error("Erreur création pays");

      await loadCountries();
      setCreatingOpen(false);
      setCreatingOpen(false);
      setNewCountry({ nom: "", description: "", image: null });
      setImagePreview("");
    } catch (e) {
      console.error(e);
      alert("Impossible de créer le pays.");
    } finally {
      setCreating(false);
    }
  };

  // EDIT MODE
  if (mode === "edit" && editingCountryId) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => {
            setMode("list");
            setEditingCountryId(null);
            loadCountries();
          }}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          ← Retour
        </button>

        <CardFrame>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Éditer le pays
            </h2>
            <span className="text-sm text-gray-500">
              ID:&nbsp;<code>{editingCountryId}</code>
            </span>
          </div>

          <PagePaysForm
            countryId={editingCountryId}
            onBack={() => {
              setMode("list");
              setEditingCountryId(null);
              loadCountries();
            }}
          />
        </CardFrame>
      </div>
    );
  }

  // LIST MODE
  return (
    <section className="space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-extrabold">Gestion Pays</h1>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-yellow-500">Pays</h2>
          <p className="text-gray-600">
            Gérez les pays (actualités, etc.) disponibles sur le site.
          </p>
        </div>
        {role !== "X" && (
          <button
            onClick={() => setCreatingOpen((v) => !v)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
          >
            Nouveau pays
          </button>
        )}
      </div>

      {/* BARRE RECHERCHE */}
      <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row gap-4 mb-2">
        <div className="flex-1 relative">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            type="text"
            placeholder="Rechercher un pays..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* AJOUT PAYS */}
      {/* MODALE AJOUT PAYS */}
      {creatingOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4"
          onClick={() => setCreatingOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-yellow-500">
              Ajouter un pays
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* NOM */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  value={newCountry.nom}
                  onChange={(e) =>
                    setNewCountry((s) => ({ ...s, nom: e.target.value }))
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                       focus:border-yellow-500 focus:outline-none transition-colors"
                />
              </div>

              {/* IMAGE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image *
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
                      const f = e.target.files?.[0] || null;
                      setNewCountry((s) => ({ ...s, image: f }));
                      if (f) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          setImagePreview(ev.target?.result as string);
                        };
                        reader.readAsDataURL(f);
                      } else {
                        setImagePreview("");
                      }
                    }}
                  />
                </label>

                {newCountry.image && (
                  <p className="mt-1 text-xs text-gray-500">{newCountry.image.name}</p>
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

              {/* DESCRIPTION */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  rows={4}
                  value={newCountry.description}
                  onChange={(e) =>
                    setNewCountry((s) => ({ ...s, description: e.target.value }))
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                       focus:border-yellow-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* BOUTONS */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setCreatingOpen(false)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl 
                     hover:bg-gray-300 transition-colors font-medium"
              >
                Annuler
              </button>

              <button
                onClick={handleCreate}
                disabled={
                  creating ||
                  !newCountry.nom.trim() ||
                  !newCountry.description.trim() ||
                  !newCountry.image
                }
                className={`
            flex-1 px-6 py-3 rounded-xl font-medium transition-all
            ${!newCountry.nom.trim() ||
                    !newCountry.description.trim() ||
                    !newCountry.image
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-yellow-500 text-white hover:bg-yellow-600 hover:shadow-lg"
                  }
          `}
              >
                {creating ? "Création…" : "Créer le pays"}
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ---------- TABLEAU STYLE UTILISATEUR ---------- */}
      <section className="pt-6">
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b-2 border-yellow-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Image</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nom</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Créé le</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Mis à jour</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>


            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                    Chargement…
                  </td>
                </tr>
              ) : (
                countries
                  .filter((c) => {
                    // Filtre recherche
                    const matchesSearch = (c.nom + " " + c.description)
                      .toLowerCase()
                      .includes(search.toLowerCase());

                    // Filtre role X : ne voit que son pays
                    if (role === "X") {
                      return matchesSearch && c.nom === pays;
                    }

                    return matchesSearch;
                  })
                  .map((c) => (
                    <tr
                      key={c._id}
                      className="border-b border-gray-100 hover:bg-yellow-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        {c.image ? (
                          <img
                            src={`${API_BASE}${c.image}`}
                            className="w-16 h-12 object-cover rounded-md border border-gray-200 shadow-sm"
                          />
                        ) : (
                          <div className="w-16 h-12 bg-gray-100 rounded-md border border-gray-300 flex items-center justify-center text-xs text-gray-400">
                            —
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-800">{c.nom}</td>

                      <td className="px-6 py-4 text-gray-700">
                        {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "—"}
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {c.updatedAt ? new Date(c.updatedAt).toLocaleDateString() : "—"}
                      </td>
                      {/* ACTIONS */}
                      <td className="px-6 py-4">
                        <div className="flex justify gap-2">
                          <button
                            onClick={() => {
                              setEditingCountryId(c._id);
                              setMode("edit");
                            }}
                            className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-sm font-medium"
                          >
                            Modifier
                          </button>

                          {role !== "X" && (
                            <button
                              onClick={() => {
                                setDeleteId(c._id);
                                setShowDeleteModal(true);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 text-sm font-medium"
                            >
                              Supprimer
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>

          </table>
        </div>
      </section>

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
              Voulez-vous vraiment supprimer ce pays ?
              <br />
              <span className="font-semibold">
                Toutes ses actualités seront supprimées.
              </span>
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
                  await handleDelete(deleteId!);
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
    </section>
  );

};

export default PagesSite;
