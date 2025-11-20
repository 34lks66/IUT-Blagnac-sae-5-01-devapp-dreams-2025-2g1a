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

    const allChecked = Object.values(legalChecks).every(check => check);
    if (!allChecked) {
      alert('Veuillez accepter toutes les conditions légales pour continuer.');
      return;
    }

    console.log("=== DONNÉES DU FORMULAIRE ===");
    console.log("Informations personnelles:", formData);
    console.log("Conditions acceptées:", legalChecks);
    console.log("=============================");

    setShowConfirmation(true);
    
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Popup de confirmation */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-scale-in">
              {/* Header avec icône */}
              <div className="bg-gray-900 rounded-t-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Candidature envoyée !</h3>
              </div>

              {/* Contenu */}
              <div className="p-6 text-center">
                <p className="text-gray-700 mb-3">
                  Merci <span className="font-semibold text-gray-900">{formData.prenom} {formData.nom}</span> pour votre candidature.
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  Nous avons bien reçu votre demande et nous vous contacterons dans les <span className="font-semibold">48 heures</span>.
                </p>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <p className="text-green-700 text-sm">
                    Un responsable bénévoles vous appellera au 
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
                  className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-6 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Devenir Bénévole</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Rejoignez notre communauté engagée et contribuez à faire la différence
          </p>
        </div>

        {/* Section horizontale */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Colonne de gauche - Texte informatif */}
          <div className="lg:w-1/2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-xl">Processus de recrutement</h3>
              <p className="text-gray-700 mb-4">
                Après avoir soumis votre candidature, notre équipe prendra contact avec vous sous 48 heures 
                pour discuter des missions disponibles et de vos disponibilités.
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 text-sm mb-2">Session d'information obligatoire</h4>
                <p className="text-blue-800 text-sm">
                  Vous devrez participer à une session d'information avant de commencer votre bénévolat.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="font-semibold text-gray-900 text-lg mb-4">Déroulement de l'inscription</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-medium text-gray-600">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Email de confirmation</p>
                    <p className="text-gray-600 text-sm">Sous 24 heures</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-medium text-gray-600">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Entretien téléphonique</p>
                    <p className="text-gray-600 text-sm">Avec un responsable bénévoles</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-medium text-gray-600">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Formation d'accueil</p>
                    <p className="text-gray-600 text-sm">Session en ligne</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-medium text-gray-600">4</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Choix des missions</p>
                    <p className="text-gray-600 text-sm">Selon vos disponibilités</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="font-semibold text-gray-900 text-lg mb-3">Impact de votre engagement</h4>
              <p className="text-gray-700 mb-3">
                En devenant bénévole, vous rejoignez une communauté engagée de plus de 500 personnes 
                qui contribuent chaque jour à faire avancer notre cause.
              </p>
              <p className="text-gray-700">
                Votre temps et vos compétences sont précieux et permettent de réaliser 
                des projets concrets ayant un impact direct sur notre mission.
              </p>
            </div>
          </div>

          {/* Colonne de droite - Formulaire */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Formulaire d'inscription</h3>
                <p className="text-gray-600">
                  Renseignez vos informations pour postuler en tant que bénévole
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom
                    </label>
                    <input
                      type="text"
                      id="prenom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200"
                      placeholder="Votre prénom"
                    />
                  </div>

                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      required
                      onChange={(e) => setFormData({...formData, nom: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse email
                  </label>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-xs text-gray-600 mb-3">
                      Votre adresse email nous permettra de vous envoyer les informations importantes 
                      concernant votre candidature.
                    </p>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      required
                      onChange={(e) => setFormData({...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-xs text-gray-600 mb-3">
                      Votre numéro de téléphone sera utilisé uniquement pour vous contacter rapidement 
                      concernant vos disponibilités.
                    </p>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      required
                      onChange={(e) =>setFormData({...formData, telephone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition duration-200"
                      placeholder="01 23 45 67 89"
                    />
                  </div>
                </div>

                {/* Cases à cocher légales */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 text-lg mb-4">Conditions d'engagement</h4>
                  <div className="space-y-4">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="mentionsLegales"
                        checked={legalChecks.mentionsLegales}
                        onChange={handleLegalCheckChange}
                        className="mt-1 text-gray-700 focus:ring-gray-500 rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">
                        J'accepte les <a href="/politiques-de-confidentialites" className="text-gray-900 hover:text-gray-700 underline font-medium">mentions légales</a> et la politique de confidentialité
                      </span>
                    </label>
                    
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="reglementInterieur"
                        checked={legalChecks.reglementInterieur}
                        onChange={handleLegalCheckChange}
                        className="mt-1 text-gray-700 focus:ring-gray-500 rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">
                        Je m'engage à respecter le <a href="/reglement-interieur" className="text-gray-900 hover:text-gray-700 underline font-medium">règlement intérieur</a> de l'association
                      </span>
                    </label>
                    
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="droitImage"
                        checked={legalChecks.droitImage}
                        onChange={handleLegalCheckChange}
                        className="mt-1 text-gray-700 focus:ring-gray-500 rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">
                        J'accepte l'utilisation de mon image dans le cadre des activités de l'association
                      </span>
                    </label>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3.5 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Soumettre ma candidature
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