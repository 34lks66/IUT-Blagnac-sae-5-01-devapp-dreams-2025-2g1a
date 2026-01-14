import React, { useMemo } from "react";
import hero from "../assets/hero_section/evaluation_orientation.png";

type Partner = {
  id: string;
  name: string;
  img: string;
  excerpt: string;
  url: string;
};

const partnersSeed: Partner[] = [
  { id: "p1", name: "JEKO Toulouse", img: "/images/jeko.jpg", excerpt: "Association de soutien aux personnes LGBTQI+ migrantes à Toulouse.", url: "https://jekoweb.wordpress.com/" },
  { id: "p2", name: "ALDA", img: "/images/alda.jpg", excerpt: "Réseau de solidarité avec les lesbiennes réfugiées et demandeuses d’asile à Toulouse. Accueil, écoute et accompagnement administratif.", url: "https://coeur-de-ville.com/index.php/demarches/lgbtqia/747-alda-pour-lesbiennes-refugiees" },
  { id: "p3", name: "ENIPSE", img: "/images/enipse-logo.png", excerpt: "Association nationale de prévention et de santé communautaire.", url: "https://www.enipse.fr/" },
  { id: "p4", name: "Act Up", img: "/images/actup.jpg", excerpt: "Association de lutte contre le VIH/sida et les discriminations envers les personnes LGBTQIA+.", url: "https://www.addictopole-occitanie.com/annuaire/association-de-reduction-des-risques-act-up-sud-ouest" },
  { id: "p5", name: "RETSER", img: "/images/rester.png", excerpt: "Réseau toulousain en soutien aux personnes exilées et réfugiées.", url: "https://retser31.wordpress.com/" }
];

const EvaluationOrientation: React.FC = () => {
  const partners = useMemo(() => partnersSeed, []);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = document.querySelector<HTMLDivElement>(".eval-viewport");
    if (!el) return;
    const width = el.clientWidth;
    const delta = direction === "left" ? -width / 3 : width / 3;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <main className="bg-white text-gray-800 leading-relaxed">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img
          className="w-full h-[46vh] md:h-[58vh] object-cover"
          src={hero}
          alt="Évaluation et orientation"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-[960px] mx-auto mb-4 bg-white/95 rounded-2xl p-4 md:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <p className="text-gray-500 text-xs">Accueil / Évaluation & Orientation</p>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#d4af37] to-[#a87700] bg-clip-text text-transparent">
              Évaluation et orientation
            </h1>
            <p className="text-gray-700 mt-1">
              Un accompagnement personnalisé pour chaque personne.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 1 */}
      <section className="max-w-[1100px] mx-auto px-4 py-7">
        <div className="grid grid-cols-1 gap-5 items-center md:grid-cols-2 md:gap-8">
          <div>
            <img
              src="/images/partie1.png"
              alt="Entretien d’évaluation"
              className="w-full h-full max-h-[380px] object-cover rounded-2xl shadow-[0_10px_24px_rgba(0,0,0,0.06)]"
            />
          </div>
          <div>
            <h2 className="text-[22px] font-extrabold bg-gradient-to-r from-[#d4af37] to-[#a87700] bg-clip-text text-transparent">
              Démarche d’évaluation personnalisée
            </h2>
            <p className="text-gray-700">
              Notre équipe <span className="notranslate" translate="no">DREAMS</span> est disponible pour vous écouter et vous orienter.illance pour
              comprendre sa situation, ses besoins et ses objectifs. À partir de
              ce premier échange, nous définissons ensemble un parcours
              d’accompagnement adapté.
            </p>
            <ul className="mt-2 pl-5 list-disc space-y-1">
              <li>Accueil confidentiel et non-jugeant</li>
              <li>Analyse des besoins (juridiques, sociaux, santé, hébergement…)</li>
              <li>Plan d’action personnalisé et étapes claires</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="max-w-[1100px] mx-auto px-4 py-7">
        <div className="grid grid-cols-1 gap-5 items-center md:grid-cols-2 md:gap-8 md:[direction:rtl]">
          <div className="md:[direction:ltr]">
            <img
              src="/images/partie2.png"
              alt="Orientation vers services"
              className="w-full h-full max-h-[380px] object-cover rounded-2xl shadow-[0_10px_24px_rgba(0,0,0,0.06)]"
            />
          </div>
          <div className="md:[direction:ltr]">
            <h2 className="text-[22px] font-extrabold bg-gradient-to-r from-[#d4af37] to-[#a87700] bg-clip-text text-transparent">
              Orientation vers services juridiques, administratifs et sociaux
            </h2>
            <p className="text-gray-700">
              En fonction des besoins, nous vous orientons vers les dispositifs
              adaptés (asile, régularisation, accès aux droits, santé, soutien
              psychologique…). Nous travaillons en réseau avec des partenaires de
              confiance pour assurer une prise en charge complète.
            </p>

            <div className="grid grid-cols-1 gap-3 mt-3 sm:grid-cols-3">
              <article className="border border-gray-200 rounded-xl p-3 bg-white">
                <span className="inline-block border border-black/10 bg-white px-2.5 py-1 rounded-full text-xs font-bold">
                  Juridique
                </span>
                <p className="mt-2 text-sm text-gray-700">
                  Droit d’asile, titres de séjour, recours.
                </p>
              </article>
              <article className="border border-gray-200 rounded-xl p-3 bg-white">
                <span className="inline-block border border-black/10 bg-white px-2.5 py-1 rounded-full text-xs font-bold">
                  Administratif
                </span>
                <p className="mt-2 text-sm text-gray-700">
                  Démarches, documents, sécurisation des droits.
                </p>
              </article>
              <article className="border border-gray-200 rounded-xl p-3 bg-white">
                <span className="inline-block border border-black/10 bg-white px-2.5 py-1 rounded-full text-xs font-bold">
                  Social / Santé
                </span>
                <p className="mt-2 text-sm text-gray-700">
                  Accès aux soins, soutien psychologique, aide sociale.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* PARTENAIRES – carrousel */}
      <section className="max-w-[1100px] mx-auto px-4 pt-6 pb-2">
        <div className="flex items-end justify-between gap-3 mb-2">
          <div>
            <h2 className="text-[22px] font-extrabold bg-gradient-to-r from-[#d4af37] to-[#a87700] bg-clip-text text-transparent">
              Suivi en lien avec autres structures partenaires
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              className="border border-gray-300 bg-white px-2.5 py-1.5 rounded-full hover:bg-gray-50 active:translate-y-px"
              onClick={() => scrollByAmount("left")}
              aria-label="Précédent"
            >
              ‹
            </button>
            <button
              className="border border-gray-300 bg-white px-2.5 py-1.5 rounded-full hover:bg-gray-50 active:translate-y-px"
              onClick={() => scrollByAmount("right")}
              aria-label="Suivant"
            >
              ›
            </button>
          </div>
        </div>

        <div className="eval-viewport overflow-x-auto overflow-y-hidden snap-x snap-mandatory pb-1 -mx-1 px-1">
          <div className="flex gap-4 py-0.5">
            {partners.map((p) => (
              <article
                key={p.id}
                className="snap-start flex-[0_0_100%] sm:flex-[0_0_calc(50%-8px)] lg:flex-[0_0_calc(33.333%-10.6px)]"
              >
                <div className="relative h-[220px] overflow-hidden border border-gray-200 rounded-2xl rounded-b-none">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.04]"
                  />
                  <span className="absolute left-2.5 top-2.5 inline-block border border-black/10 bg-white/90 px-2.5 py-1 rounded-full text-xs font-bold">
                    Partenaire
                  </span>
                </div>
                <div className="border border-gray-200 border-t-0 rounded-2xl rounded-t-none bg-white p-3 shadow-[0_6px_18px_rgba(0,0,0,0.05)]">
                  <h3 className="text-sm font-bold">{p.name}</h3>
                  <p className="mt-1 text-sm text-gray-700 line-clamp-3">
                    {p.excerpt}
                  </p>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1 font-bold text-blue-700 hover:underline"
                  >
                    Découvrir la structure →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center max-w-3xl mx-auto py-7 px-4">
        <button
          className="group relative item card rounded-xl text-center border-t-4 border-t-yellow-500 bg-white shadow-md px-5 py-3 mb-2 mt-7 overflow-hidden transition-all duration-400 hover:shadow-lg w-full"
          onClick={() => {
            window.location.href = "/contact";
          }}
        >
          <div className="absolute inset-0 bg-yellow-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] z-0"></div>
          <div className="relative z-10">
            <div className="title-content flex justify-center">
              <span className="font-bold title font-title text-gray-800 group-hover:text-white transition-colors duration-300">
                Besoin d’aide ?
              </span>
            </div>
            <div className="btn-content flex justify-center mb-3 mt-3">
              <span className="btn my-3 text-gray-600 group-hover:text-white transition-colors duration-300">
                Contactez-nous pour un accompagnement personnalisé.
              </span>
            </div>
          </div>
        </button>
      </section>
    </main>
  );
};

export default EvaluationOrientation;