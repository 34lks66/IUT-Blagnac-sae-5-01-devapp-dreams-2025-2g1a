import { useParams } from "react-router-dom";
import AgendaAntennes from "../components/Agenda/agenda_antennes";
import { CalendarDays } from "lucide-react";

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Villes() {
  const data = [
    {
      nom: "Toulouse",
      description:
        "Toulouse est la ville rose située dans le sud-ouest de la France. Ville dynamique au riche patrimoine historique, elle est célèbre pour son architecture en briques rouges, son industrie aéronautique et sa vie culturelle animée. Toulouse offre un cadre de vie agréable entre tradition et modernité. La communauté LGBTQIA+ y est active et bien intégrée, avec de nombreux événements et associations qui œuvrent pour l'inclusion et la diversité.",
      image: ["/images/villes/Toulouse_1.jpg", "/images/villes/Toulouse_2.jpg"],
    },
    {
      nom: "Carcassonne",
      description: "Carcassonne est célèbre pour sa cité médiévale fortifiée",
      image: ["/images/villes/Carcassonne_1.jpg", "/images/villes/Carcassonne_2.jpg"],
    },
    {
      nom: "Lomé",
      description: "Lomé est la capitale du Togo, située en Afrique de l'Ouest",
      image: ["/images/villes/Lome_1.jpg", "/images/villes/Lome_2.jpg"]
    },
    {
      nom: "Ouagadougou",
      description: "Ouagadougou est la capitale du Burkina Faso",
      image: "/images_villes/ouagadougou.jpg",
    },
    {
      nom: "Abidjan",
      description: "Abidjan est la capitale économique de la Côte d'Ivoire",
      image: ["/images/villes/Abidjan_1.jpg", "/images/villes/Abidjan_2.jpg"],
    },
    {
      nom: "Bouaké",
      description: "Bouaké est la deuxième plus grande ville de Côte d'Ivoire",
      image: "/images_villes/bouaké.jpg",
    },
    {
      nom: "Narbonne",
      description: "Narbonne est une ville historique du sud de la France",
      image: ["/images/villes/Narbonne_1.jpg", "/images/villes/Narbonne_2.jpg"],
    },
    {
      nom: "Bobo-Dioulasso",
      description: "Bodo est une ville historique du sud de la France",
      image: ["/images/villes/Bobo_1.jpg", "/images/villes/Toulouse_2.jpg"],
    },
  ];

  const { nom } = useParams();
  const ville = data.find((v) => v.nom === nom);

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Section Hero avec image de fond */}
      <section className="relative overflow-hidden">
        <img
          src={ville?.image[0]}
          alt={`Ville de ${ville?.nom}`}
          className="w-full h-64 md:h-72 object-cover object-center"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-6xl mx-auto mb-4 bg-white/95 rounded-2xl p-4 md:p-5 shadow-lg">
            <div className="text-gray-500 text-xs">
              Accueil / Villes / {ville?.nom}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">
              Antenne de {ville?.nom}
            </h1>
            <p className="text-gray-700">
              Découvrez l'antenne DREAMS de <span className="font-semibold bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">{ville?.nom}</span>,
              un espace <span className="font-semibold bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">sécurisé et inclusif</span> pour la communauté
              <span className="font-semibold bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent"> LGBTQIA+</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Section Présentation */}
      <section className="px-6 md:px-20 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
            Présentation de <span className="bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">{ville?.nom}</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-[#93720a] mx-auto mb-8 rounded-full"></div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <p className="text-lg text-gray-700 leading-relaxed">
              {ville?.description}
            </p>
          </div>
        </div>
      </section>

      {/* Section Galerie */}
      <section className="px-6 md:px-20 py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
          Galerie <span className="bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">Photos</span>
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-[#93720a] mx-auto mb-12 rounded-full"></div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Image 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-full aspect-video bg-gray-200 rounded-xl overflow-hidden">
              <img
                src={ville?.image[0]}
                alt={`Vue de ${ville?.nom} - 1`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-500 to-[#93720a]"></div>
                <h4 className="text-sm font-semibold text-[#93720a] uppercase tracking-wide">
                  Vue principale
                </h4>
              </div>
            </div>
          </div>

          {/* Image 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-full aspect-video bg-gray-200 rounded-xl overflow-hidden">
              <img
                src={ville?.image[1]}
                alt={`Vue de ${ville?.nom} - 2`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-500 to-[#93720a]"></div>
                <h4 className="text-sm font-semibold text-[#93720a] uppercase tracking-wide">
                  Vue secondaire
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Agenda */}
      <section className="px-6 md:px-20 py-16 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
          Agenda des <span className="bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">Événements</span>
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-[#93720a] mx-auto mb-12 rounded-full"></div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-[#f4f1ea] rounded-2xl p-8 md:p-10 shadow-xl border-t-4 border-yellow-500">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16  bg-yellow-500  rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg">
                <CalendarDays />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-800 text-lg">Antenne de {ville?.nom}</h3>
              </div>
            </div>

            {/* <div className="text-center py-8">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Agenda en cours de préparation
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  L'équipe de {ville?.nom} travaille actuellement sur la programmation
                  des prochains événements. Revenez bientôt pour découvrir les activités,
                  ateliers et rencontres organisés près de chez vous.
                </p>

                <div className="bg-white rounded-lg p-4 border-l-4 border-yellow-500">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-[#93720a]">Prochainement :</span>
                    Réunions de sensibilisation, groupes de parole, et événements communautaires
                  </p>
                </div>
              </div>


            </div> */}
            <div className="max-h-70 overflow-y-auto">
              <AgendaAntennes antennaName={ville?.nom} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Villes;