import alda from "../../assets/partenaire/alda.png";
import actup from "../../assets/partenaire/act-up.jpeg";
import enipse from "../../assets/partenaire/enipse.jpg";
import jeko from "../../assets/partenaire/jeko.jpg";
import rester from "../../assets/partenaire/rester.jpg";

const partners = [
  { name: "Alda", logo: alda },
  { name: "Act-up", logo: actup },
  { name: "Enipse", logo: enipse },
  { name: "Jeko", logo: jeko },
  { name: "Rester", logo: rester },
];

const Partner: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-8xl mx-auto px-8 lg:px-12">
        {/* Titre grand et imposant */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Nos Partenaires
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Nous remercions nos partenaires pour leur précieuse collaboration et
            leur engagement à nos côtés.
          </p>
        </div>

        {/* Grille des logos agrandie */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 md:gap-12">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-2xl hover:border-gray-300 transition-all duration-300 p-10 flex justify-center items-center group"
            >
              <img
                src={partner.logo}
                alt={`Logo ${partner.name}`}
                className="h-24 w-auto object-contain opacity-80 group-hover:opacity-100 transition duration-300 filter grayscale group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partner;
