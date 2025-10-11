import { useParams } from "react-router-dom";

function Villes() {
  const data = [
    {
      nom: "Toulouse",
      description:
        "Toulouse est la ville rose située dans le sud-ouest de la France. Ville dynamique au riche patrimoine historique, elle est célèbre pour son architecture en briques rouges, son industrie aéronautique et sa vie culturelle animée. Toulouse offre un cadre de vie agréable entre tradition et modernité.",
      image: ["/images/Toulouse_1.jpg", "/images/Toulouse_2.jpg"],
    },
    {
      nom: "Carcassonne",
      description: "Carcassonne est célèbre pour sa cité médiévale fortifiée",
      image: "/images_villes/carcassonne.jpg",
    },
    {
      nom: "Lomé",
      description: "Lomé est la capitale du Togo, située en Afrique de l'Ouest",
      image: ["/images/Lome_1.jpg", "/images/Lome_2.jpg"]
    },
    {
      nom: "Ouagadougou",
      description: "Ouagadougou est la capitale du Burkina Faso",
      image: "/images_villes/ouagadougou.jpg",
    },
    {
      nom: "Abidjan",
      description: "Abidjan est la capitale économique de la Côte d'Ivoire",
      image: "/images_villes/abidjan.jpg",
    },
    {
      nom: "Bouaké",
      description: "Bouaké est la deuxième plus grande ville de Côte d'Ivoire",
      image: "/images_villes/bouaké.jpg",
    },
    {
      nom: "Narbonne",
      description: "Narbonne est une ville historique du sud de la France",
      image: "/images_villes/narbonne.jpg",
    },
  ];

  const { nom } = useParams();
  const ville = data.find((v) => v.nom === nom);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        
        <section className="bg-white rounded-2xl shadow-lg p-8 border-2 border-white 
                          hover:border-blue-200 transition-all duration-300
                          relative before:absolute before:inset-0 before:rounded-2xl 
                          before:border-2 before:border-white/50 before:pointer-events-none">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {ville?.nom}
          </h1>
          <div className="prose max-w-none text-gray-600 leading-relaxed">
            <p className="text-lg">
              {ville?.description}
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden 
                         border-2 border-white hover:border-blue-200 
                         transition-all duration-300 transform hover:-translate-y-1
                         relative">
            <div className="w-full aspect-video bg-gray-200 relative">
              <img
                src={ville?.image[0]}
                alt={`Vue de ${ville?.nom} - 1`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden 
                         border-2 border-white hover:border-green-200 
                         transition-all duration-300 transform hover:-translate-y-1
                         relative">
            <div className="w-full aspect-video bg-gray-200 relative">
              <img
                src={ville?.image[1]}
                alt={`Vue de ${ville?.nom} - 2`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-lg p-8 border-2 border-white 
                          hover:border-purple-200 transition-all duration-300
                          relative before:absolute before:inset-0 before:rounded-2xl 
                          before:border-2 before:border-white/50 before:pointer-events-none">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Agenda des Événements - Antenne de {ville?.nom}
          </h2>
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Agenda à venir
              </h3>
              <p className="text-gray-500 mb-6">
                La programmation des événements pour {ville?.nom} sera bientôt disponible
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm text-purple-600">
                  Section en cours de développement
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Villes;