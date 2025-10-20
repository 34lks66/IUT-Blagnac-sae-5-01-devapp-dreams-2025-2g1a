import { Globe, Heart, Users } from "lucide-react";
// import people from "../../assets/accueil_image/people.png";
import people from "../../assets/accueil_image/about_image.png"

const About: React.FC = () => {

  return (
    <section className="py-24 bg-gradient-to-br from-yellow-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Qui sommes-nous ?
          </h2> */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-16 text-center">
                    Qui{" "}
                    <span className="text-yellow-500">sommes-nous ?</span>
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
                Chez <span className="font-bold text-gray-900">DREAMS</span>, nous accompagnons les personnes en situation d'exil ou de rupture sociale, en particulier issues de minorités sexuelles, afin de les rendre autonomes et heureux.
              </p>
              <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
                Fondée en <span className="font-semibold text-yellow-500">août 2024</span>, DREAMS est une association à vocation internationale née de la volonté de répondre aux besoins des personnes issues des minorités sexuelles et de genre, en particulier celles en rupture sociale ou forcées à l'exil.
              </p>
              <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
                Son nom symbolise un profond désir <span className="font-semibold text-yellow-500">d’autonomie, d'indépendance et liberté</span>. L'association œuvre pour offrir un avenir meilleur et plus sûr aux personnes LGBTQIA+ et ou rupture sociale, tout en luttant contre les discriminations et l’intolérance.
              </p>
            </div>
            <div className="relative group">
              <img src={people} 
                   alt="groupe de personnes"
                   className="rounded-3-xl shadow-xl transform transition duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
                <Heart className="w-8 h-8 md:w-10 md:h-10 mx-auto text-yellow-500 mb-3" />
                <h3 className="text-3xl font-extrabold text-gray-900">1000+</h3>
                <p className="text-gray-600 mt-1">Personnes accompagnées</p>
              </div>

              {/* <div className="bg-white/80 backdrop-blur-sm p-4 md:p-5 rounded-xl border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-300 hover:scale-105 mt-4 md:mt-6"> */}
              <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
                <Users className="w-8 h-8 md:w-10 md:h-10 mx-auto text-yellow-500 mb-3" />
                <h3 className="text-3xl font-extrabold text-gray-900">50+</h3>
                <p className="text-gray-600 mt-1">Bénévoles engagés</p>
              </div>

              {/* <div className="bg-white/80 backdrop-blur-sm p-4 md:p-5 rounded-xl border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-300 hover:scale-105 -mt-2"> */}
              <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
                <Globe className="w-8 h-8 md:w-10 md:h-10 mx-auto text-yellow-500 mb-3" />
                <h3 className="text-3xl font-extrabold text-gray-900">5</h3>
                <p className="text-gray-600 mt-1">Pays d'intervention</p>
              </div>

              {/* <div className="bg-yellow-400 p-4 md:p-5 rounded-xl hover:bg-yellow-300 transition-all duration-300 hover:scale-105 flex items-center justify-center"> */}
              <div className="bg-yellow-400 rounded-2xl p-6 shadow-sm hover:bg-yellow-300 hover:shadow-lg transition-all">
                  <p className="text-lg font-bold text-gray-900 mb-1">Ensemble</p>
                  <p className="text-sm text-gray-800"> construisons l'avenir</p>
              </div>
          </div>
        </div>
    </section>
  )
}

export default About

