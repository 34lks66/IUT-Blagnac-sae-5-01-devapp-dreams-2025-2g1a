import { useState } from 'react';

function AntenneForm() {
  const [formData, setFormData] = useState({
    nom: '',
    description: ''
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("données antenne :", formData);
    setFormData({
      nom: '',
      description: ''
    });
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
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    required
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-300 transition duration-200"
                    placeholder="Nom de l'antenne (ville)"
                  />
                </div>

                <div>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    required
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full px-3 py-2 border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-300 transition duration-200"
                    placeholder="Description de l'antenne"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border-2 border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition duration-200 transform hover:scale-105"
                  >
                    Créer l'antenne
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