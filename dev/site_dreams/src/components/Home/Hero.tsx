import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Dreams from "../../assets/dreams_hero.png";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  
  const handleDiscoverClick = () => {
    const missionsSection = document.getElementById('missions');
    if (missionsSection) {
      missionsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContact = () => {
    navigate("/contact");
  };

  return (
    <div className="relative bg-gradient-to-br from-yellow-50 to-teal-100 py-16 lg:py-30 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-yellow-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-teal-100 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* Titre remonté avec moins d'espace en bas */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Accueillir, 
              <span className="text-yellow-500"> Protéger</span>, 
              <span className="text-teal-600"> Accompagner</span>
            </h1>
            
            {/* Texte avec espacement réduit */}
            <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed max-w-2xl">
              Chez <span className="font-semibold text-gray-900">DREAMS</span>, nous créons un avenir meilleur pour les personnes en situation d'exil 
              ou de rupture sociale, particulièrement issues des minorités sexuelles.
            </p>
            
            {/* CTA Buttons avec espacement réduit */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={handleDiscoverClick}
                className="bg-yellow-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-yellow-600 transition-all duration-200 flex items-center justify-center gap-2 group text-sm md:text-base"
              >
                Découvrir nos missions
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={handleContact}
                className="border-2 border-gray-300 text-gray-700 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 text-sm md:text-base"
              >
                Nous contacter
              </button>
            </div>
          </div>

          {/* Image/Visual Section */}
          <div className="relative mt-6 lg:mt-0">
            <div className="bg-gradient-to-br from-yellow-400 to-teal-500 rounded-2xl p-1 transform rotate-2">
              <div className="bg-white rounded-xl p-4 md:p-6 transform -rotate-2 shadow-xl">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <img 
                      src={Dreams} 
                      alt="DREAMS - Accueil, Protection, Accompagnement" 
                      className="max-w-full h-auto"
                    />    
                    <p className="text-lg md:text-xl text-gray-600 font-semibold mb-6 leading-relaxed max-w-2xl">
                    Accompagnement{' '}
                    <span className="text-yellow-400">des personnes minoritaires</span> et/ou{' '}
                    <span className="text-yellow-400">en rupture sociale</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;