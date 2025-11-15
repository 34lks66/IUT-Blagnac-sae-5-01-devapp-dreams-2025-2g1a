import { Globe, Heart, Users } from "lucide-react";
import people from "../../assets/accueil_image/about_image.png"

const About: React.FC = () => {
  return (
    <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          {/* En-tête minimaliste */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
              Notre Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Accompagner vers l'autonomie et la liberté
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-xl text-gray-700 leading-relaxed">
                <span className="font-semibold text-gray-900">DREAMS</span> accompagne les personnes en situation d'exil ou de rupture sociale, particulièrement issues de minorités sexuelles, vers l'autonomie et l'épanouissement.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                Fondée en <span className="font-medium text-gray-900">2024</span>, notre association internationale répond aux besoins des personnes LGBTQIA+ confrontées à la rupture sociale ou à l'exil forcé.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                Notre nom incarne les valeurs fondamentales d'<span className="font-medium text-gray-900">autonomie, d'indépendance et de liberté</span> qui guident chacune de nos actions.
              </p>
            </div>

            <div className="relative">
              <img 
                src={people} 
                alt="Équipe et bénéficiaires DREAMS"
                className="rounded-2xl shadow-md border border-gray-200" 
              />
            </div>
          </div>

          {/* Chiffres clés épurés */}
          <div className="mt-20 grid grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <h3 className="text-5xl font-bold text-gray-900 mb-2">1000+</h3>
              <p className="text-gray-600">Personnes accompagnées</p>
            </div>
            <div className="p-6">
              <h3 className="text-5xl font-bold text-gray-900 mb-2">50+</h3>
              <p className="text-gray-600">Bénévoles engagés</p>
            </div>
            <div className="p-6">
              <h3 className="text-5xl font-bold text-gray-900 mb-2">5</h3>
              <p className="text-gray-600">Pays d'intervention</p>
            </div>
          </div>
        </div>
    </section>
  )
}

export default About