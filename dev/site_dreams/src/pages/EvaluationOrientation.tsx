import React, { useMemo, useState } from "react";
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
    name: "Structure A",
    img: "/images/partner-1.jpg",
    excerpt:
      "Accompagnement social et administratif pour les personnes migrantes LGBTQIA+.",
    url: "#",
  },
  {
    id: "p2",
    name: "Structure B",
    img: "/images/partner-2.jpg",
    excerpt:
      "Soutien juridique et orientation dans les démarches d’asile et de régularisation.",
    url: "#",
  },
  {
    id: "p3",
    name: "Structure C",
    img: "/images/partner-3.jpg",
    excerpt:
      "Accès à la santé, prévention et écoute, réseau de psychologues partenaires.",
    url: "#",
  },
  {
    id: "p4",
    name: "Structure D",
    img: "/images/partner-4.jpg",
    excerpt:
      "Mise à l’abri temporaire et hébergement solidaire en lien avec les associations locales.",
    url: "#",
  },
];

const EvaluationOrientation: React.FC = () => {
  const partners = useMemo(() => partnersSeed, []);
  const [index, setIndex] = useState(0);
  const visible = 3;
  const maxIndex = Math.max(0, partners.length - visible);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

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
            <p className="eval-hero__breadcrumb">
              Accueil / Évaluation & Orientation
            </p>
            <h1 className="eval-title">Évaluation et orientation</h1>
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
            <h2 className="eval-subtitle">Démarche d’évaluation personnalisée</h2>
            <div className="eval-divider eval-divider--rainbow" />
            <p className="eval-paragraph">
              Nous recevons chaque personne avec écoute et bienveillance pour
              comprendre sa situation, ses besoins et ses objectifs. À partir de
              ce premier échange, nous définissons ensemble un parcours d’accompagnement
              adapté.
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
            <h2 className="eval-subtitle">
              Orientation vers services juridiques, administratifs et sociaux
            </h2>
            <div className="eval-divider eval-divider--rainbow2" />
            <p className="eval-paragraph">
              En fonction des besoins, nous vous orientons vers les dispositifs adaptés
              (asile, régularisation, accès aux droits, santé, soutien psychologique…).
              Nous travaillons en réseau avec des partenaires de confiance pour assurer
              une prise en charge complète.
            </p>

            <div className="eval-cards">
              <article className="eval-card">
                <span className="eval-badge">⚖️ Juridique</span>
                <p className="eval-card__text">Droit d’asile, titres de séjour, recours.</p>
              </article>
              <article className="eval-card">
                <span className="eval-badge">🏛️ Administratif</span>
                <p className="eval-card__text">Démarches, documents, sécurisation des droits.</p>
              </article>
              <article className="eval-card">
                <span className="eval-badge">🤝 Social / Santé</span>
                <p className="eval-card__text">Accès aux soins, soutien psychologique, aide sociale.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* 4) PARTENAIRES – CARROUSEL */}
      <section className="eval-partners">
        <div className="eval-partners__head">
          <div>
            <h2 className="eval-subtitle">
              Suivi en lien avec autres structures partenaires
            </h2>
            <div className="eval-divider eval-divider--warm" />
          </div>
          <div className="eval-arrows">
            <button className="eval-arrow" onClick={prev} aria-label="Précédent">‹</button>
            <button className="eval-arrow" onClick={next} aria-label="Suivant">›</button>
          </div>
        </div>

        <div className="eval-carousel">
          <div
            className="eval-track"
            style={{
              transform: `translateX(-${(index * 100) / 3}%)`,
              width: `${(partners.length * 100) / 3}%`,
            }}
          >
            {partners.map((p) => (
              <article key={p.id} className="eval-cardPartner">
                <div className="eval-cardPartner__imgWrap">
                  <img src={p.img} alt={p.name} className="eval-cardPartner__img" />
                  <span className="eval-badge eval-badge--light">Partenaire</span>
                </div>
                <div className="eval-cardPartner__body">
                  <h3 className="eval-cardPartner__title">{p.name}</h3>
                  <p className="eval-cardPartner__excerpt">{p.excerpt}</p>
                  <a href={p.url} className="eval-link">
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
            <a href="mailto:assodreamsfr@gmail.com" className="eval-btn eval-btn--ghost">Nous écrire</a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EvaluationOrientation;
