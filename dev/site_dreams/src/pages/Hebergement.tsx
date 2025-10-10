const Hebergement = () => {
  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

          {/* Section Introduction / Accroche - Hero inspiré du style DREAMS */}
      <section className="relative bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 py-16 lg:py-24 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-200 rounded-full -translate-y-1/2 translate-x-1/2 opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-pink-200 rounded-full translate-y-1/2 -translate-x-1/2 opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Hébergement 
                <span className="text-purple-600"> solidaire</span> et
                <span className="text-pink-600"> temporaire</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-700 mb-4 leading-relaxed">
                Parce qu'être <span className="font-semibold text-purple-700">LGBTQIA+</span> et en demande d'asile, 
                c'est souvent <span className="font-semibold">fuir la haine pour en retrouver ici</span>.
              </p>
              
              <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                Dans un système d'hébergement solidaire et temporaire, nous offrons un 
                <span className="font-semibold text-pink-600"> refuge sûr et bienveillant</span> à 
                celles et ceux qui ont subi des violences liées au genre et à l'orientation sexuelle.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mt-8">
                <button className="bg-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-200 flex items-center justify-center gap-2 text-sm md:text-base">
                  Demander un hébergement
                </button>
                <button className="border-2 border-purple-300 text-gray-700 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:border-purple-400 hover:bg-white transition-all duration-200 text-sm md:text-base">
                  En savoir plus
                </button>
              </div>
            </div>

            {/* Image/Visual Section */}
            <div className="relative mt-6 lg:mt-0">
              <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl p-1 transform rotate-2">
                <div className="bg-white rounded-xl p-4 md:p-6 transform -rotate-2 shadow-xl">
                  <div className="aspect-video bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                      src="/images/hebergement-intro.jpg" 
                      alt="Hébergement solidaire" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-center text-gray-700 font-semibold mt-4 text-sm md:text-base">
                    Un refuge <span className="text-purple-600">sûr</span> et{' '}
                    <span className="text-pink-600">bienveillant</span> pour se reconstruire
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Message d'espoir */}
      <section className="px-6 md:px-20 py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 h-1 w-32 mx-auto mb-8 rounded-full"></div>
          <p className="text-2xl md:text-3xl text-gray-800 leading-relaxed font-medium mb-6">
            L'hébergement solidaire et temporaire permet à chaque personne de se reconstruire,
            retrouver sa dignité et reprendre espoir.
          </p>
          <p className="text-xl md:text-2xl text-gray-700 font-semibold">
            Face à l'exclusion et à la peur, nous répondons par la{' '}
            <span className="text-purple-600">solidarité</span>, l'
            <span className="text-blue-600">inclusion</span> et la{' '}
            <span className="text-pink-600">fierté</span>.
          </p>
        </div>
      </section>

      {/* Section Objectifs - Timeline style */}
      <section className="px-6 md:px-20 py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
          Nos <span className="text-purple-600">Objectifs</span>
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-12 rounded-full"></div>

        <div className="max-w-5xl mx-auto relative">
          {/* Ligne centrale */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-400 via-yellow-400 via-green-400 to-blue-400"></div>

          <div className="space-y-12">
            {/* Objectif 1 */}
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 md:text-right">
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                    Solution rapide et sécurisée
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Proposer une solution d'hébergement rapide et sécurisée pour répondre
                    aux urgences et situations critiques.
                  </p>
                </div>
              </div>
              <div className="relative z-10 flex-shrink-0">
                <div className="bg-gradient-to-br from-red-500 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                  <span className="text-white text-3xl">⚡</span>
                </div>
              </div>
              <div className="flex-1 hidden md:block"></div>
            </div>

            {/* Objectif 2 */}
            <div className="relative flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="flex-1 md:text-left">
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                    Soutien aux victimes de VBG
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Soutenir spécifiquement les bénéficiaires victimes de violences
                    basées sur le genre avec un accompagnement adapté et protecteur.
                  </p>
                </div>
              </div>
              <div className="relative z-10 flex-shrink-0">
                <div className="bg-gradient-to-br from-green-500 to-teal-500 w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                  <span className="text-white text-3xl">🛡️</span>
                </div>
              </div>
              <div className="flex-1 hidden md:block"></div>
            </div>

            {/* Objectif 3 */}
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 md:text-right">
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                    Autonomie progressive
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Offrir un suivi continu qui favorise l'autonomie progressive
                    et l'insertion sociale des bénéficiaires.
                  </p>
                </div>
              </div>
              <div className="relative z-10 flex-shrink-0">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                  <span className="text-white text-3xl">🌱</span>
                </div>
              </div>
              <div className="flex-1 hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Que proposons-nous ? - Alternance avec images */}
      <section className="px-6 md:px-20 py-16 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
          Que <span className="text-orange-600">proposons-nous</span> ?
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-16 rounded-full"></div>

        {/* Système d'hébergement rotatif */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src="/images/hebergement.jpg"
                alt="Système d'hébergement"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Flexibilité
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Système d'hébergement rotatif
              </h3>
              <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-orange-500 mb-6 rounded-full"></div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Durée flexible de <strong className="text-red-600">1 semaine à 6 mois</strong>,
                selon les besoins spécifiques de chaque bénéficiaire. Cette approche permet
                une adaptation personnalisée aux situations individuelles.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 text-xl">✓</span>
                  <span>Adaptation aux besoins individuels</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 text-xl">✓</span>
                  <span>Solution immédiate en cas d'urgence</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 text-xl">✓</span>
                  <span>Accompagnement vers l'autonomie</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Soutien aux victimes de VBG */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Protection
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Soutien aux victimes de VBG
              </h3>
              <div className="h-1 w-16 bg-gradient-to-r from-green-500 to-teal-500 mb-6 rounded-full"></div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Mise à disposition d'un <strong className="text-green-600">cadre protecteur </strong>
                pour les victimes de violences basées sur le genre, avec un accompagnement
                psychologique et social spécialisé.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  <span>Environnement sécurisé et confidentiel</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  <span>Soutien psychologique professionnel</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  <span>Accompagnement social personnalisé</span>
                </li>
              </ul>
            </div>
            <div>
              <img
                src="/images/soutien-vbg.jpg"
                alt="Soutien aux victimes"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mise à l'abri et suivi */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src="/images/mise-abri.jpg"
                alt="Mise à l'abri et suivi"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Accompagnement
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Mise à l'abri et suivi
              </h3>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mb-6 rounded-full"></div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Accueil dans un environnement sûr avec un
                <strong className="text-blue-600"> accompagnement personnalisé</strong> :
                orientation, suivi de parcours et soutien continu vers l'autonomie.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 text-xl">✓</span>
                  <span>Référent dédié pour chaque personne</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 text-xl">✓</span>
                  <span>Suivi régulier et bienveillant</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 text-xl">✓</span>
                  <span>Construction d'un projet de vie durable</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="px-6 md:px-20 py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
          <span className="text-purple-600">Témoignages</span>
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-12 rounded-full"></div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                A
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-800 text-lg">Ancienne bénéficiaire</h3>
                <p className="text-gray-600 text-sm">Hébergée pendant 3 mois</p>
              </div>
            </div>
            <blockquote className="text-lg md:text-xl text-gray-700 italic leading-relaxed border-l-4 border-purple-400 pl-6">
              "Grâce au programme d'hébergement temporaire, j'ai pu retrouver ma dignité et
              ma confiance. L'accompagnement bienveillant m'a permis de me reconstruire
              petit à petit. Aujourd'hui, j'ai mon propre logement et je peux enfin envisager
              l'avenir avec sérénité. Cette aide a été un véritable tremplin vers mon autonomie."
            </blockquote>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-6 text-gray-600 bg-white rounded-full px-8 py-4 shadow-md">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                <span className="text-sm font-medium">Solidarité</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <span className="text-sm font-medium">Bienveillance</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                <span className="text-sm font-medium">Espoir</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA finale */}
      <section className="px-6 md:px-20 py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Vous avez besoin d'un hébergement temporaire ?
          </h2>
          <p className="text-lg md:text-xl text-purple-100 mb-8 leading-relaxed">
            DREAMS est là pour vous accompagner. Notre équipe vous propose un cadre
            sécurisé et un suivi personnalisé pour vous aider à retrouver votre autonomie.
          </p>

          <button className="bg-white text-purple-600 font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
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