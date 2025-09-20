import React from "react";
import '../styles/footer.css';


const FooterMain: React.FC = () => {
  return (
    <footer className="footer-main w-full bg-gray-50 text-gray-800">
      <div className="footer-main__wrapper max-w-7xl mx-auto px-4 py-12">
        {/* Link blocks (based on sitemap) */}
        <div className="footer-main__links grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Accueil */}
          <div className="footer-main__bloc space-y-2">
            <h3 className="font-semibold text-gray-900">Accueil</h3>
            <a href="#" className="footer-main__link hover:underline">Présentation du projet</a>
            <br />
            <a href="#" className="footer-main__link hover:underline">Missions du projet</a>
            <br />
            <a href="#" className="footer-main__link hover:underline">Agenda global</a>
          </div>

          {/* Accueil du public migrant LGBTQQ+ */}
          <div className="footer-main__bloc space-y-2">
            <h3 className="font-semibold text-gray-900">Accueil du public migrant LGBTQQ+</h3>
            <a href="#" className="footer-main__link hover:underline">Permanences</a>
            <br />
            <a href="#" className="footer-main__link hover:underline">Premier accueil & écoute bienveillante</a>
            <br />
            <a href="#" className="footer-main__link hover:underline">Évaluation des besoins & orientation initiale</a>
          </div>

          {/* Évaluation & orientation */}
          <div className="footer-main__bloc space-y-2">
            <h3 className="font-semibold text-gray-900">Évaluation & orientation</h3>
            <a href="#" className="footer-main__link hover:underline">Démarche d’évaluation personnalisée</a>
            <br />
            <a href="#" className="footer-main__link hover:underline">Orientation vers services juridiques, administratifs & sociaux</a>
            <br />
            <a href="#" className="footer-main__link hover:underline">Suivi avec structures partenaires</a>
          </div>

          {/* Hébergement */}
          <div className="footer-main__bloc space-y-2">
            <h3 className="font-semibold text-gray-900">Hébergement solidaire & temporaire</h3>
            <a href="#" className="footer-main__link hover:underline">Système d’hébergement rotatif (1 semaine à 6 mois)</a>
            <br />
            <a href="#" className="footer-main__link hover:underline">Soutien aux victimes de VBG</a>
            <br />
            <a href="#" className="footer-main__link hover:underline">Mise à l’abri & suivi des bénéficiaires</a>
          </div>

          {/* Accompagnement administratif & juridique */}
          <div className="footer-main__bloc space-y-2">
            <h3 className="font-semibold text-gray-900">Accompagnement administratif & juridique</h3>
            <a href="#" className="footer-main__link hover:underline">Aide aux démarches d’asile & régularisation</a>
            <br />
            <a href="#" className="footer-main__link hover:underline">Documents personnels & sécurisation des droits</a>
            <br />
            <span className="text-sm text-gray-600">Plus de 100 demandeurs d’asile accompagnés</span>
          </div>

          {/* Sensibilisation */}
          <div className="footer-main__bloc space-y-2">
            <h3 className="font-semibold text-gray-900">Sensibilisation des minorités sexuelles</h3>
            <a href="#" className="footer-main__link hover:underline">Ateliers, conférences, événements</a>
            <br />
            <a href="#" className="footer-main__link hover:underline">Lutte contre homophobie, transphobie, racisme</a>
            <br />
            <a href="#" className="footer-main__link hover:underline">Interventions face aux crises (ex. Côte d’Ivoire)</a>
          </div>
        </div>

        {/* Socials */}
        <div className="footer-main__socials flex flex-wrap items-center gap-4 py-8">
          <a href="https://x.com/DREAMS_ASSO" className="footer-main__social-link" aria-label="Twitter/X">
            <img src="/images/X.jpg" alt="Twitter/X" width={36} height={36} loading="lazy" className="footer-main__social-icon" />
          </a>
          <a href="https://www.tiktok.com/@dreams_asso?_t=ZN-8tODtZI5CCd&_r=1" className="footer-main__social-link" aria-label="TikTok">
            <img src="/images/tiktok.png" alt="TikTok" width={40} height={40} loading="lazy" className="footer-main__social-icon" />
          </a>
          <a href="https://www.instagram.com/dreams_asso/" className="footer-main__social-link" aria-label="Instagram">
            <img src="/images/instagram.svg" alt="Instagram" width={40} height={40} loading="lazy" className="footer-main__social-icon" />
          </a>
          <a href="https://www.facebook.com/people/DREAMSAsso/61571981955508/" className="footer-main__social-link" aria-label="Facebook">
            <img src="/images/facebook.png" alt="Facebook" width={40} height={40} loading="lazy" className="footer-main__social-icon" />
          </a>
        </div>

        <div className="footer-main__separator h-px w-full bg-gray-200" />

        {/* Legal & contact */}
        <div className="footer-main__text text-sm text-gray-600 leading-6 py-6">
          DREAMS est une association à but non lucratif basée à Toulouse et active en France, en Europe et en Afrique. Nous accompagnons les personnes LGBTQQ+ dans l’accueil, l’orientation, l’hébergement solidaire, l’accompagnement administratif et la sensibilisation.
          <br />
          <a href="mailto:assodreamsfr@gmail.com" className="hover:underline">assodreamsfr@gmail.com</a> — <a href="tel:+33758209226" className="hover:underline">+33 7 58 20 92 26</a>
          <br />
          <span className="block">Siège social : 38 Rue d'Aubuisson, 31000 Toulouse, France</span>
          <br />
          <a href="#" className="text-blue-600 hover:underline">Mentions légales</a> · <a href="#" className="text-blue-600 hover:underline">Vie privée</a> · <a href="#" className="text-blue-600 hover:underline">Cookies</a> · <a href="#" className="text-blue-600 hover:underline">Accessibilité</a>
          <br />
          © 2012‑2025 / DREAMS
        </div>
      </div>
    </footer>
  );
};

export default FooterMain;
