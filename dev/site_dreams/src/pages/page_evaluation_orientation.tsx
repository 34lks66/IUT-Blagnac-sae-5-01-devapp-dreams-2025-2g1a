import React, { useMemo } from "react";
import "../styles/evaluation.css";
import hero from "../assets/hero_section/evaluation_orientation.png";

type Partner = {
  id: string;
  name: string;
  img: string;
  excerpt: string;
  url: string;
};

const partnersSeed: Partner[] = [
  {
    id: "p1",
    name: "JEKO Toulouse",
    img: "/images/jeko.jpg",
    excerpt: "Association de soutien aux personnes LGBTQI+ migrantes à Toulouse.",
    url: "https://jekoweb.wordpress.com/"
  },
  {
    id: "p2",
    name: "ALDA",
    img: "/images/alda.jpg",
    excerpt:
      "Réseau de solidarité avec les lesbiennes réfugiées et demandeuses d’asile à Toulouse. Accueil, écoute et accompagnement administratif.",
    url: "https://coeur-de-ville.com/index.php/demarches/lgbtqia/747-alda-pour-lesbiennes-refugiees"
  },
  {
    id: "p3",
    name: "ENIPSE",
    img: "/images/enipse-logo.png",
    excerpt: "Association nationale de prévention et de santé communautaire.",
    url: "https://www.enipse.fr/"
  },
  {
    id: "p4",
    name: "Act Up",
    img: "/images/actup.jpg",
    excerpt:
      "Association de lutte contre le VIH/sida et les discriminations envers les personnes LGBTQIA+.",
    url: "https://www.addictopole-occitanie.com/annuaire/association-de-reduction-des-risques-act-up-sud-ouest"
  },
  {
    id: "p5",
    name: "RETSER",
    img: "/images/rester.png",
    excerpt: "Réseau toulousain en soutien aux personnes exilées et réfugiées.",
    url: "https://retser31.wordpress.com/"
  }
];

const EvaluationOrientation: React.FC = () => {
  const partners = useMemo(() => partnersSeed, []);

  // Scroll control for arrows
  const scrollByAmount = (direction: "left" | "right") => {
    const el = document.querySelector<HTMLDivElement>(".eval-viewport");
    if (!el) return;
    const width = el.clientWidth;
    const scroll = direction === "left" ? -width / 3 : width / 3;
    el.scrollBy({ left: scroll, behavior: "smooth" });
  };

  return (
    <main className="eval">
      {/* 1) HERO */}
      <section className="eval-hero">
        <img
          className="eval-hero__img"
          src={hero}
          alt="Évaluation et orientation"
        />
        <div className="eval-hero__content">
          <div className="eval-hero__card">
            <p className="eval-hero__breadcrumb">Accueil / Évaluation & Orientation</p>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">Évaluation et orientation</h1>
            <p className="eval-hero__subtitle">
              Un accompagnement personnalisé pour chaque personne.
            </p>
          </div>
        </div>
      </section>

      {/* 2) DÉMARCHE D’ÉVALUATION PERSONNALISÉE */}
      <section className="eval-section">
        <div className="eval-section__grid">
          <div className="eval-section__media">
            <img
              src="/images/partie1.png"
              alt="Entretien d’évaluation"
              className="eval-media"
            />
          </div>
          <div className="eval-section__text">
            <h2 className="text-2xl md:text-2xl font-bold  mb-4">Démarche d’évaluation <span className="text-yellow-500">personnalisée</span></h2>
            <p className="eval-paragraph">
              Nous recevons chaque personne avec écoute et bienveillance pour
              comprendre sa situation, ses besoins et ses objectifs. À partir de
              ce premier échange, nous définissons ensemble un parcours
              d’accompagnement adapté.
            </p>
            <ul className="eval-list">
              <li>Accueil confidentiel et non-jugeant</li>
              <li>Analyse des besoins (juridiques, sociaux, santé, hébergement…)</li>
              <li>Plan d’action personnalisé et étapes claires</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3) ORIENTATION */}
      <section className="eval-section">
        <div className="eval-section__grid eval-section__grid--reverse">
          <div className="eval-section__media">
            <img
              src="/images/partie2.png"
              alt="Orientation vers services"
              className="eval-media"
            />
          </div>
          <div className="eval-section__text">
            <h2 className="text-2xl md:text-2xl font-bold  mb-4">
              Orientation vers services juridiques,<span className="text-yellow-500"> administratifs et sociaux</span>  
            </h2>
            <p className="eval-paragraph">
              En fonction des besoins, nous vous orientons vers les dispositifs
              adaptés (asile, régularisation, accès aux droits, santé, soutien
              psychologique…). Nous travaillons en réseau avec des partenaires de
              confiance pour assurer une prise en charge complète.
            </p>

            <div className="eval-cards">
              <article className="eval-card">
                <span className="eval-badge">Juridique</span>
                <p className="eval-card__text">
                  Droit d’asile, titres de séjour, recours.
                </p>
              </article>
              <article className="eval-card">
                <span className="eval-badge">Administratif</span>
                <p className="eval-card__text">
                  Démarches, documents, sécurisation des droits.
                </p>
              </article>
              <article className="eval-card">
                <span className="eval-badge">Social / Santé</span>
                <p className="eval-card__text">
                  Accès aux soins, soutien psychologique, aide sociale.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* 4) PARTENAIRES – CARROUSEL scroll-snap */}
      <section className="eval-partners">
        <div className="eval-partners__head">
          <div>
            <h2 className="text-2xl md:text-2xl font-bold  mb-4 text-yellow-500">
              Suivi en lien avec autres structures partenaires
            </h2>
          </div>

          <div className="eval-arrows">
            <button
              className="eval-arrow"
              onClick={() => scrollByAmount("left")}
              aria-label="Précédent"
            >
              ‹
            </button>
            <button
              className="eval-arrow"
              onClick={() => scrollByAmount("right")}
              aria-label="Suivant"
            >
              ›
            </button>
          </div>
        </div>

        <div className="eval-viewport">
          <div className="eval-track">
            {partners.map((p) => (
              <article key={p.id} className="eval-cardPartner">
                <div className="eval-cardPartner__imgWrap">
                  <img src={p.img} alt={p.name} className="eval-cardPartner__img" />
                  <span className="eval-badge eval-badge--light">Partenaire</span>
                </div>
                <div className="eval-cardPartner__body">
                  <h3 className="eval-cardPartner__title">{p.name}</h3>
                  <p className="eval-cardPartner__excerpt">{p.excerpt}</p>
                  <a href={p.url} className="eval-link" target="_blank" rel="noreferrer">
                    Découvrir la structure →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5) CTA FINAL */}
      <section className="eval-cta">
        <div className="eval-cta__box">
          <h3 className="eval-cta__title">Besoin d’un accompagnement ?</h3>
          <p className="eval-cta__text">
            Notre équipe DREAMS est disponible pour vous écouter et vous orienter.
          </p>
          <div className="eval-cta__actions">
            <a
              href="mailto:assodreamsfr@gmail.com"
              className="eval-btn eval-btn--ghost"
            >
              Nous écrire
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EvaluationOrientation;
