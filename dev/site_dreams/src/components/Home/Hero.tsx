import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BackgroundImg from "../../assets/accueil_image/hero.png";

export default function Hero() {
  const navigate = useNavigate();

  const handleDiscoverClick = () => {
    const missionsSection = document.getElementById("missions");
    if (missionsSection) missionsSection.scrollIntoView({ behavior: "smooth" });
  };

  const handleContact = () => navigate("/contact");

  return (
    <section
      className="relative py-40 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${BackgroundImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texte */}
          <div className="text-center lg:text-left">
            {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              L'autonomie,
              <span className="text-white/90 font-light"> l'indépendance</span>
              <span className="block font-bold bg-gradient-to-r from-yellow-500 to-amber-700 bg-clip-text text-transparent">et la liberté</span>
            </h1> */}
            <h1 className="fade-slide-up text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              L'autonomie,
              <span className="text-white/90 font-light"> l'indépendance</span>
              <span className="block font-bold bg-gradient-to-r from-yellow-500 to-amber-700 bg-clip-text text-transparent">
                et la liberté
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200/90 mb-8 max-w-xl mx-auto lg:mx-0">
              Chez <span className="font-semibold text-white">DREAMS</span>, nous construisons un avenir plus juste pour les personnes en situation d'exil ou en rupture sociale.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={handleDiscoverClick}
                className="font-bold bg-gradient-to-r from-yellow-500 to-amber-700 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                Découvrir nos missions
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={handleContact}
                className="border border-white/40 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
              >
                Nous contacter
              </button>
            </div>
          </div>

          {/* Visuel */}
          {/* <div className="w-full flex justify-center lg:justify-end">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 shadow-2xl border border-white/10 max-w-md">
              <img
                src={Dreams}
                alt="DREAMS accueil"
              />
              <p className="text-center text-white text-lg font-medium mt-4 tracking-tight">
                Save <span className="font-bold bg-gradient-to-r from-yellow-500 to-amber-700 bg-clip-text text-transparent">Change</span>
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}