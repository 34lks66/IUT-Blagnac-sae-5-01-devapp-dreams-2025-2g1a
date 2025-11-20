import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";

type UINewsItem = { id: string; img: string; title: string; text: string };
type UIFeature = { img: string; title: string; text: string; url: string; cta: string };
type UICountryContent = { name: string; heroImg: string; intro: string; news: UINewsItem[]; features: UIFeature[] };

type ApiCountry = { _id: string; nom: string; description: string; image?: string | null };
type ApiNews = { _id: string; titre: string; description: string; image?: string | null; pays: string | { _id: string } };
type ApiAntenne = {
  _id: string;
  nom: string;
  description: string;
  image?: string | null;
  pays: string | { _id: string };
};

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API_ORIGIN = API_BASE.replace(/\/api$/, "");
const HERO_DEFAULT = "/images/pays/hero-default.jpg";
const ANTENNE_PLACEHOLDER = "/images/pays/antenne-placeholder.jpg";

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const Pays: React.FC = () => {
  const { slug = "france" } = useParams<{ slug: string }>();
  const [countries, setCountries] = useState<ApiCountry[]>([]);
  const [countryId, setCountryId] = useState<string | null>(null);
  const [news, setNews] = useState<UINewsItem[]>([]);
  const [features, setFeatures] = useState<UIFeature[]>([]);
  const [loadingCountry, setLoadingCountry] = useState(true);
  const [loadingContent, setLoadingContent] = useState(false);

  // --- chargement pays ---
  useEffect(() => {
    (async () => {
      try {
        setLoadingCountry(true);
        const res = await fetch(`${API_BASE}/pays/get`, { credentials: "include" });
        const data: ApiCountry[] = res.ok ? await res.json() : [];
        setCountries(data);
        const match = data.find((p) => slugify(p.nom) === slug.toLowerCase());
        setCountryId(match ? match._id : null);
      } catch {
        setCountryId(null);
      } finally {
        setLoadingCountry(false);
      }
    })();
  }, [slug]);

  const selectedCountry = useMemo(
    () => (countryId ? countries.find((c) => c._id === countryId) || null : null),
    [countries, countryId]
  );

  // --- contenu : news + antennes ---
  useEffect(() => {
    if (!selectedCountry?._id) return;
    (async () => {
      try {
        setLoadingContent(true);
        const [resNews, resAnt] = await Promise.all([
          fetch(`${API_BASE}/newspays/get?pays=${selectedCountry._id}`, { credentials: "include" }),
          fetch(`${API_BASE}/antenne/get?pays=${selectedCountry._id}`, { credentials: "include" }),
        ]);

        const dataNews: ApiNews[] = resNews.ok ? await resNews.json() : [];
        const dataAnt: ApiAntenne[] = resAnt.ok ? await resAnt.json() : [];

        setNews(
          dataNews.map((n) => ({
            id: n._id,
            img: n.image ? `${API_ORIGIN}${n.image}` : HERO_DEFAULT,
            title: n.titre,
            text: n.description,
          }))
        );

        setFeatures(
          dataAnt.map((a) => ({
            img: a.image ? `${API_ORIGIN}${a.image}` : ANTENNE_PLACEHOLDER,
            title: `Antenne ${a.nom}`,
            text: a.description,
            url: `/villes/${slugify(a.nom)}`,
            cta: "Voir l’antenne →",
          }))
        );
      } catch {
        setNews([]);
        setFeatures([]);
      } finally {
        setLoadingContent(false);
      }
    })();
  }, [selectedCountry?._id]);

  const country: UICountryContent = useMemo(() => {
    if (!selectedCountry)
      return {
        name: "Pays",
        heroImg: HERO_DEFAULT,
        intro:
          "Présentation à venir. Retrouvez bientôt les informations détaillées pour ce pays (antennes, permanences, partenaires et ressources).",
        news: [],
        features: [],
      };
    return {
      name: selectedCountry.nom,
      heroImg: selectedCountry.image ? `${API_ORIGIN}${selectedCountry.image}` : HERO_DEFAULT,
      intro: selectedCountry.description || "",
      news,
      features,
    };
  }, [selectedCountry, news, features]);

  const scrollByAmount = (dir: "left" | "right") => {
    const el = document.querySelector<HTMLDivElement>(".pays-viewport");
    if (!el) return;
    const w = el.clientWidth;
    el.scrollBy({ left: dir === "left" ? -w / 3 : w / 3, behavior: "smooth" });
  };

  const goldTitle = "bg-gradient-to-r from-[#d4af37] to-[#a87700] bg-clip-text text-transparent";

  return (
    <main className="bg-white text-gray-800 leading-relaxed">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img src={country.heroImg} alt={country.name} className="w-full h-[46vh] md:h-[58vh] object-cover" />
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-[960px] mx-auto mb-4 bg-white/95 rounded-2xl p-4 md:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <p className="text-gray-500 text-xs">
              <Link to="/" className="hover:underline">
                Accueil
              </Link>{" "}
              / Pays / {country.name}
            </p>
            <h1 className={`text-3xl md:text-4xl font-extrabold ${goldTitle}`}>{country.name}</h1>
            <p className="text-gray-700 mt-1">
              Antennes locales, accueil, orientation et actions de sensibilisation.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-[1100px] mx-auto px-4 py-8">
        <h2 className={`text-[22px] font-extrabold ${goldTitle}`}>Présentation</h2>
        <div className="h-1 w-18 rounded-full my-2 bg-[linear-gradient(90deg,#ef4444_0%,#f59e0b_25%,#facc15_40%,#22c55e_60%,#3b82f6_80%,#8b5cf6_100%)]" />
        <p className="text-gray-700">
          {loadingCountry ? "Chargement…" : country.intro || "Présentation en cours de mise à jour."}
        </p>
      </section>

      {/* NEWS */}
      {!loadingContent && country.news.length > 0 && (
        <section className="max-w-[1100px] mx-auto px-4 py-6">
          <div className="flex items-end justify-between gap-3 mb-3">
            <div>
              <h3 className={`text-[22px] font-extrabold ${goldTitle}`}>Projets & actualités</h3>
              <div className="h-1 w-18 rounded-full my-2 bg-[linear-gradient(90deg,#f43f5e,#fb923c,#facc15)]" />
            </div>
            <div className="flex gap-2">
              <button
                className="border border-gray-300 bg-white px-2.5 py-1.5 rounded-full hover:bg-gray-50 active:translate-y-px"
                onClick={() => scrollByAmount("left")}
              >
                ‹
              </button>
              <button
                className="border border-gray-300 bg-white px-2.5 py-1.5 rounded-full hover:bg-gray-50 active:translate-y-px"
                onClick={() => scrollByAmount("right")}
              >
                ›
              </button>
            </div>
          </div>

          <div className="pays-viewport overflow-x-auto overflow-y-hidden snap-x snap-mandatory pb-1">
            <div className="flex gap-4 p-1">
              {country.news.map((n) => (
                <article
                  key={n.id}
                  className="snap-start flex-[0_0_100%] sm:flex-[0_0_calc(50%-8px)] lg:flex-[0_0_calc(33.333%-10.6px)] bg-white border border-gray-200 rounded-2xl shadow-[0_6px_18px_rgba(0,0,0,0.05)] overflow-hidden"
                >
                  <div className="h-[200px] overflow-hidden">
                    <img
                      src={n.img}
                      alt={n.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm font-bold text-gray-900">{n.title}</h4>
                    <p className="text-sm text-gray-700 mt-1">{n.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FEATURES = ANTENNES */}
      {!loadingContent && country.features.length > 0 && (
        <section className="max-w-[1100px] mx-auto px-4 py-10 grid gap-10">
          <div>
            <h3 className={`text-[22px] font-extrabold ${goldTitle}`}>Antennes locales</h3>
            <div className="h-1 w-18 rounded-full my-2 bg-[linear-gradient(90deg,#22c55e,#3b82f6,#8b5cf6)]" />
            <p className="text-gray-700 text-sm">
              Retrouvez les antennes locales, leurs missions et les points d&apos;accueil dans ce pays.
            </p>
          </div>

          {country.features.map((f, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
            >
              {/* Image à gauche */}
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={f.img}
                  alt={f.title}
                  className="w-full h-full max-h-[360px] object-cover rounded-2xl shadow-[0_10px_24px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:scale-[1.04]"
                />
              </div>

              {/* Texte + bouton à droite */}
              <div>
                <h3 className={`text-[20px] md:text-[22px] font-extrabold ${goldTitle}`}>{f.title}</h3>
                <div className="h-1 w-18 rounded-full my-2 bg-[linear-gradient(90deg,#22c55e,#3b82f6,#8b5cf6)]" />
                <p className="text-gray-700 mb-3">{f.text}</p>

                <Link
                  to={f.url}
                  className="inline-block px-4 py-2 rounded-xl font-bold bg-black text-white hover:bg-gray-800 transition"
                >
                  {f.cta}
                </Link>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default Pays;
