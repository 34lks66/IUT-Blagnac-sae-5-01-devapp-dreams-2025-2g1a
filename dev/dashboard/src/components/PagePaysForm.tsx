import React, { useEffect, useMemo, useRef, useState } from "react";
import Page_antenne from "./pages_site/page_antenne";

// ---------- Types ----------
type Country = {
  _id: string;
  nom: string;
  description: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
};

type NewsItem = {
  _id?: string; // absent => à créer
  titre: string;
  description: string;
  image?: string | null; // ignoré côté backend pour l'instant
  pays: string; // id du pays
};

// ---------- Helpers ----------
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const DEFAULT_COUNTRY_IMAGE = "placeholder-country.jpg"; // <- à changer si tu veux

// Petits composants UI
const Label: React.FC<{ htmlFor?: string; children: React.ReactNode }> = ({
  htmlFor,
  children,
}) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
    {children}
  </label>
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

const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (
  p
) => (
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
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(
    null
  );
  const selectedCountry = useMemo(
    () => countries.find((c) => c._id === selectedCountryId) || null,
    [countries, selectedCountryId]
  );

  // Form pays (édition)
  const [description, setDescription] = useState<string>("");

  // Form création de pays
  const [creatingOpen, setCreatingOpen] = useState(false);
  const [creatingLoading, setCreatingLoading] = useState(false);
  const [newCountry, setNewCountry] = useState<{
    nom: string;
    description: string;
  }>({
    nom: "",
    description: "",
  });

  // News
  const [news, setNews] = useState<NewsItem[]>([]);
  const initialNewsIdsRef = useRef<Set<string>>(new Set());

  // UI loading/saving
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);
  const [saving, setSaving] = useState(false);

  // ----- Chargement des pays -----
  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoadingCountries(true);
        const res = await fetch(`${API_BASE}/pays/get`, {
          credentials: "include",
        });
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

        const resNews = await fetch(
          `${API_BASE}/newspays/get?pays=${selectedCountryId}`,
          {
            credentials: "include",
          }
        );
        if (!resNews.ok) throw new Error("Erreur chargement actu");
        const dataNews: NewsItem[] = await resNews.json();

        setNews(dataNews);
        initialNewsIdsRef.current = new Set(
          dataNews.filter((n) => n._id).map((n) => n._id!)
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

  // Création d'un nouveau pays
  const handleCreateCountry = async () => {
    if (!newCountry.nom.trim() || !newCountry.description.trim()) {
      alert("Renseigne au moins le nom et la description.");
      return;
    }
    try {
      setCreatingLoading(true);
      const res = await fetch(`${API_BASE}/pays/save`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: newCountry.nom.trim(),
          description: newCountry.description.trim(),
          // image requise côté modèle ? on envoie un placeholder pour l'instant
          image: DEFAULT_COUNTRY_IMAGE,
        }),
      });
      if (!res.ok) throw new Error("Échec création du pays");
      const created: Country = await res.json();

      // injecter dans la liste + sélectionner
      setCountries((prev) => [created, ...prev]);
      setSelectedCountryId(created._id);

      // reset UI création
      setNewCountry({ nom: "", description: "" });
      setCreatingOpen(false);
    } catch (e) {
      console.error(e);
      alert("Impossible de créer le pays.");
    } finally {
      setCreatingLoading(false);
    }
  };

  // News
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
    setNews((s) =>
      s.map((item, i) => (i === idx ? { ...item, ...patch } : item))
    );
  };

  // ----- Enregistrer -----
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCountryId) {
      alert("Sélectionne un pays d'abord.");
      return;
    }

    try {
      setSaving(true);

      // 1) Update description du pays
      await fetch(`${API_BASE}/pays/update/${selectedCountryId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      }).then((r) => {
        if (!r.ok) throw new Error("Échec update pays");
      });

      // 2) Diff news
      const currentIds = new Set(news.filter((n) => n._id).map((n) => n._id!));
      const toDelete = [...initialNewsIdsRef.current].filter(
        (id) => !currentIds.has(id)
      );
      const toCreate = news.filter(
        (n) => !n._id && (n.titre.trim() || n.description.trim())
      );
      const toUpdate = news.filter((n) => !!n._id);

      if (toCreate.length) {
        await Promise.all(
          toCreate.map((n) =>
            fetch(`${API_BASE}/newspays/save`, {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                titre: n.titre,
                description: n.description,
                image: DEFAULT_COUNTRY_IMAGE,
                pays: selectedCountryId,
              }),
            }).then((r) => {
              if (!r.ok) throw new Error("Échec create news");
              return r.json();
            })
          )
        );
      }

      if (toUpdate.length) {
        await Promise.all(
          toUpdate.map((n) =>
            fetch(`${API_BASE}/newspays/update/${n._id}`, {
              method: "PUT",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                titre: n.titre,
                description: n.description,
                pays: selectedCountryId,
              }),
            }).then((r) => {
              if (!r.ok) throw new Error("Échec update news");
              return r.json();
            })
          )
        );
      }

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

      // Recharger les news fraiches + sync ids initiaux
      const resNews = await fetch(
        `${API_BASE}/newspays/get?pays=${selectedCountryId}`,
        {
          credentials: "include",
        }
      );
      const fresh = (await resNews.json()) as NewsItem[];
      setNews(fresh);
      initialNewsIdsRef.current = new Set(
        fresh.filter((n) => n._id).map((n) => n._id!)
      );

      // MàJ locale de la description
      setCountries((list) =>
        list.map((c) =>
          c._id === selectedCountryId ? { ...c, description } : c
        )
      );

      alert("Enregistré !");
    } catch (err) {
      console.error(err);
      alert("Erreur pendant l'enregistrement.");
    } finally {
      setSaving(false);
    }
  };

  // ---------- Rendu ----------
  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">
            Page Pays — Éditeur
          </h2>
          <p className="text-gray-600">
            Sélectionne un pays, édite sa description et ses actualités.
          </p>
        </div>

        {/* Pays + Description */}
        <div className="grid md:grid-cols-[320px_1fr] gap-6">
          {/* Colonne gauche : création + liste des pays */}
          <div>
            <div className="flex items-center justify-between">
              <Label>Pays (BD)</Label>
              <button
                type="button"
                onClick={() => setCreatingOpen((v) => !v)}
                className="text-sm px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200"
              >
                {creatingOpen ? "Fermer" : "Nouveau pays"}
              </button>
            </div>

            {creatingOpen && (
              <div className="mt-2 p-3 border border-yellow-200 rounded-lg bg-yellow-50 space-y-2">
                <div>
                  <Label htmlFor="new-country-nom">Nom *</Label>
                  <Input
                    id="new-country-nom"
                    value={newCountry.nom}
                    onChange={(e) =>
                      setNewCountry((s) => ({ ...s, nom: e.target.value }))
                    }
                    placeholder="Ex : France"
                  />
                </div>
                <div>
                  <Label htmlFor="new-country-desc">Description *</Label>
                  <TextArea
                    id="new-country-desc"
                    rows={3}
                    value={newCountry.description}
                    onChange={(e) =>
                      setNewCountry((s) => ({
                        ...s,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Présentation du pays…"
                  />
                </div>
                <div className="flex gap-2 justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setCreatingOpen(false);
                      setNewCountry({ nom: "", description: "" });
                    }}
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
                        c._id === selectedCountryId
                          ? "bg-yellow-50 ring-1 ring-yellow-200"
                          : ""
                      }`}
                      onClick={() => handleSelectCountry(c._id)}
                    >
                      <div className="font-semibold text-gray-800">{c.nom}</div>
                      <div className="text-xs text-gray-500 truncate">
                        {c.description}
                      </div>
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
              {loadingContent && (
                <span className="text-xs text-gray-500">chargement…</span>
              )}
            </div>

            {selectedCountry ? (
              <>
                <div className="mt-3">
                  <Label>Nom du pays</Label>
                  <Input value={selectedCountry.nom} disabled />
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
              <div className="text-sm text-gray-500 mt-2">
                Sélectionne un pays…
              </div>
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
            <div className="text-sm text-gray-500">
              Aucune actualité pour ce pays.
            </div>
          ) : (
            <div className="grid gap-6">
              {news.map((n, idx) => (
                <div
                  key={n._id || `tmp-${idx}`}
                  className="rounded-xl border border-gray-200 p-4 space-y-3 bg-white"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`news-title-${idx}`}>Titre</Label>
                      <Input
                        id={`news-title-${idx}`}
                        placeholder="Ex : Permanence juridique"
                        value={n.titre}
                        onChange={(e) =>
                          updateNewsField(idx, { titre: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor={`news-desc-${idx}`}>Description</Label>
                      <TextArea
                        id={`news-desc-${idx}`}
                        rows={3}
                        placeholder="Texte de l'actualité"
                        value={n.description}
                        onChange={(e) =>
                          updateNewsField(idx, { description: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {n._id
                        ? `ID: ${n._id}`
                        : "Nouvelle actualité (sera créée)"}
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
              (async () => {
                try {
                  const resNews = await fetch(
                    `${API_BASE}/newspays/get?pays=${selectedCountry._id}`,
                    {
                      credentials: "include",
                    }
                  );
                  const fresh = (await resNews.json()) as NewsItem[];
                  setNews(fresh);
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
            disabled={!selectedCountryId || saving}
            className="px-4 py-2 rounded-lg text-white bg-gradient-to-b from-yellow-500 to-[#93720a] hover:brightness-110 disabled:opacity-60"
          >
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>
      </form>
      <div className="relative my-16">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-gray-500">
            Gestion des Antennes
          </span>
        </div>
      </div>
      <Page_antenne />
    </div>
  );
};

export default PagePaysForm;
