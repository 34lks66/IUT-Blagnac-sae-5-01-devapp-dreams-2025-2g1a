import React, { useEffect, useRef, useState } from "react";
import { apiFetch } from "../services/api";
import { useAuth } from "./utils/useAuth";

// ---------- Props ----------
type Props = {
  countryId: string;
  onBack?: () => void;
};

// ---------- Types ----------
type Country = {
  _id: string;
  nom: string;
  description: string;
  image?: string; // ex: "/uploads/xxx.jpg"
  nomSiege: string;
  adresse: string;
  horaire: string;
  mail: string;
  number: string;
  createdAt?: string;
  updatedAt?: string;
};

type NewsItem = {
  _id?: string; // absent => à créer
  titre: string;
  description: string;
  image?: File | string | null; // File (nouvelle), string (existante "/uploads/..."), null
  pays: string; // id du pays
};

// ---------- Helpers ----------
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// UI helpers
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
      "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500/50" +
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
      "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500/50" +
      (p.className ?? "")
    }
  />
);

// ---------- Composant principal ----------
const PagePaysForm: React.FC<Props> = ({ countryId, onBack }) => {
  const { role } = useAuth();
  // Pays
  const [country, setCountry] = useState<Country | null>(null);

  // Edition du pays
  const [description, setDescription] = useState<string>("");
  const [countryImageFile, setCountryImageFile] = useState<File | null>(null); // nouvelle image du pays
  const [nomSiege, setNomSiege] = useState<string>("");
  const [adresse, setAdresse] = useState<string>("");
  const [horaire, setHoraire] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [number, setNumber] = useState<string>("");

  // News
  const [news, setNews] = useState<NewsItem[]>([]);
  const initialNewsIdsRef = useRef<Set<string>>(new Set());

  // UI states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingCountry, setDeletingCountry] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // ----- Load pays + news -----
  const loadCountryAndNews = async (id: string) => {
    setLoading(true);
    try {
      // Charger tous les pays (ou remplace par /pays/:id si tu l'as)
      const resPays = await apiFetch("/api/pays/get");
      const all: Country[] = resPays.ok ? await resPays.json() : [];
      const current = all.find((c) => c._id === id) || null;
      setCountry(current);
      setDescription(current?.description || "");
      setCountryImageFile(null);
      setNomSiege(current?.nomSiege || "");
      setAdresse(current?.adresse || "");
      setHoraire(current?.horaire || "");
      setMail(current?.mail || "");
      setNumber(current?.number || "");

      // News
      const resNews = await apiFetch(`/api/newspays/get?pays=${id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataNews: any[] = resNews.ok ? await resNews.json() : [];
      setNews(
        dataNews.map((n) => ({
          _id: n._id,
          titre: n.titre,
          description: n.description,
          image: n.image ?? null,
          pays: n.pays?._id || n.pays || id,
        }))
      );
      initialNewsIdsRef.current = new Set(
        dataNews.filter((n) => n._id).map((n) => n._id)
      );
    } catch (e) {
      console.error(e);
      setCountry(null);
      setNews([]);
      initialNewsIdsRef.current = new Set();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (countryId) loadCountryAndNews(countryId);
  }, [countryId]);

  // News helpers
  const addNews = () => {
    if (!country?._id) return;
    setNews((s) => [
      ...s,
      { titre: "", description: "", image: null, pays: country._id },
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

  const renderImageThumb = (img?: File | string | null) => {
    if (!img) return null;
    if (typeof img === "string") {
      return (
        <img
          src={`${API_BASE}${img}`}
          className="w-28 h-20 object-cover rounded-md border border-gray-200"
        />
      );
    }
    return (
      <img
        src={URL.createObjectURL(img)}
        className="w-28 h-20 object-cover rounded-md border border-gray-200"
      />
    );
  };

  const newNewsMissingImage = news.some(
    (n) => !n._id && !(n.image instanceof File)
  );

  // ----- Submit -----
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!country?._id) return;

    try {
      setSaving(true);
      setSuccessMessage(null);

      // images obligatoires pour nouvelles actus
      const toCreatePreview = news.filter((n) => !n._id);
      for (const n of toCreatePreview) {
        if (!(n.image instanceof File)) {
          alert("Chaque nouvelle actualité doit avoir une image.");
          setSaving(false);
          return;
        }
      }

      // Update pays
      if (countryImageFile) {
        const fd = new FormData();
        fd.append("description", description);
        fd.append("image", countryImageFile);
        fd.append("nom_siege", nomSiege);
        fd.append("adresse", adresse);
        fd.append("horaire", horaire);
        fd.append("mail", mail);
        fd.append("number", number);
        const r = await apiFetch(`/api/pays/update/${country._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: fd,
        });

        if (!r.ok) throw new Error("Échec update pays");
      } else {
        const r = await apiFetch(`/api/pays/update/${country._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description, nomSiege, adresse, horaire, mail, number }),
        });

        if (!r.ok) throw new Error("Échec update pays");
      }

      // Diff news
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
          toCreate.map(async (n) => {
            const fd = new FormData();
            fd.append("titre", n.titre);
            fd.append("description", n.description);
            fd.append("pays", country._id);
            if (n.image && n.image instanceof File) fd.append("image", n.image);
            const r = await apiFetch("/api/newspays/save", {
              method: "POST",
              body: fd,
            });
            if (!r.ok) throw new Error("Échec create news");
            return r.json();
          })
        );
      }

      if (toUpdate.length) {
        await Promise.all(
          toUpdate.map(async (n) => {
            if (n.image && n.image instanceof File) {
              const fd = new FormData();
              fd.append("titre", n.titre);
              fd.append("description", n.description);
              fd.append("pays", country._id);
              fd.append("image", n.image);
              const r = await apiFetch(`/api/newspays/update/${n._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: fd,
              });
              if (!r.ok) throw new Error("Échec update news (file)");
              return r.json();
            } else {
              const r = await apiFetch(`/api/newspays/update/${n._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  titre: n.titre,
                  description: n.description,
                  pays: country._id,
                }),
              });
              if (!r.ok) throw new Error("Échec update news (json)");
              return r.json();
            }
          })
        );
      }

      if (toDelete.length) {
        await Promise.all(
          toDelete.map((id) =>
            apiFetch(`/api/newspays/delete/${id}`, {
              method: "DELETE",
            }).then((r) => {
              if (!r.ok) throw new Error("Échec delete news");
              return r.json();
            })
          )
        );
      }

      await loadCountryAndNews(country._id);
      setSuccessMessage("Enregistré avec succès !");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error(err);
      alert("Erreur pendant l'enregistrement.");
    } finally {
      setSaving(false);
    }
  };

  // Delete pays (optionnel dans le form)
  const handleDeleteCountry = async () => {
    if (!country?._id) return;
    const ok = window.confirm(
      `Supprimer le pays "${country.nom}" ?\n\nToutes ses actualités liées seront supprimées.`
    );
    if (!ok) return;

    try {
      setDeletingCountry(true);
      const res = await apiFetch(`/api/pays/delete/${country._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Échec suppression du pays");

      alert("Pays supprimé !");
      if (onBack) onBack();
    } catch (e) {
      console.error(e);
      alert("Impossible de supprimer le pays.");
    } finally {
      setDeletingCountry(false);
    }
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Chargement…</div>;
  }

  if (!country) {
    return (
      <div className="p-6 rounded-lg border border-red-200 bg-red-50 text-red-700">
        Impossible de charger ce pays. Il a peut-être été supprimé.
        {onBack && (
          <div className="mt-3">
            <button
              onClick={onBack}
              className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              ← Revenir à la liste
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-yellow-500 bg-clip-text text-transparent">
            {country.nom} Éditeur
          </h2>
          <p className="text-gray-600">
            Édite la description, l'image et les actualités du pays.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              ← Retour
            </button>
          )}
          {role !== "X" && (
            <button
              type="button"
              onClick={handleDeleteCountry}
              disabled={deletingCountry}
              className="text-sm px-3 py-1.5 rounded-md bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 disabled:opacity-60"
              title="Supprimer ce pays et toutes ses actualités"
            >
              {deletingCountry ? "Suppression…" : "Supprimer le pays"}
            </button>
          )}
        </div>
      </div>

      {/* Pays (nom lecture + image + description) */}
      <div className="grid md:grid-cols-[1fr_auto] gap-4 items-start">
        <div>
          <Label>Nom du pays</Label>
          <Input value={country.nom} disabled />
        </div>

        <div>
          <Label>Image du pays</Label>
          <div className="mt-1 flex items-center gap-3">
            <div className="w-28 h-20 rounded-md bg-gray-100 border border-gray-200 overflow-hidden grid place-items-center">
              {countryImageFile ? (
                <img
                  src={URL.createObjectURL(countryImageFile)}
                  className="w-full h-full object-cover"
                />
              ) : country.image ? (
                <img
                  src={`${API_BASE}${country.image}`}
                  className="w-full h-full object-cover"
                />
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
              Changer d'image
            </label>
            {countryImageFile && (
              <span className="text-xs text-gray-500">
                {countryImageFile.name}
              </span>
            )}
          </div>
        </div>
      </div>

      <div>
        <Label>Description</Label>
        <TextArea
          rows={6}
          placeholder="Présentation du pays (accueil, orientation, partenaires, etc.)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Section Actualités */}
      <section className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Actualités du pays</h3>
          <button
            type="button"
            onClick={addNews}
            className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-200"
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
                <div className="grid md:grid-cols-[1fr_1fr_auto] gap-4 items-start">
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

                  <div>
                    <Label>Image</Label>
                    <div className="mt-1 flex items-center gap-3">
                      <div className="w-28 h-20 rounded-md bg-gray-100 border border-gray-200 overflow-hidden grid place-items-center">
                        {renderImageThumb(n.image)}
                        {!n.image && (
                          <span className="text-[11px] text-gray-400 px-1 text-center">
                            Image requise
                          </span>
                        )}
                      </div>
                      <label className="inline-flex items-center px-3 py-2 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0] || null;
                            if (f) updateNewsField(idx, { image: f });
                          }}
                        />
                        Choisir une image
                      </label>
                    </div>
                    {!n._id && !(n.image instanceof File) && (
                      <p className="mt-1 text-xs text-red-600">
                        Obligatoire pour une nouvelle actualité.
                      </p>
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

      {/* Contact */}
      <section className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold mb-6">Contact du pays</h3>
        <div className="flex items-center justify-between mb-4">
          <form className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label>Nom du siège</Label>
                <input type="text" value={nomSiege} onChange={(e) => setNomSiege(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500/50" />
              </div>
              <div className="flex-[2]">
                <Label>Adresse</Label>
                <input type="text" value={adresse} onChange={(e) => setAdresse(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500/50" />
              </div>
              <div className="flex-[2]">
                <Label>Horaire</Label>
                <input type="text" value={horaire} onChange={(e) => setHoraire(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500/50" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label>Adresse mail</Label>
                <input type="text" value={mail} onChange={(e) => setMail(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500/50" />
              </div>
              <div className="flex-1">
                <Label>Numéro de téléphone</Label>
                <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500/50" />
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Actions */}
      <div className="pt-2 flex items-center justify-end gap-3">
        {successMessage && (
          <span className="text-green-600 font-medium animate-pulse">
            {successMessage}
          </span>
        )}
        <button
          type="button"
          onClick={() => {
            if (!country) return;
            loadCountryAndNews(country._id);
            setCountryImageFile(null);
          }}
          className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800"
        >
          Réinitialiser
        </button>

        <button
          type="submit"
          disabled={saving || newNewsMissingImage}
          className="px-4 py-2 rounded-lg text-white bg-yellow-500 hover:brightness-110 disabled:opacity-60"
        >
          {saving ? "Enregistrement…" : "Enregistrer"}
        </button>
      </div>
    </form>
  );
};

export default PagePaysForm;
