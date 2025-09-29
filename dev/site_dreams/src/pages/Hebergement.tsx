const Hebergement = () => {
  return (
    <main className="w-full min-h-screen  from-purple-50 to-pink-50">

      {/* Section Introduction / Accroche */}
      <section className="px-6 md:px-20 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Hébergement solidaire et temporaire
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Face aux défis que rencontrent les personnes en situation d'exil ou de vulnérabilité,
            il est essentiel d'offrir des solutions d'hébergement temporaire. DREAMS s'engage à
            fournir un cadre sûr, stable et bienveillant pour accompagner ces personnes vers
            l'autonomie et la reconstruction de leur vie.
          </p>
        </div>
      </section>

      {/* Section Objectifs */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Nos objectifs
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Solution rapide et sécurisée
              </h3>
              <p className="text-gray-600">
                Proposer une solution d'hébergement rapide et sécurisée pour répondre
                aux urgences et situations critiques.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Soutien aux victimes de VBG
              </h3>
              <p className="text-gray-600">
                Soutenir spécifiquement les bénéficiaires victimes de violences
                basées sur le genre avec un accompagnement adapté.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Autonomie progressive
              </h3>
              <p className="text-gray-600">
                Offrir un suivi continu qui favorise l'autonomie progressive
                et l'insertion sociale des bénéficiaires.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Que proposons-nous ? */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Que proposons-nous ?
        </h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {/* Système d'hébergement rotatif */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-red-500 hover:shadow-xl transition-shadow">
            <div className="mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 15v-4l8 4-8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Système d'hébergement rotatif
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Durée flexible de <strong className="text-red-600">1 semaine à 6 mois</strong>,
              selon les besoins spécifiques de chaque bénéficiaire. Cette approche permet
              une adaptation personnalisée aux situations individuelles.
            </p>
          </div>

          {/* Soutien aux victimes de VBG */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Soutien aux victimes de VBG
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Mise à disposition d'un <strong className="text-green-600">cadre protecteur </strong>
              pour les victimes de violences basées sur le genre, avec un accompagnement
              psychologique et social spécialisé.
            </p>
          </div>

          {/* Mise à l'abri et suivi */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Mise à l'abri et suivi
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Accueil dans un environnement sûr avec un
              <strong className="text-blue-600"> accompagnement personnalisé</strong> :
              orientation, suivi de parcours et soutien continu vers l'autonomie.
            </p>
          </div>
        </div>
      </section>

      {/* Section Témoignages / Illustrations */}
      <section className="mb-16  rounded-3xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Témoignages
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                A
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-800">Ancienne bénéficiaire</h3>
                <p className="text-gray-600 text-sm">Hébergée pendant 3 mois</p>
              </div>
            </div>
            <blockquote className="text-lg text-gray-700 italic leading-relaxed">
              "Grâce au programme d'hébergement temporaire, j'ai pu retrouver ma dignité et
              ma confiance. L'accompagnement bienveillant m'a permis de me reconstruire
              petit à petit. Aujourd'hui, j'ai mon propre logement et je peux enfin envisager
              l'avenir avec sérénité. Cette aide a été un véritable tremplin vers mon autonomie."
            </blockquote>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-4 text-gray-600">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span className="text-sm font-medium">Solidarité</span>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm font-medium">Bienveillance</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-sm font-medium">Espoir</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section Redirection vers formulaire d'aide */}
      <section className="px-6 md:px-20 py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Vous avez besoin d'un hébergement temporaire ?
          </h2>
          <p className="text-lg text-purple-100 mb-8 leading-relaxed">
            DREAMS est là pour vous accompagner. Notre équipe vous propose un cadre
            sécurisé et un suivi personnalisé pour vous aider à retrouver votre autonomie.
          </p>

          <button className="bg-white text-purple-600 font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Demander un hébergement temporaire
          </button>

          <p className="text-purple-200 mt-6 text-sm">
            Notre équipe vous recontactera dans les plus brefs délais
          </p>
        </div>
      </section>
    </main>
  );
};

export default Hebergement;