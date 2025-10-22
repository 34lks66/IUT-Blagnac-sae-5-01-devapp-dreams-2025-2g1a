import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/pays.css";

type NewsItem = {
  id: string;
  img: string;
  title: string;
  text: string;
};

type Feature = {
  img: string;
  title: string;
  text: string;
  url: string;
  cta: string;
};

type CountryContent = {
  name: string;
  heroImg: string;
  intro: string;
  news: NewsItem[];
  features: Feature[]; // ← plusieurs antennes possibles
};

// --------- CONTENU PAR PAYS  ----------
const COUNTRIES: Record<string, CountryContent> = {
  france: {
    name: "France",
    heroImg: "/images/pays/hero-france.jpg",
    intro:
      "DREAMS accompagne les personnes LGBTQQ+ en France grâce à un réseau d’antennes et de partenaires. Nous proposons un accueil bienveillant, une évaluation personnalisée des besoins et une orientation vers les services juridiques, administratifs, sociaux et de santé. Nos équipes locales développent aussi des actions de sensibilisation.",
    news: [
      { id: "n1", img: "/images/pays/news-1.jpg", title: "Atelier d’accueil", text: "Première rencontre d’accueil et d’écoute bienveillante pour les nouveaux arrivants." },
      { id: "n2", img: "/images/pays/news-2.jpg", title: "Permanence juridique", text: "Séance d’information sur l’asile et la régularisation, en partenariat avec des juristes bénévoles." },
      { id: "n3", img: "/images/pays/news-3.jpg", title: "Soutien santé", text: "Orientation vers des structures de santé et de soutien psychologique partenaires." },
      { id: "n4", img: "/images/pays/news-4.jpg", title: "Hébergement solidaire", text: "Mise en relation avec des familles et lieux d’accueil temporaires." },
      { id: "n5", img: "/images/pays/news-5.jpg", title: "Sensibilisation", text: "Ateliers contre l’homophobie et la transphobie, ouverts au grand public." }
    ],
    // ← EXEMPLE : 2 antennes en France
    features: [
      {
        img: "/images/pays/feature-toulouse.jpg",
        title: "Antenne Toulouse",
        text: "Coordonnées, permanences locales et ressources pour vos démarches (asile, régularisation, accès aux droits et à la santé).",
        url: "#",
        cta: "Voir les ressources →"
      },
      {
        img: "/images/pays/feature-paris.jpg",
        title: "Antenne Paris",
        text: "Informations pratiques, partenaires et accompagnements disponibles en Île-de-France.",
        url: "#",
        cta: "Découvrir l’antenne →"
      }
    ]
  },

  italie: {
    name: "Italie",
    heroImg: "/images/pays/hero-italie.jpg",
    intro:
      "En Italie, DREAMS développe des actions d’accueil et d’orientation en lien avec des structures locales : accompagnement administratif et social, mise en réseau et sensibilisation.",
    news: [
      { id: "n1", img: "/images/pays/it-news-1.jpg", title: "Rencontre associative", text: "Temps d’échanges et d’information sur les droits et dispositifs locaux." },
      { id: "n2", img: "/images/pays/it-news-2.jpg", title: "Orientation sociale", text: "Accompagnement vers les structures de santé et d’insertion." },
      { id: "n3", img: "/images/pays/it-news-3.jpg", title: "Sensibilisation", text: "Atelier de lutte contre les discriminations." }
    ],
    features: [
      {
        img: "/images/pays/it-feature.jpg",
        title: "Antenne Italie",
        text: "Consultez les informations pratiques, les horaires de permanences et les contacts utiles.",
        url: "#",
        cta: "Accéder aux infos →"
      }
    ]
  },

  togo: {
    name: "Togo",
    heroImg: "/images/pays/hero-togo.jpg",
    intro:
      "Au Togo, nous soutenons des parcours de mise à l’abri, d’orientation sociale et d’accès aux soins, en collaboration avec des partenaires locaux.",
    news: [
      { id: "n1", img: "/images/pays/tg-news-1.jpg", title: "Accueil & écoute", text: "Premier accueil bienveillant pour les personnes en besoin d’orientation." },
      { id: "n2", img: "/images/pays/tg-news-2.jpg", title: "Mise à l’abri", text: "Solutions temporaires d’hébergement solidaire." },
      { id: "n3", img: "/images/pays/tg-news-3.jpg", title: "Accès aux soins", text: "Relais vers les structures de santé partenaires." }
    ],
    features: [
      {
        img: "/images/pays/tg-feature.jpg",
        title: "Antenne Togo",
        text: "Découvrez les lieux d’accueil et les contacts référents dans la région.",
        url: "#",
        cta: "Voir l’antenne →"
      }
    ]
  },

  "burkina-faso": {
    name: "Burkina Faso",
    heroImg: "/images/pays/hero-bf.jpg",
    intro:
      "Au Burkina Faso, DREAMS agit avec un réseau de partenaires pour l’orientation, l’accès aux droits et l’accompagnement social.",
    news: [
      { id: "n1", img: "/images/pays/bf-news-1.jpg", title: "Orientation", text: "Information sur l’accès aux droits et dispositifs d’assistance." },
      { id: "n2", img: "/images/pays/bf-news-2.jpg", title: "Réseau local", text: "Mise en relation avec des structures communautaires." },
      { id: "n3", img: "/images/pays/bf-news-3.jpg", title: "Sensibilisation", text: "Actions de prévention et d’éducation." }
    ],
    features: [
      {
        img: "/images/pays/bf-feature.jpg",
        title: "Antenne Burkina Faso",
        text: "Ressources disponibles, points de contact et horaires de permanence.",
        url: "#",
        cta: "Toutes les infos →"
      }
    ]
  },

  "cote-d-ivoire": {
    name: "Côte d’Ivoire",
    heroImg: "/images/pays/hero-ci.jpg",
    intro:
      "En Côte d’Ivoire, DREAMS intervient sur l’accueil, l’orientation, la mise à l’abri et la sensibilisation, en lien avec les acteurs locaux.",
    news: [
      { id: "n1", img: "/images/pays/ci-news-1.jpg", title: "Premier accueil", text: "Écoute bienveillante et évaluation des besoins." },
      { id: "n2", img: "/images/pays/ci-news-2.jpg", title: "Soutien social", text: "Orientation vers les dispositifs d’aide adaptés." },
      { id: "n3", img: "/images/pays/ci-news-3.jpg", title: "Prévention & santé", text: "Relais santé et actions de prévention." }
    ],
    features: [
      {
        img: "/images/pays/ci-feature.jpg",
        title: "Antenne Côte d’Ivoire",
        text: "Informations pratiques, partenaires et ressources locales.",
        url: "#",
        cta: "Découvrir →"
      }
    ]
  }
};
// -------------------------------------------------------------------

const Pays: React.FC = () => {
  // /pays/:slug => ex. "france", "italie", "togo", "burkina-faso", "cote-d-ivoire"
  const { slug = "france" } = useParams<{ slug: string }>();

  const data: CountryContent | undefined = COUNTRIES[slug.toLowerCase()];
  const country = useMemo<CountryContent | null>(() => {
    if (data) return data;
    // Fallback simple si slug non trouvé
    return {
      name: "Pays",
      heroImg: "/images/pays/hero-default.jpg",
      intro:
        "Présentation à venir. Retrouvez bientôt les informations détaillées pour ce pays (antennes, permanences, partenaires et ressources).",
      news: [],
      features: [
        {
          img: "/images/pays/feature.jpg",
          title: "Informations",
          text: "Ressources et coordonnées disponibles prochainement.",
          url: "/",
          cta: "Revenir à l’accueil →"
        }
      ]
    };
  }, [data]);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = document.querySelector<HTMLDivElement>(".pays-viewport");
    if (!el) return;
    const width = el.clientWidth;
    const delta = direction === "left" ? -width / 3 : width / 3;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <main className="pays">
      {/* HERO */}
      <section className="pays-hero">
        <img className="pays-hero__img" src={country!.heroImg} alt={`${country!.name} - DREAMS`} />
        <div className="pays-hero__content">
          <div className="pays-hero__card">
            <p className="pays-hero__breadcrumb">
              <Link to="/" className="pays-crumb">Accueil</Link> / Pays / {country!.name}
            </p>
            <h1 className="pays-title">{country!.name}</h1>
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
          <p className="pays-paragraph">{country!.intro}</p>
        </div>
      </section>

      {/* CARROUSSEL si contenu */}
      {country!.news.length > 0 && (
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
              {country!.news.map((item) => (
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

      {/* FEATURES (une ou plusieurs antennes) */}
      {country!.features?.length > 0 && (
        <section className="pays-features">
          {country!.features.map((f, idx) => (
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
