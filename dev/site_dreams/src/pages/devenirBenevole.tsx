import { useState } from 'react';

function DevenirBenevole() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: ''
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log("données :", formData);
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      telephone: ''
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4 sm:px-6 lg:px-8">
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
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                      required
                      className="mt-1 block w-full px-3 py-2 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-300 transition duration-200"
                      placeholder="Votre prénom"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      required
                      onChange={(e) => setFormData({...formData, nom: e.target.value })}
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
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      required
                      onChange={(e) => setFormData({...formData, email: e.target.value })}
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
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      required
                      onChange={(e) =>setFormData({...formData, telephone: e.target.value })}
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DevenirBenevole;
