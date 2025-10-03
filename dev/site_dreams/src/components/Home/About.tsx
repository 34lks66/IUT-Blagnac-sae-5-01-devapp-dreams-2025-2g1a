import { Globe, Heart, Users } from "lucide-react";
import people from "../../assets/people.png";

const About: React.FC = () => {

  return (
    <section id="missions" className="py-20 bg-gradient-to-br from-gray-60 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-6">
          {/* <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Qui sommes-nous ?
          </h2> */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center">
                    Qui{" "}
                    <span className="text-yellow-500">sommes-nous ?</span>
              </h1>
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-12 items-center mb-12">
            <div className="space-y-6">
              <p className="text-lg font-semibold text-gray-900">Chez DREAMS, nous accompagnons les personnes en situation d'exil ou de rupture sociale, en particulier issues de minorités sexuelles, afin de les rendre autonomes et heureux.</p>
            </div>
            <img src={people} alt="people" />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-12 items-center mb-12">
          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 max-w-md mx-auto lg:mx-0">
              <div className="bg-white/80 backdrop-blur-sm p-4 md:p-5 rounded-xl border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-300 hover:scale-105">
                <Heart className="w-8 h-8 md:w-10 md:h-10 text-yellow-500 mb-2" />
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">1000+</h3>
                <p className="text-gray-600 text-xs md:text-sm">Personnes accompagnées</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 md:p-5 rounded-xl border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-300 hover:scale-105 mt-4 md:mt-6">
                <Users className="w-8 h-8 md:w-10 md:h-10 text-yellow-500 mb-2" />
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">50+</h3>
                <p className="text-gray-600 text-xs md:text-sm">Bénévoles engagés</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 md:p-5 rounded-xl border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-300 hover:scale-105 -mt-2">
                <Globe className="w-8 h-8 md:w-10 md:h-10 text-yellow-500 mb-2" />
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">5</h3>
                <p className="text-gray-600 text-xs md:text-sm">Pays d'intervention</p>
              </div>

              <div className="bg-yellow-400 p-4 md:p-5 rounded-xl hover:bg-yellow-300 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-900 font-bold text-sm md:text-base mb-1">Ensemble</p>
                  <p className="text-gray-800 text-xs md:text-sm">construisons l'avenir</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">Fondée en août 2024, DREAMS est une association à vocation internationale née de la volonté de répondre aux besoins des personnes issues des minorités sexuelles et de genre, en particulier celles en rupture sociale ou forcées à l'exil. Son nom symbolise un profond désir d’autonomie, indépendance et liberté. L'association œuvre pour offrir un avenir meilleur et plus sûr aux personnes LGBTQIA+ et ou rupture sociale, tout en luttant contre les discriminations et l’intolérance.</p>
            </div>
        </div>
    </section>
  )
}

export default About

