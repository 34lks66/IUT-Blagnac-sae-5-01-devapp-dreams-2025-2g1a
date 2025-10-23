import { useState } from 'react';

function AntenneForm() {
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    pays: 'France'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5001/api/antenne/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Antenne créée avec succès :", result);
        setMessage('✅ Antenne créée avec succès !');
        setFormData({
          nom: '',
          description: '',
          pays: 'France'
        });
      } else {
        const error = await response.json();
        setMessage(`❌ Erreur: ${error.error}`);
      }
    } catch (error) {
      console.error("Erreur lors de la création :", error);
      setMessage('❌ Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Colonne de gauche - Texte informatif */}
          <div className="lg:w-1/2 space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900">Créer une Antenne</h2>
              <p className="mt-2 text-sm text-gray-600">
                Ajoutez une nouvelle antenne locale à votre réseau
              </p>
            </div>

            <div className="p-6 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="font-semibold text-amber-800 mb-3 text-lg">À propos des antennes</h3>
              <p className="text-amber-700">
                Les antennes représentent nos implantations locales dans différentes villes. 
                Chaque antenne permet de coordonner les actions bénévoles et les projets 
                spécifiques à sa région géographique.
              </p>
            </div>

            <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 text-lg mb-3">Caractéristiques d'une antenne :</h4>
              <ul className="text-blue-700 space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Représente une ville ou une région spécifique</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Coordonne les bénévoles locaux</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Organise des événements et actions locales</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Colonne de droite - Formulaire */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-lg border-2 border-amber-100 p-8"> 
              <div className="mb-6 text-center">
                <h3 className="text-2xl font-bold text-gray-900">Nouvelle Antenne</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Renseignez les informations de la nouvelle antenne
                </p>
              </div>

              {/* Message de statut */}
              {message && (
                <div className={`mb-4 p-3 rounded-lg text-center ${
                  message.includes('✅') 
                    ? 'bg-green-50 border border-green-200 text-green-700' 
                    : 'bg-red-50 border border-red-200 text-red-700'
                }`}>
                  {message}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom de l'antenne *
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    required
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-300 transition duration-200"
                    placeholder="Ex: Paris, Lyon, Toulouse..."
                  />
                </div>

                <div>
                  <label htmlFor="pays" className="block text-sm font-medium text-gray-700 mb-1">
                    Pays *
                  </label>
                  <select
                    id="pays"
                    name="pays"
                    value={formData.pays}
                    required
                    onChange={(e) => setFormData({ ...formData, pays: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-300 transition duration-200"
                  >
                    <option value="France">France</option>
                    <option value="Belgique">Belgique</option>
                    <option value="Suisse">Suisse</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Canada">Canada</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    required
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full px-3 py-2 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-300 transition duration-200"
                    placeholder="Décrivez les activités, le rôle et les objectifs de cette antenne..."
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center py-3 px-4 border-2 border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition duration-200 ${
                      isLoading 
                        ? 'bg-amber-400 cursor-not-allowed' 
                        : 'bg-amber-600 hover:bg-amber-700 transform hover:scale-105'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Création en cours...
                      </>
                    ) : (
                      'Créer l\'antenne'
                    )}
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

export default AntenneForm;