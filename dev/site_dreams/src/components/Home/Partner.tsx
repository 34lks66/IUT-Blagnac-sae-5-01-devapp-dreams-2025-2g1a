import { motion } from "framer-motion";
import actup from "../../assets/partenaire/act-up.jpeg";
import enipse from "../../assets/partenaire/enipse.jpg";
import jeko from "../../assets/partenaire/jeko.jpg";
import rester from "../../assets/partenaire/rester.jpg";

const partners = [
  { name: "Alda", logo: "/images/alda.jpg" },
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

        {/* Infinite Scroll Container */}
        <div className="relative w-full overflow-hidden mask-gradient-x">
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

          <motion.div
            className="flex gap-16 w-max"
            animate={{ x: "-50%" }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 20
            }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 shadow-md p-8 flex justify-center items-center group min-w-[200px] h-[160px] hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={partner.logo}
                  alt={`Logo ${partner.name}`}
                  className="h-20 w-auto object-contain opacity-70 group-hover:opacity-100 transition duration-300 filter grayscale group-hover:grayscale-0"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Partner;
