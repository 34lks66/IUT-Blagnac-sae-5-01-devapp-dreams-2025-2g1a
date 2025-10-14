import { useState } from 'react';

function DevenirBenevole() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: ''
  });


  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section horizontale : Formulaire à droite, Texte à gauche */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Colonne de gauche - Texte informatif */}
          <div className="lg:w-1/2 space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900">Devenir Bénévole</h2>
              <p className="mt-2 text-sm text-gray-600">
                Rejoignez notre équipe de bénévoles et faites la différence
              </p>
            </div>

            <div className="p-6 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="font-semibold text-amber-800 mb-3 text-lg">Comment ça marche ?</h3>
              <p className="text-amber-700">
                Après avoir soumis votre candidature, notre équipe prendra contact avec vous sous 48 heures 
                pour discuter des missions disponibles et de vos disponibilités. Vous devrez participer à 
                une session d'information avant de commencer votre bénévolat.
              </p>
            </div>

            <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 text-lg mb-3">Prochaines étapes après votre inscription :</h4>
              <ul className="text-blue-700 space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Vous recevrez un email de confirmation sous 24 heures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Un responsable bénévoles vous appellera pour un entretien téléphonique</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Vous participerez à une formation d'accueil en ligne</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Vous choisirez vos premières missions selon vos disponibilités</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 text-lg mb-3">Pourquoi nous rejoindre ?</h4>
              <p className="text-green-700 mb-3">
                🌟 En devenant bénévole, vous rejoignez une communauté engagée de plus de 500 personnes 
                qui contribuent chaque jour à faire avancer notre cause.
              </p>
              <p className="text-green-700">
                Votre temps et vos compétences sont précieux pour nous et permettent de réaliser 
                des projets concrets qui ont un impact direct sur notre mission.
              </p>
            </div>
          </div>

          {/* Colonne de droite - Formulaire aligné avec la div jaune */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-lg border-2 border-amber-100 p-8 lg:mt-21.75"> 
              <div className="mb-6 text-center">
                <h3 className="text-2xl font-bold text-gray-900">Formulaire d'inscription</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Remplissez vos informations pour postuler
                </p>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      value={formData.prenom}
                      required
                      className="mt-1 block w-full px-3 py-2 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-300 transition duration-200"
                      placeholder="Votre prénom"
                    />
                  </div>

                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      required
                      className="mt-1 block w-full px-3 py-2 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-300 transition duration-200"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <p className="text-xs text-amber-700 mb-3">
                    💡 Votre adresse email nous permettra de vous envoyer les informations importantes 
                    concernant votre candidature et les prochaines étapes du processus.
                  </p>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Adresse email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      required
                      className="mt-1 block w-full px-3 py-2 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-300 transition duration-200"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <p className="text-xs text-amber-700 mb-3">
                    📞 Votre numéro de téléphone sera utilisé uniquement pour vous contacter rapidement 
                    en cas de besoin urgent ou pour confirmer vos disponibilités pour une mission.
                  </p>
                  <div>
                    <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                      Numéro de téléphone *
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      required
                      className="mt-1 block w-full px-3 py-2 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-300 transition duration-200"
                      placeholder="01 23 45 67 89"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border-2 border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition duration-200 transform hover:scale-105"
                  >
                    Postuler comme bénévole
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  * Champs obligatoires. Vos données sont protégées et ne seront jamais partagées avec des tiers.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Section en dessous du formulaire */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Engagez-vous à nos côtés</h3>
            <p className="mt-2 text-gray-600">
              Découvrez les différentes façons de contribuer à notre mission
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-purple-50 rounded-xl border-2 border-purple-100">
              <div className="text-2xl mb-3">🕒</div>
              <h4 className="font-semibold text-purple-800 mb-2">Bénévolat régulier</h4>
              <p className="text-purple-700 text-sm">
                Engagez-vous sur la durée avec des missions régulières adaptées à vos compétences 
                et disponibilités. Parfait pour ceux qui souhaitent s'investir sur le long terme.
              </p>
            </div>

            <div className="text-center p-6 bg-indigo-50 rounded-xl border-2 border-indigo-100">
              <div className="text-2xl mb-3">⚡</div>
              <h4 className="font-semibold text-indigo-800 mb-2">Missions ponctuelles</h4>
              <p className="text-indigo-700 text-sm">
                Participez à des événements spécifiques ou des actions ponctuelles selon vos envies 
                et disponibilités. Idéal pour ceux qui ont un emploi du temps chargé.
              </p>
            </div>

            <div className="text-center p-6 bg-teal-50 rounded-xl border-2 border-teal-100">
              <div className="text-2xl mb-3">💼</div>
              <h4 className="font-semibold text-teal-800 mb-2">Compétences spécifiques</h4>
              <p className="text-teal-700 text-sm">
                Mettez vos compétences professionnelles au service de notre cause : communication, 
                gestion, technique... Chaque talent compte !
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DevenirBenevole;