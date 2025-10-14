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
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Devenir Bénévole</h2>
            <p className="mt-2 text-sm text-gray-600">
              Rejoignez notre équipe de bénévoles et faites la différence
            </p>
          </div>

          <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h3 className="font-semibold text-amber-800 mb-2">Comment ça marche ?</h3>
            <p className="text-sm text-amber-700">
              Après avoir soumis votre candidature, notre équipe prendra contact avec vous sous 48 heures 
              pour discuter des missions disponibles et de vos disponibilités. Vous devrez participer à 
              une session d'information avant de commencer votre bénévolat.
            </p>
          </div>

          <form className="space-y-6">
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                placeholder="Votre nom"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600 mb-3">
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600 mb-3">
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  placeholder="01 23 45 67 89"
                />
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 text-sm mb-2">Prochaines étapes après votre inscription :</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Vous recevrez un email de confirmation sous 24 heures</li>
                <li>• Un responsable bénévoles vous appellera pour un entretien téléphonique</li>
                <li>• Vous participerez à une formation d'accueil en ligne</li>
                <li>• Vous choisirez vos premières missions selon vos disponibilités</li>
              </ul>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition duration-200"
              >
                Postuler comme bénévole
              </button>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-green-700">
                🌟 En devenant bénévole, vous rejoignez une communauté engagée de plus de 500 personnes 
                qui contribuent chaque jour à faire avancer notre cause. Votre temps et vos compétences 
                sont précieux pour nous !
              </p>
            </div>

            <p className="text-xs text-gray-500 text-center">
              * Champs obligatoires. Vos données sont protégées et ne seront jamais partagées avec des tiers.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DevenirBenevole;