import React, { useState } from "react";

type FileWithPreview = { file: File; preview: string };
type NewsForm = { id: string; title: string; text: string; image?: FileWithPreview | null };
type AntennaForm = { id: string; name: string; text: string; image?: FileWithPreview | null };

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

const COUNTRY_OPTIONS = [
  "France", "Italie", "Togo", "Burkina Faso", "Côte d’Ivoire",
  "Sénégal", "Cameroun", "Bénin", "Gabon", "Maroc", "Tunisie", "Algérie",
];

const Label: React.FC<{ htmlFor?: string; children: React.ReactNode }> = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">{children}</label>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (p) => (
  <input {...p} className={"mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 " + (p.className ?? "")}/>
);

const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (p) => (
  <textarea {...p} className={"mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 " + (p.className ?? "")}/>
);

const ImagePicker: React.FC<{
  value?: FileWithPreview | null;
  onChange: (v: FileWithPreview | null) => void;
  label: string;
}> = ({ value, onChange, label }) => {
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return onChange(null);
    onChange({ file: f, preview: URL.createObjectURL(f) });
  };
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1 flex items-center gap-4">
        <div className="w-40 h-24 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
          {value?.preview ? <img src={value.preview} className="w-full h-full object-cover" /> :
            <div className="w-full h-full grid place-items-center text-gray-400 text-sm">Aucune image</div>}
        </div>
        <label className="inline-flex items-center px-3 py-2 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
          <input type="file" accept="image/*" className="hidden" onChange={onFile} />
          Choisir une image
        </label>
        {value && (
          <button type="button" onClick={() => onChange(null)} className="text-sm text-red-600 hover:underline">
            Retirer
          </button>
        )}
      </div>
    </div>
  );
};

const PagePaysForm: React.FC = () => {
  const [country, setCountry] = useState<string>("France");
  const [hero, setHero] = useState<FileWithPreview | null>(null);
  const [description, setDescription] = useState<string>("");

  const [news, setNews] = useState<NewsForm[]>([{ id: uid(), title: "", text: "", image: null }]);
  const [antennas, setAntennas] = useState<AntennaForm[]>([{ id: uid(), name: "", text: "", image: null }]);

  const addNews = () => setNews((s) => [...s, { id: uid(), title: "", text: "", image: null }]);
  const rmNews = (id: string) => setNews((s) => (s.length > 1 ? s.filter((n) => n.id !== id) : s));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      country,
      hero: hero?.file?.name ?? null,
      description,
      news: news.map(n => ({ title: n.title, text: n.text, image: n.image?.file?.name ?? null })),
      antennas: antennas.map(a => ({ name: a.name, text: a.text, image: a.image?.file?.name ?? null })),
    };
    console.log("PAGE PAYS ->", payload);
    alert("Données prêtes dans la console (aucun backend pour l’instant).");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Pays + Bannière */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label>Pays</Label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            size={6}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 bg-white"
          >
            {COUNTRY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <p className="text-xs text-gray-500 mt-1">Liste statique pour l’instant.</p>
        </div>

        <ImagePicker label="Image de bannière (Hero)" value={hero} onChange={setHero} />
      </div>

      {/* Description */}
      <div>
        <Label>Description</Label>
        <TextArea
          rows={6}
          placeholder="Brève présentation (accueil, orientation, partenaires...)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Actualités */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Actualités</h3>
          <button type="button" onClick={addNews} className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
            + Ajouter une actualité
          </button>
        </div>

        <div className="grid gap-6">
          {news.map((n) => (
            <div key={n.id} className="rounded-xl border border-gray-200 p-4 grid md:grid-cols-[1fr_240px] gap-4">
              <div className="space-y-3">
                <div>
                  <Label htmlFor={`news-title-${n.id}`}>Titre</Label>
                  <Input
                    id={`news-title-${n.id}`} placeholder="Ex : Permanence juridique"
                    value={n.title}
                    onChange={(e) => setNews(s => s.map(x => x.id === n.id ? { ...x, title: e.target.value } : x))}
                  />
                </div>
                <div>
                  <Label htmlFor={`news-text-${n.id}`}>Description</Label>
                  <TextArea
                    id={`news-text-${n.id}`} rows={4} placeholder="Texte de l’actualité"
                    value={n.text}
                    onChange={(e) => setNews(s => s.map(x => x.id === n.id ? { ...x, text: e.target.value } : x))}
                  />
                </div>
                <button type="button" onClick={() => rmNews(n.id)} className="text-sm text-red-600 hover:underline" disabled={news.length === 1}>
                  Supprimer cette actualité
                </button>
              </div>

              <ImagePicker
                label="Image"
                value={n.image ?? null}
                onChange={(v) => setNews(s => s.map(x => x.id === n.id ? { ...x, image: v } : x))}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Actions */}
      <div className="pt-2 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => {
            setDescription(""); setHero(null);
            setNews([{ id: uid(), title: "", text: "", image: null }]);
            setAntennas([{ id: uid(), name: "", text: "", image: null }]);
          }}
          className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800"
        >
          Réinitialiser
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg text-white bg-gradient-to-b from-yellow-500 to-[#93720a] hover:brightness-110"
        >
          Enregistrer (console)
        </button>
      </div>
    </form>
  );
};

export default PagePaysForm;
