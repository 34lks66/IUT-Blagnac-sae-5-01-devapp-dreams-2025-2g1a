function DevenirBenevole() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

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
          </div>

          {/* Colonne de droite - Nous contacter */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="text-center">
                {/* Icône email */}
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">Nous contacter</h3>
                <p className="text-gray-600 mb-6">
                  Vous souhaitez devenir bénévole ? Envoyez-nous un email avec vos coordonnées
                  (nom, prénom, téléphone) et nous reviendrons vers vous dans les plus brefs délais.
                </p>

                <a
                  href="mailto:assodreamsfr@gmail.com"
                  className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3.5 px-8 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  assodreamsfr@gmail.com
                </a>

                <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    N'oubliez pas de mentionner vos <span className="font-semibold text-gray-800">disponibilités</span> et
                    les <span className="font-semibold text-gray-800">missions</span> qui vous intéressent dans votre email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DevenirBenevole;