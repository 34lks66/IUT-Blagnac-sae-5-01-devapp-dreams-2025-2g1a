import React from "react";
import { Instagram, Facebook } from "lucide-react";

const FooterMain: React.FC = () => {
  const year = new Date().getFullYear();

  const rainbow =
    "bg-[linear-gradient(90deg,#ef4444_0%,#f59e0b_25%,#facc15_40%,#22c55e_60%,#3b82f6_80%,#8b5cf6_100%)]";
  const goldText =
    "bg-gradient-to-r from-[#d4af37] to-[#a87700] bg-clip-text text-transparent";

  const LinkItem: React.FC<{ href: string; children: React.ReactNode }> = ({
    href,
    children,
  }) => (
    <li>
      <a
        href={href}
        className="group relative inline-block leading-7 text-gray-800 hover:text-[#0b1220] transition-colors"
      >
        {children}
        {/* soulignement arc-en-ciel animé */}
        <span
          className={`pointer-events-none absolute left-0 -bottom-[2px] h-[2px] w-full origin-left scale-x-0 opacity-25 transition-all duration-200 group-hover:opacity-100 group-hover:scale-x-100 ${rainbow}`}
        />
      </a>
    </li>
  );

  const LegalLink: React.FC<{ href: string; children: React.ReactNode }> = ({
    href,
    children,
  }) => (
    <a
      href={href}
      className={`text-sm font-semibold ${goldText} hover:underline hover:bg-[linear-gradient(90deg,#ef4444,#f59e0b,#facc15,#22c55e,#3b82f6,#8b5cf6)]`}
    >
      {children}
    </a>
  );

  return (
    <footer className="bg-white text-gray-800 text-[13px]">
      <div className="max-w-[1740px] mx-auto px-4 py-5">
        {/* ROW */}
        <div className="grid grid-cols-1 gap-6 items-start md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              {/* <img src="/images/logo-dreams.png" alt="DREAMS" className="w-11 h-11 object-contain" /> */}
              <span className={`text-[22px] font-extrabold tracking-wide ${goldText} notranslate`} translate="no">
                DREAMS
              </span>
            </div>
            <p className="mt-2 leading-relaxed text-gray-800">
              <span className="notranslate" translate="no">DREAMS</span> est une association à but non lucratif basée à Toulouse et active en
              France, en Europe et en Afrique. Nous accompagnons les personnes LGBTQ+ dans
              l’accueil, l’orientation, l’hébergement solidaire, l’accompagnement
              administratif et la sensibilisation.
            </p>
          </div>

          {/* Liens utiles */}
          <nav aria-label="Liens utiles" className="mx-auto text-center md:text-left">
            <h3 className={`mb-2 text-[15px] font-bold text-slate-900 ${goldText} text-center`}>
              Liens utiles
            </h3>
            <ul className="space-y-0 text-center">
              <LinkItem href="/">Accueil</LinkItem>
              <LinkItem href="/accueil_public">
                Accueil du public migrant LGBTQ+
              </LinkItem>
              <LinkItem href="/evaluation">Évaluation & orientation</LinkItem>
              <LinkItem href="/hebergement">Hébergement solidaire & temporaire</LinkItem>
              <LinkItem href="/accompagnement">
                Accompagnement administratif & juridique
              </LinkItem>
              <LinkItem href="/sensibilisation">
                Sensibilisation des minorités sexuelles
              </LinkItem>
            </ul>
          </nav>

          {/* Contact + légaux + réseaux */}
          <div className="md:justify-self-end">
            <h3 className={`mb-2 text-[15px] font-bold text-slate-900 ${goldText}`}>
              Contact
            </h3>

            <ul className="space-y-1 mb-2">
              <li>
                <a className="hover:underline" href="tel:+33758209226">
                  +33 7 58 20 92 26
                </a>
              </li>
              <li>
                <a className="hover:underline" href="mailto:assodreamsfr@gmail.com">
                  assodreamsfr@gmail.com
                </a>
              </li>
              <li>
                <p className="text-gray-700 mt-1">
                  Notre équipe <span className="notranslate" translate="no">DREAMS</span> est disponible pour vous écouter et vous orienter.
                </p>
              </li>
              <li>
                <span className="text-gray-500">
                  Siège social : 38 Rue d'Aubuisson, 31000 Toulouse, France
                </span>
              </li>
            </ul>

            <div className="flex flex-wrap items-center gap-2 my-2">
              <LegalLink href="/politiques-de-confidentialites#mentions-legales">Mentions légales</LegalLink>
              <span>·</span>
              <LegalLink href="/politiques-de-confidentialites#vie-privee">Vie privée</LegalLink>
              <span>·</span>
              <LegalLink href="/politiques-de-confidentialites#cookies">Cookies</LegalLink>
              <span>·</span>
              <LegalLink href="/politiques-de-confidentialites#droits">Accessibilité</LegalLink>
            </div>

            <div className="flex items-center gap-2">
              <a href="https://x.com/DREAMS_ASSO" aria-label="X / Twitter">
                <img src="/images/X.jpg" alt="X / Twitter" className="w-7 h-7 object-contain" />
              </a>
              <a
                href="https://www.tiktok.com/@dreams_asso?_t=ZN-8tODtZI5CCd&_r=1"
                aria-label="TikTok"
              >
                <img src="/images/tiktok.png" alt="TikTok" className="w-7 h-7 object-contain" />
              </a>
              <a
                href="https://www.instagram.com/dreams_asso/"
                aria-label="Instagram"
                className="text-gray-800 hover:text-gray-900"
              >
                <Instagram size={28} strokeWidth={2} />
              </a>
              <a
                href="https://www.facebook.com/people/DREAMSAsso/61571981955508/"
                aria-label="Facebook"
                className="text-gray-800 hover:text-gray-900"
              >
                <Facebook size={28} strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>

        {/* Separator + bottom */}
        <div className="border-b border-gray-200 my-4" />
        <div className="text-center text-gray-500 pb-3">© {year} / <span className="notranslate" translate="no">DREAMS</span></div>
      </div>
    </footer>
  );
};

export default FooterMain;