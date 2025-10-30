import React, { useEffect, useState } from "react";
import PagePaysForm from "./PagePaysForm";

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
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">{children}</div>
);

const PagesSite: React.FC = () => {
  const [mode, setMode] = useState<"list" | "edit">("list");
  const [editingCountryId, setEditingCountryId] = useState<string | null>(null);

  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);

  // Ajout
  const [creatingOpen, setCreatingOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newCountry, setNewCountry] = useState<{ nom: string; description: string; image: File | null }>({
    nom: "",
    description: "",
    image: null,
  });

  const loadCountries = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/pays/get`, { credentials: "include" });
      if (!res.ok) throw new Error("Erreur chargement pays");
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

  const handleDelete = async (id: string) => {
    const c = countries.find((x) => x._id === id);
    const ok = window.confirm(
      `Supprimer le pays "${c?.nom ?? ""}" ?\n\nToutes ses actualités (et antennes si branchées) seront supprimées.`
    );
    if (!ok) return;

    try {
      const res = await fetch(`${API_BASE}/api/pays/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Échec suppression");
      setCountries((prev) => prev.filter((p) => p._id !== id));
    } catch (e) {
      console.error(e);
      alert("Suppression impossible.");
    }
  };

  const handleCreate = async () => {
    if (!newCountry.nom.trim() || !newCountry.description.trim()) {
      alert("Renseigne au moins le nom et la description.");
      return;
    }
    try {
      setCreating(true);
      const fd = new FormData();
      fd.append("nom", newCountry.nom.trim());
      fd.append("description", newCountry.description.trim());
      if (newCountry.image) fd.append("image", newCountry.image);

      const res = await fetch(`${API_BASE}/api/pays/save`, {
        method: "POST",
        credentials: "include",
        body: fd,
      });
      if (!res.ok) throw new Error("Échec création du pays");
      const created: Country = await res.json();

      await loadCountries();
      setCreatingOpen(false);
      setNewCountry({ nom: "", description: "", image: null });
      setEditingCountryId(created._id);
      setMode("edit");
    } catch (e) {
      console.error(e);
      alert("Impossible de créer le pays.");
    } finally {
      setCreating(false);
    }
  };

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
            <h2 className="text-xl font-semibold text-gray-900">Éditer le pays</h2>
            <span className="text-sm text-gray-500">ID:&nbsp;<code>{editingCountryId}</code></span>
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

  return (
    <section>
    <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-extrabold ">Gestion Pays</h1>
        <button
          onClick={() => setCreatingOpen((v) => !v)}
          className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg transition-all duration-200 font-semibold inline-flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Nouveau pays
        </button>
    </div>

    <CardFrame>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">Pays gestion</h2>
            <p className="text-gray-600">Liste des pays (éditer / supprimer) et ajout rapide.</p>
          </div>
        </div>

        <button
          onClick={() => setCreatingOpen((v) => !v)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white bg-yellow-500 hover:brightness-110"
        >
          {creatingOpen ? "Fermer" : "Nouveau pays"}
        </button>
      </div>

      {/* Formulaire d'ajout compact */}
      {creatingOpen && (
        <div className="mb-8 p-4 rounded-lg border border-yellow-200 bg-yellow-50">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom *</label>
              <input
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                placeholder="Ex : France"
                value={newCountry.nom}
                onChange={(e) => setNewCountry((s) => ({ ...s, nom: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <div className="mt-1 flex items-center gap-3">
                <label className="inline-flex items-center px-3 py-2 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0] || null;
                      setNewCountry((s) => ({ ...s, image: f }));
                    }}
                  />
                  Choisir une image
                </label>
                {newCountry.image && (
                  <span className="text-xs text-gray-500 truncate max-w-[200px]">{newCountry.image.name}</span>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description *</label>
              <textarea
                rows={3}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                placeholder="Présentation du pays…"
                value={newCountry.description}
                onChange={(e) => setNewCountry((s) => ({ ...s, description: e.target.value }))}
              />
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 justify-end">
            <button
              onClick={() => {
                setCreatingOpen(false);
                setNewCountry({ nom: "", description: "", image: null });
              }}
              className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200"
              type="button"
            >
              Annuler
            </button>
            <button
              onClick={handleCreate}
              disabled={creating}
              className="px-3 py-1.5 rounded-md text-white bg-yellow-500 hover:brightness-110 disabled:opacity-60"
              type="button"
            >
              {creating ? "Création…" : "Créer le pays"}
            </button>
          </div>
        </div>
      )}

      {/* Liste simple des pays (nom + actions) */}
      <div className="rounded-xl border border-gray-200">
        <div className="divide-y">
          {loading ? (
            <div className="px-4 py-6 text-center text-gray-500">Chargement…</div>
          ) : countries.length === 0 ? (
            <div className="px-4 py-6 text-center text-gray-500">Aucun pays pour le moment.</div>
          ) : (
            countries.map((c) => (
              <div key={c._id} className="px-4 py-3 flex items-center justify-between bg-white">
                <div className="font-medium text-gray-900">{c.nom}</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingCountryId(c._id);
                      setMode("edit");
                    }}
                    // className="px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                    className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-sm font-medium"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    // className="px-3 py-1.5 rounded-md bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                    className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 text-sm font-medium"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </CardFrame>
    </section>
  );
};

export default PagesSite;
