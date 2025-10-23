import { useState, useEffect } from "react";

type Antenne = {
  _id: string;
  nom: string;
  description: string;
  pays: string;
};

function AntenneForm() {
  const [antennes, setAntennes] = useState<Antenne[]>([]);
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    pays: "France",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Charger les antennes existantes
  useEffect(() => {
    fetchAntennes();
  }, []);

  const fetchAntennes = () => {
    fetch("http://localhost:5000/api/antenne/get")
      .then((res) => res.json())
      .then((data) => setAntennes(data))
      .catch((err) => console.error("Erreur:", err));
  };

  // Fonction pour supprimer une antenne
  async function handleDelete(id: string) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette antenne ?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/antenne/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setMessage("✅ Antenne supprimée avec succès !");
        fetchAntennes();
      } else {
        setMessage("❌ Erreur lors de la suppression");
      }
    } catch (error) {
      setMessage("❌ Erreur de connexion");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/antenne/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("✅ Antenne créée avec succès !");
        setFormData({ nom: "", description: "", pays: "France" });
        fetchAntennes();
      } else {
        setMessage("❌ Erreur lors de la création");
      }
    } catch (error) {
      setMessage("❌ Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen py-6 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Dashboard */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-700 bg-clip-text text-transparent">
                Gestion des Antennes
              </h1>
              <p className="text-gray-600 mt-2">
                Créez et gérez les antennes locales de votre réseau
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Formulaire de création - Colonne gauche */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-yellow-500 to-amber-600 rounded-full"></div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Nouvelle Antenne</h2>
                  <p className="text-gray-600 text-sm">Ajoutez une nouvelle antenne locale</p>
                </div>
              </div>

              {message && (
                <div
                  className={`mb-6 p-4 rounded-lg border ${
                    message.includes("✅")
                      ? "bg-green-50 border-green-200 text-green-700"
                      : "bg-red-50 border-red-200 text-red-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{message.includes("✅") ? "✅" : "❌"}</span>
                    <span className="text-sm font-medium">{message.replace("✅", "").replace("❌", "")}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      value={formData.nom}
                      required
                      onChange={(e) =>
                        setFormData({ ...formData, nom: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-400 transition duration-200"
                      placeholder="Paris, Lyon, Toulouse..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pays *
                    </label>
                    <select
                      value={formData.pays}
                      required
                      onChange={(e) =>
                        setFormData({ ...formData, pays: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-400 transition duration-200"
                    >
                      <option value="France">France</option>
                      <option value="Belgique">Belgique</option>
                      <option value="Suisse">Suisse</option>
                      <option value="Luxembourg">Luxembourg</option>
                      <option value="Canada">Canada</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-400 transition duration-200"
                    placeholder="Décrivez les activités, le rôle et les objectifs de cette antenne..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition duration-200 ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 shadow-sm hover:shadow-md"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Création en cours...</span>
                    </div>
                  ) : (
                    "Créer l'antenne"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Liste des antennes - Colonne droite */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Antennes existantes</h2>
                    <p className="text-gray-600 text-sm">{antennes.length} antenne(s) créée(s)</p>
                  </div>
                </div>
              </div>

              <div className="max-h-[500px] overflow-y-auto space-y-4">
                {antennes.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-3 text-gray-300">🏢</div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Aucune antenne créée
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Créez votre première antenne en remplissant le formulaire
                    </p>
                  </div>
                ) : (
                  antennes.map((antenne) => (
                    <div
                      key={antenne._id}
                      className="bg-gray-50/50 rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition duration-200 group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900 text-lg truncate">
                              {antenne.nom}
                            </h3>
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                              {antenne.pays}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                            {antenne.description}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDelete(antenne._id)}
                          className="ml-3 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-lg text-sm font-medium transition duration-200 opacity-0 group-hover:opacity-100 hover:scale-105"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Carte d'information */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border border-yellow-200 p-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-yellow-600 text-sm">💡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">À propos des antennes</h4>
                  <p className="text-yellow-700 text-sm">
                    Les antennes représentent nos implantations locales. Chaque antenne permet de 
                    coordonner les actions bénévoles et les projets spécifiques à son territoire.
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

export default AntenneForm;