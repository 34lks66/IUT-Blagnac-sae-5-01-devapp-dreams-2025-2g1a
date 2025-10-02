export default function PageAccueilPublic() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Section Hero "Bienvenue" */}
      <section className="relative bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start space-x-2 mb-6">
                {['🏳️‍🌈', '❤️', '🧡', '💛', '💚', '💙', '💜'].map((emoji, i) => (
                  <span key={i} className="text-2xl animate-bounce" style={{animationDelay: `${i * 0.1}s`}}>
                    {emoji}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                Bienvenue dans un espace sûr
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Un sanctuaire bienveillant où chaque identité est respectée, 
                protégée et célébrée. Vous êtes en sécurité ici.
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300">
                Accéder à l'aide immédiate
              </button>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl h-[28rem] w-full overflow-hidden">
                <img 
                  src="public/images/pride-boy.jpg" 
                  alt="Communauté LGBTQIA+ unie et solidaire" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Section "Processus d'accueil à l'arrivée" */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Processus d'accueil à votre arrivée
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Un accompagnement étape par étape pour vous garantir sécurité et sérénité
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: "📍", 
                title: "Où aller ?", 
                desc: "Centres d'accueil spécialisés et associations partenaires près de chez vous" 
              },
              { 
                icon: "📋", 
                title: "Documents nécessaires", 
                desc: "Pièce d'identité, justificatifs de situation. Nous vous aidons si vous n'en avez pas" 
              },
              { 
                icon: "🛡️", 
                title: "Droits garantis", 
                desc: "Accueil inconditionnel, respect de votre identité, confidentialité absolue" 
              }
            ].map((step, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2 text-lg">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Section "Vos droits en Europe" */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Vos droits en Europe
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Des protections légales qui garantissent votre sécurité et votre dignité
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🛡️</div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 text-lg">Droit à l'asile</h3>
                  <p className="text-gray-600">
                    Protection internationale pour les personnes persécutées en raison 
                    de leur orientation sexuelle ou identité de genre
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-8 border border-green-200">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🏥</div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 text-lg">Accès aux soins</h3>
                  <p className="text-gray-600">
                    Soins médicaux et soutien psychologique adaptés, 
                    dans le respect de votre identité
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-8 border border-purple-200">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🏠</div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 text-lg">Logement temporaire</h3>
                  <p className="text-gray-600">
                    Hébergement sécurisé et adapté pendant la procédure de demande d'asile
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 rounded-xl p-8 border border-red-200">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🔒</div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 text-lg">Confidentialité</h3>
                  <p className="text-gray-600">
                    Protection absolue de vos données personnelles et de votre vie privée
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section "Témoignages et soutien" */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-500 py-16 rounded-2xl">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center text-white mb-12">
            <h2 className="text-3xl font-bold mb-4">Vous n'êtes pas seul·e</h2>
            <p className="text-blue-100 text-xl">
              Des parcours similaires au vôtre, des vies reconstruites
            </p>
          </div>

          <div className="space-y-6">
            {[
              "« Après avoir fui mon pays, j'ai trouvé ici bien plus qu'un toit : une famille qui m'a accepté tel que je suis »",
              "« Le soutien psychologique m'a sauvé la vie. Aujourd'hui, je revis enfin en harmonie avec mon identité »",
              "« Ici, personne ne me juge. Pour la première fois, je peux être moi-même sans peur »"
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <p className="text-white italic text-lg">"{testimonial}"</p>
                <p className="text-blue-200 text-sm mt-2">— Témoignage anonyme</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-8 border border-white/30">
              <h3 className="text-2xl font-bold text-white mb-4">Notre communauté vous attend</h3>
              <p className="text-blue-100 mb-6">
                Rejoignez un réseau de soutien bienveillant où chaque parcours est unique et respecté
              </p>
              <button className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:shadow-lg transition-all">
                Rencontrer nos bénévoles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section "Nous contacter / Aide immédiate" */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Obtenir de l'aide immédiate
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Contactez-nous en toute sécurité. Tous les échanges sont confidentiels.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Nom (optionnel)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email (optionnel)</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Votre message</label>
                <textarea
                  placeholder="Décrivez votre situation, vos besoins..."
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-4 rounded-lg font-medium hover:shadow-lg transition-all text-lg"
              >
                Envoyer ma demande en toute sécurité
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <button className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors px-4 py-2">
                  <span>💬</span>
                  Chat sécurisé 24/7
                </button>
                <button className="flex items-center gap-2 text-red-500 font-medium hover:text-red-600 transition-colors px-4 py-2">
                  <span>🚨</span>
                  Urgence immédiate
                </button>
                <button className="flex items-center gap-2 text-gray-500 font-medium hover:text-gray-600 transition-colors px-4 py-2 bg-gray-100 rounded-lg">
                  <span>🚪</span>
                  Sortie rapide
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}