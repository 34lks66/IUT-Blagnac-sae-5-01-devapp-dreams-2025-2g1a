import { FileText, Hospital, HouseHeart, MapPinned, ShieldCheck, ShieldHalf } from "lucide-react";
import hero from "../assets/hero_section/accueil_public.png";
import { useEffect, useState } from "react";
import none from "../assets/none.jpg";

function PageAccueilPublic() {

  const slides = [
    {
      id: 1,
      icon: <span className="text-blue-600 text-lg">👤</span>,
      bg: "bg-blue-100",
      name: "Ancien bénéficiaire",
      subtitle: "Accueilli en 2023",
      text:
        '"Après avoir fui mon pays, j\'ai trouvé ici bien plus qu\'un toit : une famille qui m\'a accepté tel que je suis. L\'accompagnement m\'a permis de retrouver confiance en moi et en l\'avenir."',
    },
    {
      id: 2,
      icon: <span className="text-purple-600 text-lg">🌈</span>,
      bg: "bg-purple-100",
      name: "Bénéficiaire actuel",
      subtitle: "En accompagnement",
      text:
        '"Le soutien psychologique m\'a sauvé la vie. Aujourd\'hui, je revis enfin en harmonie avec mon identité. Pour la première fois, je peux être moi-même sans peur."',
    },
    {
      id: 3,
      icon: <span className="text-green-600 text-lg">💪</span>,
      bg: "bg-green-100",
      name: "Témoignage",
      subtitle: "Parcours accompli",
      text:
        '"Grâce à l\'accompagnement juridique, j\'ai pu régulariser ma situation et enfin me projeter dans l\'avenir sereinement."',
    },
    {
      id: 4,
      icon: <span className="text-pink-600 text-lg">❤️</span>,
      bg: "bg-pink-100",
      name: "Témoignage",
      subtitle: "Reconstruction",
      text:
        '"La communauté m\'a accueilli à bras ouverts. Je me sens enfin compris et soutenu dans mon parcours de vie."',
    },
  ];

  //console.log(slides);
  const [actuel, setactuel] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setactuel((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);



  return (
    <main className="bg-white text-gray-800 font-sans leading-relaxed">
      {/* ============ HERO SECTION ============ */}
      <section className="eval-hero relative overflow-hidden">
        <img
          src={hero}
          alt="Accueil du public LGBTQ+"
          className="eval-hero__img w-full h-64 md:h-72 object-cover object-center"
        />
        <div className="eval-hero__content absolute inset-0 flex items-end">
          <div className="eval-hero__card w-full max-w-6xl mx-auto mb-4 bg-white/95 rounded-2xl p-4 md:p-5 shadow-lg">
            <div className=" text-gray-500 text-xs">
              Accueil / Accueil du public LGBTQ+
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">
              Bienvenue chez DREAMS
            </h1>
            <p className="text-gray-700">
              Un espace sécurisé où chaque identité est respectée, protégée et
              célébrée. Vous êtes en sécurité ici et nous sommes là pour vous
              accompagner.
            </p>
          </div>
        </div>
      </section>


      {/* Section "Processus d'accueil à l'arrivée" */}
      <section className="max-w-5xl py-10 mx-auto px-4 relative">
        {/* Ligne pointillée courbée derrière les cartes */}
        <div className="absolute inset-0 pointer-events-none hidden md:block overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
            <path
              d="M 0,100 C 300,50 500,150 700,100 S 900,150 1000,100"
              stroke="#fbbf24"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8,6"
              strokeLinecap="round"
            />

          </svg>

          {/* Points de connexion */}
          <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow-lg"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow-lg"></div>
          <div className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow-lg"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-24 relative z-10">
          {/* Carte 1 */}
          <div className="bg-white p-6 shadow-lg border-b-4 border-l-4 border-yellow-500 overflow-hidden flex flex-col items-center cursor-pointer h-full transition-transform duration-500 hover:-rotate-5 hover:shadow-xl">
            {/* Contenu texte */}
            <div className="flex items-center justify-center mt-4 mb-4">
              <div className="text-7xl">
                <MapPinned className="text-yellow-500 w-15 h-15" />
              </div>
            </div>
            <div className="flex-1 text-center">
              <h3 className="text-xl font-bold mb-3 text-yellow-500">
                Où aller ?
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                Centres d'accueil spécialisés et associations partenaires près
                de chez vous. Nous vous guidons vers les structures adaptées à
                votre situation.
              </p>
            </div>


          </div>

          {/* Carte 2 */}
          <div className="bg-white p-6 shadow-lg border-b-4 border-l-4 border-yellow-500 overflow-hidden flex flex-col items-center cursor-pointer h-full transition-transform duration-500 hover:rotate-5 hover:shadow-xl">
            <div className="flex items-center justify-center mb-4">
              <div className="text-6xl">
                <FileText className="text-yellow-500 w-15 h-15" />
              </div>
            </div>

            {/* Contenu texte */}
            <div className="flex-1 text-center">
              <h3 className="text-xl font-bold mb-3 text-yellow-500">
                Documents nécessaires
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                Pièce d'identité, justificatifs de situation. Nous vous aidons
                si vous n'en avez pas et vous accompagnons dans les démarches
                administratives.
              </p>
            </div>
          </div>

          {/* Carte 3 */}
          <div className="bg-white p-6 shadow-lg border-b-4 border-l-4 border-yellow-500 overflow-hidden flex flex-col items-center cursor-pointer h-full transition-transform duration-500 hover:-rotate-5 hover:shadow-xl">
            {/* Contenu texte */}
            <div className="flex items-center justify-center mt-4">
              <div className="text-6xl">
                <ShieldCheck className="text-yellow-500 w-15 h-15" />
              </div>
            </div>
            <div className="flex-1 text-center">
              <h3 className="text-xl font-bold mb-3 text-yellow-500">
                Droits garantis
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                Accueil inconditionnel, respect de votre identité,
                confidentialité absolue. Vos droits fondamentaux sont protégés
                par la loi européenne.
              </p>
            </div>


          </div>
        </div>
      </section>

      {/* Section Citation Inspirante */}
      <section className="text-center py-16 bg-[#f4f1ea]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          {/* Image ou illustration */}
          <div className="lg:w-1/2">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl h-80 w-full overflow-hidden">
              <img
                src={none}
                alt="Communauté LGBTQIA+ unie et solidaire"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Citation */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <blockquote className="text-xl italic text-gray-700 leading-relaxed">
              « L'amour commence par l'acceptation de soi, et s'épanouit dans
              l'acceptation des autres. »
              <footer className="mt-4 text-lg font-semibold text-blue-600">
                —{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Harvey_Milk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-800 hover:underline transition-colors duration-200"
                >
                  Harvey Milk
                </a>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>


      {/* Section Vos droits en Europe */}
      <section className="mb-20 mt-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Vos droits en <span className="text-yellow-500">Europe</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Des protections légales qui garantissent votre sécurité et votre dignité
          </p>
        </div>

        {/* responsive --- */}
        <div className="relative mx-auto w-full max-w-[550px] aspect-square flex items-center justify-center">
          {/* Version PC*/}
          <div className="hidden lg:block absolute inset-0 rounded-full border-3 border-dashed border-yellow-400"></div>

          {/* Version mobile*/}
          <div className="flex flex-col gap-6 w-full lg:hidden">
            {/* Carte 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-400 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShieldHalf className="text-yellow-500 w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Droit à l'asile
              </h3>
              <p className="text-gray-600 text-sm">
                Protection internationale pour les personnes persécutées
              </p>
            </div>

            {/* Carte 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-400 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Hospital className="text-yellow-500 w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Accès aux soins
              </h3>
              <p className="text-gray-600 text-sm">
                Soins médicaux et soutien psychologique adaptés
              </p>
            </div>

            {/* Carte 3 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-400 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <HouseHeart className="text-yellow-500 w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Logement temporaire
              </h3>
              <p className="text-gray-600 text-sm">
                Hébergement sécurisé pendant la procédure d'asile
              </p>
            </div>
          </div>

          {/* Version PC  */}
          <div className="hidden lg:block relative w-full h-full">
            {/* Carte 1 - haut */}
            <div
              className="absolute left-1/2 top-0 transform -translate-x-1/2"
              style={{ transform: "rotate(-90deg) translateY(-210px) rotate(90deg)" }}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-400 w-64 text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <ShieldHalf className="text-yellow-500 w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Droit à l'asile
                </h3>
                <p className="text-gray-600 text-sm">
                  Protection internationale pour les personnes persécutées
                </p>
              </div>
            </div>

            {/* Carte 2 - bas gauche */}
            <div
              className="absolute left-1/6 top-1/2"
              style={{ transform: "rotate(150deg) translateY(-150px) rotate(-150deg)" }}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-400 w-64 text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Hospital className="text-yellow-500 w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Accès aux soins
                </h3>
                <p className="text-gray-600 text-sm">
                  Soins médicaux et soutien psychologique adaptés
                </p>
              </div>
            </div>

            {/* Carte 3 - bas droite */}
            <div
              className="absolute left-1/2 top-1/2"
              style={{ transform: "rotate(30deg) translateY(-210px) rotate(-30deg)" }}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-400 w-64 text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <HouseHeart className="text-yellow-500 w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Logement temporaire
                </h3>
                <p className="text-gray-600 text-sm">
                  Hébergement sécurisé pendant la procédure d'asile
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Section Slider Témoignages */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Vous n'êtes pas <span className="text-yellow-500">seul·e</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Des parcours similaires au vôtre, des vies reconstruites
          </p>
        </div>
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-lg border border-gray-100 ring-1 ring-yellow-200">
          {/* Slides container */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${actuel * 100}%)` }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="min-w-full group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 ring-1 ring-yellow-200 flex flex-col justify-center"
              >
                <div className="flex items-start mb-6">
                  <div className={`w-12 h-12 ${slide.bg} rounded-full flex items-center justify-center mr-4 ring-1 ring-yellow-200`}>
                    {slide.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{slide.name}</h4>
                    <p className="text-gray-500 text-sm">{slide.subtitle}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic text-center">{slide.text}</p>
              </div>
            ))}
          </div>

          {/* Indicateurs témoignage actuel */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setactuel(i)}
                className={`w-3 h-3 rounded-full transition-all ${i === actuel ? "bg-yellow-500 scale-125" : "bg-gray-300"
                  }`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* Section Redirection vers formulaire */}
      <section className="text-center max-w-4xl  mx-auto py-12 px-4">
        <button
          className="group relative item card rounded-xl text-center border-t-4 border-t-yellow-500 bg-white shadow-md px-5 py-3 mb-2 overflow-hidden transition-all duration-400 hover:shadow-lg"
          onClick={() => {
            window.location.href = "/contact";
          }}
        >
          <div className="absolute inset-0 bg-yellow-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] z-0"></div>
          <div className="relative z-10">
            <div className="title-content flex justify-center">
              <span className="font-bold title font-title text-gray-800 group-hover:text-white transition-colors duration-300">
                Besoin d'aide immédiate ?
              </span>
            </div>
            <div className="btn-content flex justify-center mb-3 mt-3">
              <span className="btn my-3 text-gray-600 group-hover:text-white transition-colors duration-300">
                Contactez-nous en toute confidentialité. Notre équipe est là
                pour vous écouter et vous orienter vers les solutions adaptées à
                votre situation.
              </span>
            </div>
          </div>
        </button>
      </section>






    </main>
  );
}

export default PageAccueilPublic;


