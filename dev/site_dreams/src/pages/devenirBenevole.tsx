import { useState } from 'react';

function DevenirBenevole() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: ''
  });

  const [legalChecks, setLegalChecks] = useState({
    mentionsLegales: false,
    reglementInterieur: false,
    droitImage: false
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleLegalCheckChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    setLegalChecks(prev => ({
      ...prev,
      [name]: checked
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Vérifier que toutes les cases sont cochées
    const allChecked = Object.values(legalChecks).every(check => check);
    if (!allChecked) {
      alert('Veuillez accepter toutes les conditions légales pour continuer.');
      return;
    }

    console.log("=== DONNÉES DU FORMULAIRE ===");
    console.log("Informations personnelles:", formData);
    console.log("Conditions acceptées:", legalChecks);
    console.log("=============================");

    // Afficher le popup de confirmation
    setShowConfirmation(true);
    
    // Réinitialiser le formulaire
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      telephone: ''
    });
    setLegalChecks({
      mentionsLegales: false,
      reglementInterieur: false,
      droitImage: false
    });
  }

  function closeConfirmation() {
    setShowConfirmation(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Popup de confirmation */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-scale-in">
              {/* Header avec icône */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-t-2xl p-6 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Candidature envoyée !</h3>
              </div>

              {/* Contenu */}
              <div className="p-6 text-center">
                <p className="text-gray-700 mb-2">
                  Merci <span className="font-semibold text-amber-600">{formData.prenom} {formData.nom}</span> pour votre candidature !
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  Nous avons bien reçu votre demande et nous vous contacterons dans les <span className="font-semibold">48 heures</span>.
                </p>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <p className="text-green-700 text-sm font-medium">
                    Prochaine étape : Un responsable bénévoles vous appellera au 
                    <span className="font-semibold"> {formData.telephone}</span>
                  </p>
                </div>

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-4">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>Email de confirmation envoyé à : {formData.email}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-4 flex justify-center">
                <button
                  onClick={closeConfirmation}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  Parfait, j'ai compris !
                </button>
              </div>
            </div>
          </div>
        )}

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

          {/* Colonne de droite - Formulaire */}
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

                {/* Cases à cocher légales */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-800 text-lg mb-3">Acceptation des conditions</h4>
                  <div className="space-y-3">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="mentionsLegales"
                        checked={legalChecks.mentionsLegales}
                        onChange={handleLegalCheckChange}
                        className="mt-1 text-amber-600 focus:ring-amber-500 rounded"
                      />
                      <span className="text-sm text-gray-700">
                        J'accepte les <a href="/mentions-legales" className="text-amber-600 hover:text-amber-700 underline">mentions légales</a> et la politique de confidentialité
                      </span>
                    </label>
                    
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="reglementInterieur"
                        checked={legalChecks.reglementInterieur}
                        onChange={handleLegalCheckChange}
                        className="mt-1 text-amber-600 focus:ring-amber-500 rounded"
                      />
                      <span className="text-sm text-gray-700">
                        Je m'engage à respecter le <a href="/reglement-interieur" className="text-amber-600 hover:text-amber-700 underline">règlement intérieur</a> de l'association
                      </span>
                    </label>
                    
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="droitImage"
                        checked={legalChecks.droitImage}
                        onChange={handleLegalCheckChange}
                        className="mt-1 text-amber-600 focus:ring-amber-500 rounded"
                      />
                      <span className="text-sm text-gray-700">
                        J'accepte l'utilisation de mon image dans le cadre des activités de l'association
                      </span>
                    </label>
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