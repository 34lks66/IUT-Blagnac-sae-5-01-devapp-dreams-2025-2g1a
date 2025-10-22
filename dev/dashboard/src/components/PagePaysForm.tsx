import React, { useEffect, useMemo, useRef, useState } from "react";

// ---------- Types ----------
type Country = {
  _id: string;
  nom: string;
  description: string;
  image?: string;           // ex: "/uploads/xxx.jpg"
  createdAt?: string;
  updatedAt?: string;
};

type NewsItem = {
  _id?: string;                   // absent => à créer
  titre: string;
  description: string;
  image?: File | string | null;   // File (nouvelle), string (existante "/uploads/..."), null
  pays: string;                   // id du pays
};

// ---------- Helpers ----------
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
// Pour afficher les images persistées sur le backend
const API_ORIGIN = API_BASE.replace(/\/api$/, "");

// UI helpers
const Label: React.FC<{ htmlFor?: string; children: React.ReactNode }> = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">{children}</label>
);
const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (p) => (
  <input
    {...p}
    className={
      "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 " +
      (p.className ?? "")
    }
  />
);
const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (p) => (
  <textarea
    {...p}
    className={
      "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 " +
      (p.className ?? "")
    }
  />
);

// ---------- Composant principal ----------
const PagePaysForm: React.FC = () => {
  // Pays
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const selectedCountry = useMemo(
    () => countries.find((c) => c._id === selectedCountryId) || null,
    [countries, selectedCountryId]
  );

  // Edition du pays
  const [description, setDescription] = useState<string>("");
  const [countryImageFile, setCountryImageFile] = useState<File | null>(null); // nouvelle image du pays

  // Création d’un pays
  const [creatingOpen, setCreatingOpen] = useState(false);
  const [creatingLoading, setCreatingLoading] = useState(false);
  const [newCountry, setNewCountry] = useState<{ nom: string; description: string; image?: File | null }>({
    nom: "",
    description: "",
    image: null,
  });

  // News
  const [news, setNews] = useState<NewsItem[]>([]);
  const initialNewsIdsRef = useRef<Set<string>>(new Set());

  // UI states
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingCountry, setDeletingCountry] = useState(false);

  // ----- Chargement des pays -----
  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoadingCountries(true);
        const res = await fetch(`${API_BASE}/pays/get`, { credentials: "include" });
        if (!res.ok) throw new Error("Erreur chargement pays");
        const data: Country[] = await res.json();
        setCountries(data);
        if (data.length && !selectedCountryId) {
          setSelectedCountryId(data[0]._id);
        }
      } catch (err) {
        console.error(err);
        alert("Impossible de charger les pays.");
      } finally {
        setLoadingCountries(false);
      }
    };
    loadCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----- Quand un pays est sélectionné : charger description + news -----
  useEffect(() => {
    if (!selectedCountryId) return;

    const loadCountryAndNews = async () => {
      try {
        setLoadingContent(true);

        const country = countries.find((c) => c._id === selectedCountryId);
        setDescription(country?.description || "");
        setCountryImageFile(null); // reset du champ fichier (on affiche l’ancienne image si dispo)

        // Charger les news du pays
        const resNews = await fetch(`${API_BASE}/newspays/get?pays=${selectedCountryId}`, {
          credentials: "include",
        });
        if (!resNews.ok) throw new Error("Erreur chargement actu");
        const dataNews: NewsItem[] = await resNews.json();

        // Pour chaque actu, conserver l'URL existante ou null, sans File par défaut
        setNews(
          dataNews.map((n) => ({
            _id: n._id,
            titre: n.titre,
            description: n.description,
            image: (n as any).image ?? null, // string ou null
            pays: (n as any).pays?._id || (n as any).pays || selectedCountryId,
          }))
        );

        initialNewsIdsRef.current = new Set(
          dataNews.filter((n) => n._id).map((n) => n._id as string)
        );
      } catch (err) {
        console.error(err);
        alert("Impossible de charger les infos du pays.");
      } finally {
        setLoadingContent(false);
      }
    };

    loadCountryAndNews();
  }, [selectedCountryId, countries]);

  // ----- Handlers -----
  const handleSelectCountry = (id: string) => {
    if (id === selectedCountryId) return;
    setSelectedCountryId(id);
  };

  // Création d’un nouveau pays (FormData si image)
  const handleCreateCountry = async () => {
    if (!newCountry.nom.trim() || !newCountry.description.trim()) {
      alert("Renseigne au moins le nom et la description.");
      return;
    }
    try {
      setCreatingLoading(true);

      const fd = new FormData();
      fd.append("nom", newCountry.nom.trim());
      fd.append("description", newCountry.description.trim());
      if (newCountry.image) {
        fd.append("image", newCountry.image);
      }
      const res = await fetch(`${API_BASE}/pays/save`, {
        method: "POST",
        credentials: "include",
        body: fd,
      });
      if (!res.ok) throw new Error("Échec création du pays");
      const created: Country = await res.json();

      setCountries((prev) => [created, ...prev]);
      setSelectedCountryId(created._id);

      // reset UI création
      setNewCountry({ nom: "", description: "", image: null });
      setCreatingOpen(false);
    } catch (e) {
      console.error(e);
      alert("Impossible de créer le pays.");
    } finally {
      setCreatingLoading(false);
    }
  };

  // Suppression du pays sélectionné
  const handleDeleteCountry = async () => {
    if (!selectedCountryId) return;
    const country = countries.find(c => c._id === selectedCountryId);
    const ok = window.confirm(
      `Supprimer le pays "${country?.nom ?? ""}" ?\n\nToutes ses actualités liées seront supprimées.`
    );
    if (!ok) return;

    try {
      setDeletingCountry(true);
      const res = await fetch(`${API_BASE}/pays/delete/${selectedCountryId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Échec suppression du pays");

      // mettre à jour la liste locale
      setCountries((prev) => prev.filter((c) => c._id !== selectedCountryId));
      // reset form + sélection
      const remaining = countries.filter((c) => c._id !== selectedCountryId);
      if (remaining.length > 0) {
        setSelectedCountryId(remaining[0]._id);
      } else {
        setSelectedCountryId(null);
      }
      setDescription("");
      setCountryImageFile(null);
      setNews([]);
      initialNewsIdsRef.current = new Set();

      alert("Pays supprimé !");
    } catch (e) {
      console.error(e);
      alert("Impossible de supprimer le pays.");
    } finally {
      setDeletingCountry(false);
    }
  };

  // News — helpers
  const addNews = () => {
    if (!selectedCountryId) return;
    setNews((s) => [
      ...s,
      { titre: "", description: "", image: null, pays: selectedCountryId },
    ]);
  };
  const removeNews = (idx: number) => {
    setNews((s) => {
      const copy = [...s];
      copy.splice(idx, 1);
      return copy;
    });
  };
  const updateNewsField = (idx: number, patch: Partial<NewsItem>) => {
    setNews((s) => s.map((item, i) => (i === idx ? { ...item, ...patch } : item)));
  };

  // Rendu d’une image (country/news), en gérant File vs string
  const renderImageThumb = (img?: File | string | null) => {
    if (!img) return null;
    if (typeof img === "string") {
      // URL retournée par l’API (commence par /uploads/…)
      return <img src={`${API_ORIGIN}${img}`} className="w-28 h-20 object-cover rounded-md border border-gray-200" />;
    }
    // Fichier local choisi → preview
    return <img src={URL.createObjectURL(img)} className="w-28 h-20 object-cover rounded-md border border-gray-200" />;
  };

  // --- Exiger une image pour chaque nouvelle actu ---
  const newNewsMissingImage = news.some((n) => !n._id && !(n.image instanceof File));

  // ----- Enregistrer (update pays + create/update/delete news) -----
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCountryId) {
      alert("Sélectionne un pays d’abord.");
      return;
    }

    try {
      setSaving(true);

      // Garde-fou: toute nouvelle actu doit avoir une image (File)
      const toCreatePreview = news.filter((n) => !n._id);
      for (const n of toCreatePreview) {
        if (!(n.image instanceof File)) {
          alert("Chaque nouvelle actualité doit avoir une image.");
          setSaving(false);
          return;
        }
      }

      // 1) UPDATE PAYS
      if (countryImageFile) {
        // envoyer en FormData si une nouvelle image a été choisie
        const fd = new FormData();
        fd.append("description", description);
        fd.append("image", countryImageFile);
        const r = await fetch(`${API_BASE}/pays/update/${selectedCountryId}`, {
          method: "PUT",
          credentials: "include",
          body: fd,
        });
        if (!r.ok) throw new Error("Échec update pays");
      } else {
        // sinon, JSON simple (on ne touche pas à l'image existante)
        const r = await fetch(`${API_BASE}/pays/update/${selectedCountryId}`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description }),
        });
        if (!r.ok) throw new Error("Échec update pays");
      }

      // 2) DIFF NEWS
      const currentIds = new Set(news.filter((n) => n._id).map((n) => n._id!));
      const toDelete = [...initialNewsIdsRef.current].filter((id) => !currentIds.has(id));
      const toCreate = news.filter((n) => !n._id && (n.titre.trim() || n.description.trim()));
      const toUpdate = news.filter((n) => !!n._id);

      // 2.a) CREATE
      if (toCreate.length) {
        await Promise.all(
          toCreate.map(async (n) => {
            // ici l'image est assurée être un File
            const fd = new FormData();
            fd.append("titre", n.titre);
            fd.append("description", n.description);
            fd.append("pays", selectedCountryId);
            if (n.image && n.image instanceof File) {
              fd.append("image", n.image);
            }
            const r = await fetch(`${API_BASE}/newspays/save`, {
              method: "POST",
              credentials: "include",
              body: fd,
            });
            if (!r.ok) throw new Error("Échec create news (file)");
            return r.json();
          })
        );
      }

      // 2.b) UPDATE
      if (toUpdate.length) {
        await Promise.all(
          toUpdate.map(async (n) => {
            // si image est un File, on doit utiliser FormData
            if (n.image && n.image instanceof File) {
              const fd = new FormData();
              fd.append("titre", n.titre);
              fd.append("description", n.description);
              fd.append("pays", selectedCountryId);
              fd.append("image", n.image); // nouvelle image
              const r = await fetch(`${API_BASE}/newspays/update/${n._id}`, {
                method: "PUT",
                credentials: "include",
                body: fd,
              });
              if (!r.ok) throw new Error("Échec update news (file)");
              return r.json();
            } else {
              // pas de nouvelle image → JSON (on garde l’ancienne côté backend)
              const r = await fetch(`${API_BASE}/newspays/update/${n._id}`, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  titre: n.titre,
                  description: n.description,
                  pays: selectedCountryId,
                }),
              });
              if (!r.ok) throw new Error("Échec update news (json)");
              return r.json();
            }
          })
        );
      }

      // 2.c) DELETE
      if (toDelete.length) {
        await Promise.all(
          toDelete.map((id) =>
            fetch(`${API_BASE}/newspays/delete/${id}`, {
              method: "DELETE",
              credentials: "include",
            }).then((r) => {
              if (!r.ok) throw new Error("Échec delete news");
              return r.json();
            })
          )
        );
      }

      // Recharger news fraîches + sync ids initiaux
      const resNews = await fetch(`${API_BASE}/newspays/get?pays=${selectedCountryId}`, {
        credentials: "include",
      });
      const fresh = (await resNews.json()) as NewsItem[];
      setNews(
        fresh.map((n) => ({
          _id: n._id,
          titre: n.titre,
          description: n.description,
          image: (n as any).image ?? null,
          pays: (n as any).pays?._id || (n as any).pays || selectedCountryId,
        }))
      );
      initialNewsIdsRef.current = new Set(fresh.filter((n) => n._id).map((n) => n._id!));

      // Recharger le pays courant (pour récupérer potentiellement la nouvelle image)
      const refreshedCountries = await fetch(`${API_BASE}/pays/get`, { credentials: "include" }).then(r => r.json());
      setCountries(refreshedCountries);

      alert("Enregistré !");
    } catch (err) {
      console.error(err);
      alert("Erreur pendant l’enregistrement.");
    } finally {
      setSaving(false);
    }
  };

  // ---------- Rendu ----------
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">
          Page Pays Éditeur
        </h2>
        <p className="text-gray-600">Sélectionne un pays, édite sa description et ses actualités.</p>
      </div>

      {/* Pays + Description */}
      <div className="grid md:grid-cols-[320px_1fr] gap-6">
        {/* Colonne gauche : création + liste des pays */}
        <div>
          <div className="flex items-center justify-between">
            <Label>Pays</Label>
            <button
              type="button"
              onClick={() => setCreatingOpen((v) => !v)}
              className="text-sm px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              {creatingOpen ? "Fermer" : "Nouveau pays"}
            </button>
          </div>

          {creatingOpen && (
            <div className="mt-2 p-3 border border-yellow-200 rounded-lg bg-yellow-50 space-y-3">
              <div>
                <Label htmlFor="new-country-nom">Nom *</Label>
                <Input
                  id="new-country-nom"
                  value={newCountry.nom}
                  onChange={(e) => setNewCountry((s) => ({ ...s, nom: e.target.value }))}
                  placeholder="Ex : France"
                />
              </div>

              <div>
                <Label htmlFor="new-country-desc">Description *</Label>
                <TextArea
                  id="new-country-desc"
                  rows={3}
                  value={newCountry.description}
                  onChange={(e) => setNewCountry((s) => ({ ...s, description: e.target.value }))}
                  placeholder="Présentation du pays…"
                />
              </div>

              <div>
                <Label>Image</Label>
                <div className="mt-1 flex items-center gap-3">
                  {/* preview */}
                  <div className="w-28 h-20 rounded-md bg-gray-100 border border-gray-200 overflow-hidden grid place-items-center">
                    {newCountry.image ? (
                      <img
                        src={URL.createObjectURL(newCountry.image)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">Aperçu</span>
                    )}
                  </div>
                  <label className="inline-flex items-center px-3 py-2 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0] || null;
                        setNewCountry((s) => ({ ...s, image: f || null }));
                      }}
                    />
                    Choisir une image
                  </label>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-1">
                <button
                  type="button"
                  onClick={() => { setCreatingOpen(false); setNewCountry({ nom: "", description: "", image: null }); }}
                  className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleCreateCountry}
                  disabled={creatingLoading}
                  className="px-3 py-1.5 rounded-md text-white bg-gradient-to-b from-yellow-500 to-[#93720a] hover:brightness-110 disabled:opacity-60"
                >
                  {creatingLoading ? "Création…" : "Créer"}
                </button>
              </div>
            </div>
          )}

          <div className="mt-3 h-[280px] overflow-y-auto rounded-lg border border-gray-300 bg-white">
            {loadingCountries ? (
              <div className="p-3 text-sm text-gray-500">Chargement…</div>
            ) : countries.length === 0 ? (
              <div className="p-3 text-sm text-gray-500">Aucun pays</div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {countries.map((c) => (
                  <li
                    key={c._id}
                    className={`px-3 py-2 cursor-pointer hover:bg-gray-50 ${
                      c._id === selectedCountryId ? "bg-yellow-50 ring-1 ring-yellow-200" : ""
                    }`}
                    onClick={() => handleSelectCountry(c._id)}
                  >
                    <div className="font-semibold text-gray-800">{c.nom}</div>
                    <div className="text-xs text-gray-500 truncate">{c.description}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Form du pays sélectionné */}
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Informations du pays</h3>

            {/* Bouton supprimer pays */}
            <button
              type="button"
              onClick={handleDeleteCountry}
              disabled={!selectedCountryId || deletingCountry}
              className="text-sm px-3 py-1.5 rounded-md bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 disabled:opacity-60"
              title="Supprimer ce pays et toutes ses actualités"
            >
              {deletingCountry ? "Suppression…" : "Supprimer le pays"}
            </button>
          </div>

          {selectedCountry ? (
            <>
              <div className="mt-3 grid md:grid-cols-[1fr_auto] gap-4 items-start">
                <div>
                  <Label>Nom du pays</Label>
                  <Input value={selectedCountry.nom} disabled />
                </div>

                {/* Image actuelle + upload */}
                <div>
                  <Label>Image du pays</Label>
                  <div className="mt-1 flex items-center gap-3">
                    <div className="w-28 h-20 rounded-md bg-gray-100 border border-gray-200 overflow-hidden grid place-items-center">
                      {/* Preview : nouvelle image ou image existante */}
                      {countryImageFile ? (
                        <img src={URL.createObjectURL(countryImageFile)} className="w-full h-full object-cover" />
                      ) : selectedCountry.image ? (
                        <img src={`${API_ORIGIN}${selectedCountry.image}`} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-gray-400">Aucune image</span>
                      )}
                    </div>

                    <label className="inline-flex items-center px-3 py-2 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0] || null;
                          setCountryImageFile(f);
                        }}
                      />
                      Changer d’image
                    </label>
                    {countryImageFile && (
                      <span className="text-xs text-gray-500">{countryImageFile.name}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <Label>Description</Label>
                <TextArea
                  rows={6}
                  placeholder="Présentation du pays (accueil, orientation, partenaires, etc.)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-500 mt-2">Sélectionne un pays…</div>
          )}
        </div>
      </div>

      {/* Actus du pays */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Actualités du pays</h3>
          <button
            type="button"
            onClick={addNews}
            disabled={!selectedCountryId}
            className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            + Ajouter une actualité
          </button>
        </div>

        {news.length === 0 ? (
          <div className="text-sm text-gray-500">Aucune actualité pour ce pays.</div>
        ) : (
          <div className="grid gap-6">
            {news.map((n, idx) => (
              <div key={n._id || `tmp-${idx}`} className="rounded-xl border border-gray-200 p-4 space-y-3 bg-white">
                <div className="grid md:grid-cols-[1fr_1fr_auto] gap-4 items-start">
                  <div>
                    <Label htmlFor={`news-title-${idx}`}>Titre</Label>
                    <Input
                      id={`news-title-${idx}`}
                      placeholder="Ex : Permanence juridique"
                      value={n.titre}
                      onChange={(e) => updateNewsField(idx, { titre: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`news-desc-${idx}`}>Description</Label>
                    <TextArea
                      id={`news-desc-${idx}`}
                      rows={3}
                      placeholder="Texte de l’actualité"
                      value={n.description}
                      onChange={(e) => updateNewsField(idx, { description: e.target.value })}
                    />
                  </div>

                  {/* Image actu : preview + file input (obligatoire pour les nouvelles actus) */}
                  <div>
                    <Label>Image</Label>
                    <div className="mt-1 flex items-center gap-3">
                      <div className="w-28 h-20 rounded-md bg-gray-100 border border-gray-200 overflow-hidden grid place-items-center">
                        {renderImageThumb(n.image)}
                        {!n.image && <span className="text-[11px] text-gray-400 px-1 text-center">Image requise</span>}
                      </div>
                      <label className="inline-flex items-center px-3 py-2 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0] || null;
                            if (f) updateNewsField(idx, { image: f }); // impose un fichier pour les nouvelles actus
                          }}
                        />
                        Choisir une image
                      </label>
                      {/* Pas de bouton "Retirer" pour forcer la présence d'une image sur les nouvelles actus */}
                    </div>
                    {/* Message d'aide si nouvelle actu sans image */}
                    {!n._id && !(n.image instanceof File) && (
                      <p className="mt-1 text-xs text-red-600">Obligatoire pour une nouvelle actualité.</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {n._id ? `ID: ${n._id}` : "Nouvelle actualité (sera créée)"}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeNews(idx)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Actions */}
      <div className="pt-2 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => {
            if (!selectedCountry) return;
            setDescription(selectedCountry.description || "");
            setCountryImageFile(null);
            (async () => {
              try {
                const resNews = await fetch(`${API_BASE}/newspays/get?pays=${selectedCountry._id}`, {
                  credentials: "include",
                });
                const fresh = (await resNews.json()) as NewsItem[];
                setNews(
                  fresh.map((n) => ({
                    _id: n._id,
                    titre: n.titre,
                    description: n.description,
                    image: (n as any).image ?? null,
                    pays: (n as any).pays?._id || (n as any).pays || selectedCountry._id,
                  }))
                );
                initialNewsIdsRef.current = new Set(
                  fresh.filter((n) => n._id).map((n) => n._id!)
                );
              } catch (e) {
                console.error(e);
              }
            })();
          }}
          className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800"
        >
          Réinitialiser
        </button>

        <button
          type="submit"
          disabled={!selectedCountryId || saving || newNewsMissingImage}
          className="px-4 py-2 rounded-lg text-white bg-gradient-to-b from-yellow-500 to-[#93720a] hover:brightness-110 disabled:opacity-60"
        >
          {saving ? "Enregistrement…" : "Enregistrer"}
        </button>
      </div>
    </form>
  );
};

export default PagePaysForm;
