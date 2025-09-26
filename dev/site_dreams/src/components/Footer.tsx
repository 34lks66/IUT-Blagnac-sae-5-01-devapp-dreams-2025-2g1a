import React from "react";
import "../styles/footer.css";
import { Instagram, Facebook } from "lucide-react";


const FooterMain: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-main">
      <div className="footer-main__wrapper">
        {/* Ligne principale : Brand + Liens utiles + Contact */}
        <div className="footer-main__row">
          {/* Col 1 — Brand + description */}
          <div className="footer-brand">
            <div className="footer-brand__logo">
              {/* Remplace par ton image si tu veux un logo */}
              {/* <img src="/images/logo-dreams.png" alt="DREAMS" /> */}
              <span className="footer-brand__name">DREAMS</span>
            </div>
            <p className="footer-brand__desc">
              DREAMS est une association à but non lucratif basée à Toulouse et active en
              France, en Europe et en Afrique. Nous accompagnons les personnes LGBTQ+ dans
              l’accueil, l’orientation, l’hébergement solidaire, l’accompagnement
              administratif et la sensibilisation.
            </p>
          </div>

          {/* Col 2 — Liens utiles (gros titres seulement) */}
          <nav className="footer-links" aria-label="Liens utiles">
            <h3 className="footer-brand__name">Liens utiles</h3>
            <ul className="footer-links__list">
              <li><a href="/accueil" className="footer-link">Accueil</a></li>
              <li><a href="/public-migrant" className="footer-link">Accueil du public migrant LGBTQ+</a></li>
              <li><a href="/evaluation-orientation" className="footer-link">Évaluation & orientation</a></li>
              <li><a href="/hebergement" className="footer-link">Hébergement solidaire & temporaire</a></li>
              <li><a href="/accompagnement-admin-juridique" className="footer-link">Accompagnement administratif & juridique</a></li>
              <li><a href="/sensibilisation" className="footer-link">Sensibilisation des minorités sexuelles</a></li>
            </ul>
          </nav>

          {/* Col 3 — Contact + légaux + réseaux */}
          <div className="footer-contact">
            <h3 className="footer-brand__name">Contact</h3>

            <ul className="footer-contact__list">
              <li>
                <a className="footer-link" href="tel:+33758209226">+33 7 58 20 92 26</a>
              </li>
              <li>
                <a className="footer-link" href="mailto:assodreamsfr@gmail.com">assodreamsfr@gmail.com</a>
              </li>
              <li>
                <span className="footer-contact__address">
                  Siège social : 38 Rue d'Aubuisson, 31000 Toulouse, France
                </span>
              </li>
            </ul>

            <div className="footer-legal">
              <a href="/mentions-legales#mentions" className="footer-legal__link">Mentions légales</a>
              <span>·</span>
              <a href="/mentions-legales#vie-privee" className="footer-legal__link">Vie privée</a>
              <span>·</span>
              <a href="/mentions-legales#cookies" className="footer-legal__link">Cookies</a>
              <span>·</span>
              <a href="/mentions-legales#accessibilite" className="footer-legal__link">Accessibilité</a>
            </div>

            <div className="footer-socials">
              <a href="https://x.com/DREAMS_ASSO" aria-label="X / Twitter">
                <img src="/images/X.jpg" alt="X / Twitter" />
              </a>
              <a href="https://www.tiktok.com/@dreams_asso?_t=ZN-8tODtZI5CCd&_r=1" aria-label="TikTok">
                <img src="/images/tiktok.png" alt="TikTok" />
              </a>
              <a href="https://www.instagram.com/dreams_asso/" aria-label="Instagram">
                <Instagram size={28} strokeWidth={2} className="footer-social-icon" />
              </a>
              <a href="https://www.facebook.com/people/DREAMSAsso/61571981955508/" aria-label="Facebook">
                <Facebook size={28} strokeWidth={2} className="footer-social-icon" />
              </a>
            </div>
          </div>
        </div>

        {/* Bas du footer : petite ligne de séparation + © */}
        <div className="footer-main__separator" />
        <div className="footer-bottom">
          © {year} / DREAMS
        </div>
      </div>
    </footer>
  );
};

export default FooterMain;
