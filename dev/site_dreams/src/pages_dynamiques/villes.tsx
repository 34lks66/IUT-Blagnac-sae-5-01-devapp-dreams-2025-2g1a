import { useParams } from "react-router-dom";
import AgendaAntennes from "../components/Agenda/agenda_antennes";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";

type Antenne = {
  _id: string;
  nom: string;
  description: string;
  image: string;
  pays:
    | string
    | {
        _id: string;
        nom: string;
      };
};

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Villes() {
  console.log("LE TesT:", window.location.href);
  const [antennes, setAntennes] = useState<Antenne[]>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchAntennes = () => {
    fetch(`${API_BASE}/api/antenne/get`)
      .then((res) => res.json())
      .then((data) => {
        setAntennes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAntennes();
  }, []);

  const { nom } = useParams();
  const ville = antennes.find((v) => v.nom === nom);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!ville) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Antenne non trouvée</h1>
          <p className="text-gray-600">L'antenne "{nom}" n'existe pas ou a été déplacée.</p>
        </div>
      </div>
    );
  }

  const imageUrl = `${API_BASE}${ville.image}`;

  return (
    <main className="w-full min-h-screen bg-white">
      {/* Section Hero avec image de fond */}
      <section className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={`Ville de ${ville.nom}`}
          className="w-full h-72 md:h-96 object-cover object-center"
          onError={(e) => {
            // Fallback si l'image ne charge pas
            e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Image+non+disponible';
          }}
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-7xl mx-auto px-8 lg:px-12 mb-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
              <nav className="text-gray-500 text-sm mb-4">
                Accueil / Villes / {ville.nom}
              </nav>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Antenne de {ville.nom}
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                Découvrez l'antenne DREAMS de <span className="font-semibold text-gray-900">{ville.nom}</span>,
                un espace <span className="font-semibold text-gray-900">sécurisé et inclusif</span> pour la communauté
                <span className="font-semibold text-gray-900"> LGBTQIA+</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Présentation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Présentation de {ville.nom}
            </h2>
            <div className="w-24 h-1 bg-gray-300 mx-auto mb-8"></div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-10 border-2 border-gray-200">
            <p className="text-xl text-gray-700 leading-relaxed text-center">
              {ville.description || "Description en cours de rédaction..."}
            </p>
          </div>
        </div>
      </section>

      {/* Section Galerie */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Galerie Photos
            </h2>
            <div className="w-24 h-1 bg-gray-300 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Image 1 */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-full aspect-video bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={imageUrl}
                  alt={`Vue de ${ville.nom}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Image+non+disponible';
                  }}
                />
              </div>
            </div>

            {/* Image 2 */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-full aspect-video bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={imageUrl}
                  alt={`Activités à ${ville.nom}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Image+non+disponible';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Agenda */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Agenda des Événements
            </h2>
            <div className="w-24 h-1 bg-gray-300 mx-auto mb-8"></div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-10 border-2 border-gray-200">
              <div className="flex items-center mb-8">
                <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <CalendarDays className="w-10 h-10" />
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl font-semibold text-gray-900">Antenne de {ville.nom}</h3>
                  <p className="text-gray-600 mt-1">Programme des activités</p>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                <AgendaAntennes antennaName={ville.nom} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Villes;