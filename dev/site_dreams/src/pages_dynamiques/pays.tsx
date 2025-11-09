import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/pays.css";

// ---------------- Types côté UI ----------------
type UINewsItem = {
  id: string;
  img: string;
  title: string;
  text: string;
};

type UIFeature = {
  img: string;
  title: string;
  text: string;
  url: string;
  cta: string;
};

type UICountryContent = {
  name: string;
  heroImg: string;
  intro: string;
  news: UINewsItem[];
  features: UIFeature[];
};

// ---------------- Types API ----------------
type ApiCountry = {
  _id: string;
  nom: string;
  description: string;
  image?: string | null;   // ex "/uploads/xxx.jpg"
};

type ApiNews = {
  _id: string;
  titre: string;
  description: string;
  image?: string | null;   // ex "/uploads/xxx.jpg"
  pays: string | { _id: string };
};

type ApiAntenne = {
  _id: string;
  nom: string;
  description: string;
  pays: string | { _id: string };
};

// ---------------- Helpers ----------------
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Fallbacks (assets côté site)
const HERO_DEFAULT = "/images/pays/hero-default.jpg";
const ANTENNE_PLACEHOLDER = "/images/pays/antenne-placeholder.jpg";

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// ---------------- Composant ----------------
const Pays: React.FC = () => {
  const { slug = "france" } = useParams<{ slug: string }>();

  const [countries, setCountries] = useState<ApiCountry[]>([]);
  const [countryId, setCountryId] = useState<string | null>(null);

  const [news, setNews] = useState<UINewsItem[]>([]);
  const [features, setFeatures] = useState<UIFeature[]>([]);

  const [loadingCountry, setLoadingCountry] = useState(true);
  const [loadingContent, setLoadingContent] = useState(false);

  // 1) Charger tous les pays puis choisir celui qui correspond au slug
  useEffect(() => {
    (async () => {
      try {
        setLoadingCountry(true);
        const res = await fetch(`${API_BASE}/api/pays/get`, { credentials: "include" });
        if (!res.ok) throw new Error("Erreur chargement pays");
        const data: ApiCountry[] = await res.json();
        setCountries(data);

        // Trouver le pays correspondant au slug
        const match = data.find((p) => slugify(p.nom) === slug.toLowerCase());
        setCountryId(match ? match._id : null);
      } catch (e) {
        console.error(e);
        setCountryId(null);
      } finally {
        setLoadingCountry(false);
      }
    })();
  }, [slug]);

  // country sélectionné (ou null)
  const selectedCountry = useMemo<ApiCountry | null>(() => {
    if (!countryId) return null;
    return countries.find((c) => c._id === countryId) || null;
  }, [countries, countryId]);

  // 2) Charger news & antennes du pays sélectionné
  useEffect(() => {
    if (!selectedCountry?._id) return;

    (async () => {
      try {
        setLoadingContent(true);

        // NEWS
        const resNews = await fetch(
          `${API_BASE}/api/newspays/get?pays=${selectedCountry._id}`,
          { credentials: "include" }
        );
        const dataNews: ApiNews[] = resNews.ok ? await resNews.json() : [];

        const uiNews: UINewsItem[] = (dataNews || []).map((n) => ({
          id: n._id,
          img: n.image ? `${API_BASE}${n.image}` : HERO_DEFAULT, // news devraient avoir une image, mais fallback au cas où
          title: n.titre,
          text: n.description,
        }));
        setNews(uiNews);

        // ANTENNES
        const resAnt = await fetch(
          `${API_BASE}/api/antenne/get?pays=${selectedCountry._id}`,
          { credentials: "include" }
        );
        const dataAnt: ApiAntenne[] = resAnt.ok ? await resAnt.json() : [];

        const uiFeatures: UIFeature[] = (dataAnt || []).map((a) => ({
          img: ANTENNE_PLACEHOLDER, // pas d'image antenne pour l'instant
          title: `Antenne ${a.nom}`,
          text: a.description,
          url: "#", // si tu fais une page antenne plus tard, tu pourras mettre /antenne/:id
          cta: "Voir l’antenne →",
        }));
        setFeatures(uiFeatures);
      } catch (e) {
        console.error(e);
        setNews([]);
        setFeatures([]);
      } finally {
        setLoadingContent(false);
      }
    })();
  }, [selectedCountry?._id]);

  // Country content pour le rendu
  const country: UICountryContent = useMemo(() => {
    if (!selectedCountry) {
      return {
        name: "Pays",
        heroImg: HERO_DEFAULT,
        intro:
          "Présentation à venir. Retrouvez bientôt les informations détaillées pour ce pays (antennes, permanences, partenaires et ressources).",
        news: [],
        features: [],
      };
    }
    return {
      name: selectedCountry.nom,
      heroImg: selectedCountry.image ? `${API_BASE}${selectedCountry.image}` : HERO_DEFAULT,
      intro: selectedCountry.description || "",
      news,
      features,
    };
  }, [selectedCountry, news, features]);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = document.querySelector<HTMLDivElement>(".pays-viewport");
    if (!el) return;
    const width = el.clientWidth;
    const delta = direction === "left" ? -width / 3 : width / 3;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  // ---------------- Render ----------------
  return (
    <main className="pays">
      {/* HERO */}
      <section className="pays-hero">
        <img
          className="pays-hero__img"
          src={country.heroImg}
          alt={`${country.name} - DREAMS`}
        />
        <div className="pays-hero__content">
          <div className="pays-hero__card">
            <p className="pays-hero__breadcrumb">
              <Link to="/" className="pays-crumb">Accueil</Link> / Pays / {country.name}
            </p>
            <h1 className="pays-title">{country.name}</h1>
            <p className="pays-hero__subtitle">
              Antennes locales, accueil, orientation et actions de sensibilisation.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="pays-intro">
        <div className="pays-intro__inner">
          <h2 className="pays-subtitle">Présentation</h2>
          <div className="pays-divider pays-divider--rainbow" />
          {loadingCountry ? (
            <p className="pays-paragraph">Chargement…</p>
          ) : (
            <p className="pays-paragraph">{country.intro || "Présentation en cours de mise à jour."}</p>
          )}
        </div>
      </section>

      {/* NEWS */}
      {!loadingContent && country.news.length > 0 && (
        <section className="pays-news">
          <div className="pays-news__head">
            <div>
              <h3 className="pays-subtitle">Projets & actualités</h3>
              <div className="pays-divider pays-divider--warm" />
            </div>
            <div className="pays-arrows">
              <button className="pays-arrow" onClick={() => scrollByAmount("left")} aria-label="Précédent">‹</button>
              <button className="pays-arrow" onClick={() => scrollByAmount("right")} aria-label="Suivant">›</button>
            </div>
          </div>

          <div className="pays-viewport">
            <div className="pays-track">
              {country.news.map((item) => (
                <article key={item.id} className="pays-card">
                  <div className="pays-card__imgWrap">
                    <img src={item.img} alt={item.title} className="pays-card__img" />
                  </div>
                  <div className="pays-card__body">
                    <h4 className="pays-card__title">{item.title}</h4>
                    <p className="pays-card__text">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FEATURES (antennes) */}
      {!loadingContent && country.features.length > 0 && (
        <section className="pays-features">
          {country.features.map((f, idx) => (
            <div key={`${f.title}-${idx}`} className="pays-feature__grid">
              <div className="pays-feature__media">
                <img src={f.img} alt={f.title} className="pays-feature__img" />
              </div>
              <div className="pays-feature__text">
                <h3 className="pays-subtitle">{f.title}</h3>
                <div className="pays-divider pays-divider--rainbow2" />
                <p className="pays-paragraph">{f.text}</p>
                <a href={f.url} className="pays-btn pays-btn--solid">{f.cta}</a>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default Pays;
