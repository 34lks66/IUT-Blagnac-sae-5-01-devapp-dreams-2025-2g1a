import alda from "../../assets/partenaire/alda.png"
import actup from "../../assets/partenaire/act-up.jpeg"
import enipse from "../../assets/partenaire/enipse.jpg"
import jeko from "../../assets/partenaire/jeko.jpg"
import rester from "../../assets/partenaire/rester.jpg"

const partners = [
    { name: "Alda", logo: alda },
    { name: "Act-up", logo: actup },
    { name: "Enipse", logo: enipse },
    { name: "Jeko", logo: jeko },
    { name: "Rester", logo: rester },
]

const Partner: React.FC = () => {

  return (
    <section className="py-20 bg-gradient-to-b from-white to-yellow-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-16 text-center">
                    Nous remercions nos partenaires{" "}
                    <span className="text-yellow-500">d'avoir rendu cette aventure possible !</span>
          </h1>

          <div className="overflow-x-auto">
            <div className="flex md:grid md:grid-cols-5 gap-8 justify-center items-center min-w-max md:min-w-0">
                {partners.map((partner, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 md:flex-shrink bg-white/60 backdrup-blur-sm rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 p-6 flex justify-center items-center"
                    >
                        <img src={partner.logo} alt={partner.name} className="h-16 w-auto object-contain hover:grayscale transition duration-300" />
                    </div>
                ))}
            </div>
          </div>
        </div>

    </section>
  )
}

export default Partner
