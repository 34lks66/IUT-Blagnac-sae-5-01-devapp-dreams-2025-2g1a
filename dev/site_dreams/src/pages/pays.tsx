import React, { useMemo } from "react";
import "../styles/pays.css";

type NewsItem = {
  id: string;
  img: string;
  title: string;
  text: string;
};

const newsSeed: NewsItem[] = [
  {
    id: "n1",
    img: "/images/pays/news-1.jpg",
    title: "Atelier d’accueil",
    text: "Première rencontre d’accueil et d’écoute bienveillante pour les nouveaux arrivants."
  },
  {
    id: "n2",
    img: "/images/pays/news-2.jpg",
    title: "Permanence juridique",
    text: "Séance d’information sur l’asile et la régularisation, en partenariat avec des juristes bénévoles."
  },
  {
    id: "n3",
    img: "/images/pays/news-3.jpg",
    title: "Soutien santé",
    text: "Orientation vers des structures de santé et de soutien psychologique partenaires."
  },
  {
    id: "n4",
    img: "/images/pays/news-4.jpg",
    title: "Hébergement solidaire",
    text: "Mise en relation avec des familles et lieux d’accueil temporaires."
  },
  {
    id: "n5",
    img: "/images/pays/news-5.jpg",
    title: "Sensibilisation",
    text: "Ateliers contre l’homophobie et la transphobie, ouverts au grand public."
  }
];

const Pays: React.FC = () => {
  const news = useMemo(() => newsSeed, []);

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
        <img
          className="pays-hero__img"
          src="/images/pays/hero-france.jpg"
          alt="Pays - DREAMS"
        />
        <div className="pays-hero__content">
          <div className="pays-hero__card">
            <p className="pays-hero__breadcrumb">Accueil / Pays / France</p>
            <h1 className="pays-title">France</h1>
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
          <p className="pays-paragraph">
            DREAMS accompagne les personnes LGBTQQ+ en France grâce à un réseau d’antennes et
            de partenaires. Nous proposons un accueil bienveillant, une évaluation personnalisée
            des besoins et une orientation vers les services juridiques, administratifs, sociaux
            et de santé. Nos équipes locales développent aussi des actions de sensibilisation.
          </p>
        </div>
      </section>

      {/* CARROUSEL (image + titre + texte SANS lien) */}
      <section className="pays-news">
        <div className="pays-news__head">
          <div>
            <h3 className="pays-subtitle">Projets & actualités</h3>
            <div className="pays-divider pays-divider--warm" />
          </div>
          <div className="pays-arrows">
            <button
              className="pays-arrow"
              onClick={() => scrollByAmount("left")}
              aria-label="Précédent"
            >
              ‹
            </button>
            <button
              className="pays-arrow"
              onClick={() => scrollByAmount("right")}
              aria-label="Suivant"
            >
              ›
            </button>
          </div>
        </div>

        <div className="pays-viewport">
          <div className="pays-track">
            {news.map((item) => (
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

      {/* FEATURE (image + texte + lien) */}
      <section className="pays-feature">
        <div className="pays-feature__grid">
          <div className="pays-feature__media">
            <img
              src="/images/pays/feature.jpg"
              alt="Mise en avant"
              className="pays-feature__img"
            />
          </div>
          <div className="pays-feature__text">
            <h3 className="pays-subtitle">Antenne</h3>
            <div className="pays-divider pays-divider--rainbow2" />
            <p className="pays-paragraph">
              Retrouvez les coordonnées de nos partenaires, les permanences, ainsi que les
              ressources pour vos démarches (asile, régularisation, accès aux droits et à la santé).
            </p>
            <a href="#" className="pays-btn pays-btn--solid">Voir les ressources →</a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Pays;
