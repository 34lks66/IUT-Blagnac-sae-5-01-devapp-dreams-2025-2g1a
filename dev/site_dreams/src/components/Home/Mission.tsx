import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import accueil from "../../assets/hero_section/accueil_public.png";
import orientation from "../../assets/hero_section/evaluation_orientation.png";
import hebergement from "../../assets/hero_section/hebergement.jpg";
import accompagement from "../../assets/hero_section/accompagnement.png";
import sensibilisation from "../../assets/hero_section/sensibilisation.png";

const Mission: React.FC = () => {

  const navigate = useNavigate();

  const missions = [
    {
      image: accueil,
      title: 'Accueil',
      description: 'DREAMS vous accueille dans son espace sécurisé afin de vous accompagner.',
      href: '/accueil_public',
    },
    {
      image: orientation,
      title: 'Orientation',
      description: 'DREAMS vous propose un accompagnement personnalisé pour chaque personne.',
      href: '/orientation',
    },
    {
      image: hebergement,
      title: 'Hébergement',
      description: 'Nous vous offrons un refuge sûr et bienveillant avec notre système d’hébergement solidaire.',
      href: '/hebergement',
    },
    {
      image: accompagement,
      title: 'Accompagnement',
      description: 'Nous sommes là pour vous accompagner pour toutes vos démarches.',
      href: '/accompagnement',
    },
    {
      image: sensibilisation,
      title: 'Sensibilisation',
      description: 'Découvrez nos actions de sensibilisations menés par DREAMS',
      href: '/sensibilisation',
    }
  ];

  const handleClick = (href: string) => {
    navigate(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        stiffness: 50,
        damping: 20
      }
    }
  };

  return (
    <div id="missions" className="mx-3 mb-20 perspective-1000">
      <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-10">Plusieurs types d’interventions sont proposés par notre association : </p>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
      >
        {missions.map((mission, index) => (
          <motion.article
            key={index}
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              rotateY: 10,
              zIndex: 10,
              transition: { duration: 0.3 }
            }}
            className="grid place-items-center max-w-[21.875rem] h-[25rem] mx-auto overflow-hidden rounded-[0.625rem] shadow-md cursor-pointer bg-white"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative w-full h-full">
              <img
                className="object-cover w-full h-full bg-gray-200"
                src={mission.image || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80"}
                alt={`Illustration de la mission ${mission.title}`}
              />

              <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-transparent via-black/50 to-black px-5 pb-6 pt-40">
                <h2 className="relative text-xl font-bold text-white leading-tight w-fit after:content-[''] after:absolute after:h-1 after:w-[calc(100%+1.25rem)] after:bottom-[-0.5rem] after:left-[-1.25rem] after:bg-yellow-500">
                  {mission.title}
                </h2>

                <div>
                  <p className="mt-6 text-white text-sm leading-relaxed">
                    {mission.description}
                  </p>

                  <button
                    onClick={() => handleClick(mission.href)}
                    className="mt-6 w-fit px-6 py-3 font-bold text-base text-white bg-yellow-500 rounded-lg transition-all duration-200 hover:from-yellow-700 hover:to-yellow-900 hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-105 focus:outline-2 focus:outline-white"
                  >
                    En savoir plus
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
};

export default Mission;