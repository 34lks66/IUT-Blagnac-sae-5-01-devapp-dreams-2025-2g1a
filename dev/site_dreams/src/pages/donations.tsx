import React from "react";

const Donations: React.FC = () => {
  const goldTitle = "bg-gradient-to-r from-[#d4af37] to-[#a87700] bg-clip-text text-transparent";
  const rainbow = "bg-[linear-gradient(90deg,#ef4444_0%,#f59e0b_25%,#facc15_40%,#22c55e_60%,#3b82f6_80%,#8b5cf6_100%)]";

  return (
    <main className="bg-white text-gray-800 leading-relaxed">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img
          className="w-full h-[42vh] md:h-[54vh] object-cover object-center notranslate"
          translate="no"
          src="/images/donate.png"
          alt="Faire un don - DREAMS"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-[960px] mx-auto mb-4 bg-white/95 rounded-2xl p-4 md:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <p className="text-gray-500 text-xs">Accueil / Faire un don</p>
            <h1 className={`text-3xl md:text-4xl font-extrabold ${goldTitle}`}>Faire un don</h1>
            <p className="text-gray-700">
              Soutiens l’accompagnement des personnes LGBTQQ+ en France, en Europe et en Afrique.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-[1100px] mx-auto px-4 pt-7 pb-2">
        <div>
          <h2 className={`text-[20px] font-extrabold ${goldTitle}`}>Ton soutien compte</h2>
          <div className={`h-1 w-18 rounded-full my-2 ${rainbow}`} />
          <p className="text-gray-700">
            Chaque contribution permet de renforcer l’accueil, l’orientation, l’hébergement solidaire et
            l’accompagnement administratif et juridique. Merci pour ta générosité.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1100px] mx-auto px-4 pb-10">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-[0_6px_18px_rgba(0,0,0,0.04)]">
          <h3 className={`text-[20px] font-extrabold ${goldTitle}`}>Faire un don</h3>
          <div className={`h-1 w-18 rounded-full my-3 ${rainbow}`} />

          <p className="text-gray-700 mb-4">
            Tu vas être redirigé·e vers PayPal pour choisir ton montant (ponctuel, mensuel ou annuel) et finaliser le
            paiement en toute sécurité.
          </p>

          <a
            href="https://www.paypal.com/donate/?hosted_button_id=LBJP88FY3EAK8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-extrabold bg-black text-white hover:bg-gray-800 transition"
          >
            Faire un don →
          </a>

          <p className="text-xs text-gray-500 mt-3">
            Paiement sécurisé via PayPal (carte bancaire acceptée).
          </p>
        </div>
      </section>
    </main>
  );
};

export default Donations;
