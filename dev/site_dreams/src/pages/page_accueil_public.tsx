function PageAccueilPublic() {
  return (
    <main className="max-w-5xl mx-auto px-4">
      {/* Section Hero "Bienvenue en Europe" */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Bienvenue en <span className="text-blue-600">Europe</span>
        </h1>
        <p className="mb-6 text-gray-700 max-w-3xl mx-auto">
          Un espace sécurisé où chaque identité est respectée, protégée et
          célébrée. Vous êtes en sécurité ici et nous sommes là pour vous
          accompagner.
        </p>

        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
          <div className="lg:w-1/2">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl h-[28rem] w-full overflow-hidden">
              <img
                src="public/images/pride-boy.jpg"
                alt="Communauté LGBTQIA+ unie et solidaire"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:w-1/2 text-center lg:text-left">
            <blockquote className="text-xl italic text-gray-700 leading-relaxed">
              « L'amour commence par l'acceptation de soi, et s'épanouit dans
              l'acceptation des autres. »
              <footer className="mt-4 text-lg font-semibold text-blue-600">
                —{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Harvey_Milk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-800 hover:underline transition-colors duration-200"
                >
                  Harvey Milk
                </a>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Section "Processus d'accueil à l'arrivée" */}
      <section className="mb-1">
        <div className="grid md:grid-cols-1 gap-8">
          {/* Carte 1 */}
          <div className="group relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-l-4 border-b-4 border-blue-500 overflow-hidden flex flex-col md:flex-row items-center mr-32 cursor-pointer">
            <div className="absolute inset-0 bg-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] z-0"></div>

            {/* Contenu texte */}
            <div className="relative z-10 flex-1 transition-all duration-300 group-hover:text-white">
              <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-white transition-colors duration-300">
                Où aller ?
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed text-sm group-hover:text-white transition-colors duration-300">
                Centres d'accueil spécialisés et associations partenaires près
                de chez vous. Nous vous guidons vers les structures adaptées à
                votre situation.
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-center flex-1">
              <div className="text-6xl transition-all duration-500 group-hover:translate-x-20 group-hover:opacity-0 group-hover:scale-75">
                📍
              </div>
            </div>
          </div>

          {/* Carte 2 */}
          <div className="group relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-r-4 border-b-4 border-purple-500 overflow-hidden flex flex-col md:flex-row items-center ml-32 cursor-pointer">
            <div className="absolute inset-0 bg-purple-500 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] z-0"></div>

            <div className="relative z-10 flex items-center justify-center flex-1">
              <div className="text-6xl transition-all duration-500 group-hover:-translate-x-20 group-hover:opacity-0 group-hover:scale-75">
                📋
              </div>
            </div>

            {/* Contenu texte */}
            <div className="relative z-10 flex-1 transition-all duration-300 group-hover:text-white">
              <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-white transition-colors duration-300">
                Documents nécessaires
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed text-sm group-hover:text-white transition-colors duration-300">
                Pièce d'identité, justificatifs de situation. Nous vous aidons
                si vous n'en avez pas et vous accompagnons dans les démarches
                administratives.
              </p>
            </div>
          </div>

          {/* Carte 3 */}
          <div className="group relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-l-4 border-b-4 border-green-500 overflow-hidden flex flex-col md:flex-row items-center mr-32 cursor-pointer">
            <div className="absolute inset-0 bg-green-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] z-0"></div>

            {/* Contenu texte */}
            <div className="relative z-10 flex-1 transition-all duration-300 group-hover:text-white">
              <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-white transition-colors duration-300">
                Droits garantis
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed text-sm group-hover:text-white transition-colors duration-300">
                Accueil inconditionnel, respect de votre identité,
                confidentialité absolue. Vos droits fondamentaux sont protégés
                par la loi européenne.
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-center flex-1">
              <div className="text-6xl transition-all duration-500 group-hover:translate-x-20 group-hover:opacity-0 group-hover:scale-75">
                🛡️
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section "Vos droits en Europe" */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Vos droits en Europe
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Des protections légales qui garantissent votre sécurité et votre
            dignité
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Droit à l'asile */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-500 hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    <path d="M12 22V2" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Droit à l'asile
              </h3>
              <p className="text-gray-600">
                Protection internationale pour les personnes persécutées en
                raison de leur orientation sexuelle ou identité de genre
              </p>
            </div>

            {/* Accès aux soins */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-green-500 hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M12 7v4" />
                    <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
                    <path d="M14 9h-4" />
                    <path d="M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
                    <path d="M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Accès aux soins
              </h3>
              <p className="text-gray-600">
                Soins médicaux et soutien psychologique adaptés, dans le respect
                de votre identité
              </p>
            </div>

            {/* Logement temporaire */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-purple-500 hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Logement temporaire
              </h3>
              <p className="text-gray-600">
                Hébergement sécurisé et adapté pendant la procédure de demande
                d'asile
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section "Témoignages et soutien" */}
      <section className="mb-1">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Vous n'êtes pas seul·e
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Des parcours similaires au vôtre, des vies reconstruites
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-8">
          {/* Témoignage 1 */}
          <div className="group relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-l-4 border-b-4 border-indigo-500 overflow-hidden flex flex-col md:flex-row items-center mr-32 cursor-pointer">
            <div className="absolute inset-0 bg-indigo-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] z-0"></div>

            {/* Contenu texte */}
            <div className="relative z-10 flex-1 transition-all duration-300 group-hover:text-white">
              <p className="text-gray-600 mb-4 leading-relaxed text-base group-hover:text-white transition-colors duration-300 italic">
                "Après avoir fui mon pays, j'ai trouvé ici bien plus qu'un toit
                : une famille qui m'a accepté tel que je suis. L'accompagnement
                m'a permis de retrouver confiance en moi et en l'avenir."
              </p>
              <p className="text-gray-500 text-sm group-hover:text-blue-100 transition-colors duration-300">
                — Témoignage anonyme
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-center flex-1">
              <div className="text-6xl transition-all duration-500 group-hover:translate-x-20 group-hover:opacity-0 group-hover:scale-75">
                💬
              </div>
            </div>
          </div>

          {/* Témoignage 2 */}
          <div className="group relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-r-4 border-b-4 border-pink-500 overflow-hidden flex flex-col md:flex-row items-center ml-32 cursor-pointer">
            <div className="absolute inset-0 bg-pink-500 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] z-0"></div>

            <div className="relative z-10 flex items-center justify-center flex-1">
              <div className="text-6xl transition-all duration-500 group-hover:-translate-x-20 group-hover:opacity-0 group-hover:scale-75">
                🌈
              </div>
            </div>

            {/* Contenu texte */}
            <div className="relative z-10 flex-1 transition-all duration-300 group-hover:text-white">
              <p className="text-gray-600 mb-4 leading-relaxed text-base group-hover:text-white transition-colors duration-300 italic">
                "Le soutien psychologique m'a sauvé la vie. Aujourd'hui, je
                revis enfin en harmonie avec mon identité. Pour la première
                fois, je peux être moi-même sans peur du regard des autres."
              </p>
              <p className="text-gray-500 text-sm group-hover:text-blue-100 transition-colors duration-300">
                — Témoignage anonyme
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section className="text-center">
        <button
          className="group relative item card rounded-xl text-center border-t-4 border-t-blue-500 bg-white shadow-md px-3 md:px-5 xl:px-40 2xl:px-48 py-3 mb-2 overflow-hidden transition-all duration-400 hover:shadow-lg w-full"
          onClick={() => {
            window.location.href = "/contact";
          }}
        >
          <div className="absolute inset-0 bg-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] z-0"></div>
          <div className="relative z-10">
            <div className="title-content flex justify-start md:justify-center">
              <span className="font-bold title font-title text-gray-800 group-hover:text-white transition-colors duration-300">
                Besoin d'aide immédiate ?
              </span>
            </div>
            <div className="btn-content flex justify-center md:justify-center mb-3 mt-3">
              <span className="btn my-3 text-gray-600 group-hover:text-white transition-colors duration-300">
                Contactez-nous en toute confidentialité. Notre équipe est là
                pour vous écouter et vous orienter vers les solutions adaptées à
                votre situation.
              </span>
            </div>
          </div>
        </button>
      </section>
    </main>
  );
}

export default PageAccueilPublic;
