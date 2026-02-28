import { Heart, Home, Scale } from "lucide-react";

const Donations: React.FC = () => {
  return (
    <main className="bg-white text-gray-800 font-sans leading-relaxed">
      {/* ============ HERO SECTION ============ */}
      <section className="relative overflow-hidden">
        <img
          className="w-full h-[46vh] md:h-[58vh] object-cover object-center notranslate"
          translate="no"
          src="/images/donate.png"
          alt="Faire un don - DREAMS"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-[960px] mx-auto mb-4 bg-white/95 rounded-2xl p-4 md:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <p className="text-gray-500 text-xs">Accueil / Faire un don</p>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#d4af37] to-[#a87700] bg-clip-text text-transparent">
              Faire un don
            </h1>
            <p className="text-gray-700 mt-1">
              Soutiens l'accompagnement des personnes{" "}
              <span className="font-semibold text-yellow-500">LGBTQQ+</span> en
              France, en Europe et en Afrique.
            </p>
          </div>
        </div>
      </section>

      {/* ============ SECTION INTRO ============ */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
            Ton <span className="text-yellow-500">soutien</span> compte
          </h2>
          <p className="text-gray-700 max-w-4xl mx-auto">
            Chaque contribution permet de renforcer l'accueil, l'orientation,
            l'hébergement solidaire et l'accompagnement administratif et
            juridique des personnes LGBTQQ+ en situation de vulnérabilité.
            Merci pour ta générosité.
          </p>
        </div>
      </section>

      {/* ============ COMMENT TON DON EST UTILISE ============ */}
      <section className="px-6 md:px-20 py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
          Comment ton don est{" "}
          <span className="text-yellow-500">utilisé</span>
        </h2>
        <div className="mx-auto mb-16"></div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Carte 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <h4 className="text-sm font-semibold text-yellow-500 uppercase tracking-wide">
                Accueil
              </h4>
            </div>
            <div className="w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center mb-5 border border-yellow-200">
              <Heart className="text-yellow-500 w-7 h-7" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Accueil & Orientation
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Financer l'accueil inconditionnel des personnes LGBTQQ+ en
              situation de précarité, leur orientation vers les services adaptés
              et l'écoute bienveillante.
            </p>
          </div>

          {/* Carte 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <h4 className="text-sm font-semibold text-yellow-500 uppercase tracking-wide">
                Hébergement
              </h4>
            </div>
            <div className="w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center mb-5 border border-yellow-200">
              <Home className="text-yellow-500 w-7 h-7" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Hébergement solidaire
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Soutenir le programme d'hébergement temporaire qui offre un refuge
              sûr aux personnes victimes de violences liées au genre et à
              l'orientation sexuelle.
            </p>
          </div>

          {/* Carte 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <h4 className="text-sm font-semibold text-yellow-500 uppercase tracking-wide">
                Juridique
              </h4>
            </div>
            <div className="w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center mb-5 border border-yellow-200">
              <Scale className="text-yellow-500 w-7 h-7" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Accompagnement juridique
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Permettre l'accompagnement administratif et juridique : démarches
              d'asile, régularisation, accès aux droits et insertion sociale.
            </p>
          </div>
        </div>
      </section>

      {/* ============ CTA FAIRE UN DON ============ */}
      <section className="px-6 md:px-20 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border-t-4 border-yellow-500 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
              Faire un{" "}
              <span className="text-yellow-500">don</span>
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Tu vas être redirigé·e vers PayPal pour choisir ton montant
              (ponctuel, mensuel ou annuel) et finaliser le paiement en toute
              sécurité.
            </p>

            <a
              href="https://www.paypal.com/donate/?hosted_button_id=LBJP88FY3EAK8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-extrabold bg-black text-white hover:bg-gray-800 transition-all duration-300 text-lg shadow-lg hover:shadow-xl hover:scale-105"
            >
              Faire un don →
            </a>

            <p className="text-sm text-gray-500 mt-5">
              Paiement sécurisé via PayPal (carte bancaire acceptée).
            </p>
          </div>
        </div>
      </section>

      {/* ============ CTA CONTACT ============ */}
      <section className="text-center max-w-6xl mx-auto py-12 px-4">
        <button
          className="group relative item card rounded-xl text-center border-t-4 border-t-yellow-500 bg-white shadow-md px-5 py-3 mb-2 overflow-hidden transition-all duration-400 hover:shadow-lg"
          onClick={() => {
            window.location.href = "/contact";
          }}
        >
          <div className="absolute inset-0 bg-yellow-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] z-0"></div>
          <div className="relative z-10">
            <div className="title-content flex justify-center">
              <span className="font-bold title font-title text-gray-800 group-hover:text-white transition-colors duration-300">
                Une question sur les dons ?
              </span>
            </div>
            <div className="btn-content flex justify-center mb-3 mt-3">
              <span className="btn my-3 text-gray-600 group-hover:text-white transition-colors duration-300">
                Contactez-nous pour toute information sur les modalités de don ou
                pour toute autre question. Notre équipe est à votre écoute.
              </span>
            </div>
          </div>
        </button>
      </section>
    </main>
  );
};

export default Donations;
