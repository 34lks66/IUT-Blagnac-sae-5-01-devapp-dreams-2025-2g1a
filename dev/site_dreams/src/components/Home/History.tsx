import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const Histoire: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.5"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const timeline = [
    {
      year: '2020',
      title: 'Respect My Choice',
      description: 'Création d\'un groupe WhatsApp pour offrir un lieu d\'entraide et de discussion aux personnes LGBTQIA+ et leurs alliés.',
    },
    {
      year: '2021',
      title: 'Afric\'Free',
      description: 'Face aux profils malveillants, naissance d\'une communauté sécurisée pour protéger les membres et garantir un espace bienveillant.',
    },
    {
      year: '2024',
      title: 'DREAMS',
      description: 'Officialisation sous le nom DREAMS pour affirmer notre vision : autonomie, indépendance et liberté.',
    },
  ];

  return (
    <div className="bg-[#f8f9fa] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-100/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 relative z-10">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-28"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Notre Histoire
          </h2>
          <div className="w-32 h-1 bg-gray-300 mx-auto mb-8"></div>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            De la simple entraide à une organisation structurée, découvrez les jalons qui ont forgé notre identité.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative" ref={containerRef}>

          {/* Vertical Lines */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-[2px] bg-gray-200/60 rounded-full"></div>
          <motion.div
            style={{ scaleY }}
            className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-[3px] bg-gradient-to-b from-yellow-400 via-amber-500 to-yellow-600 origin-top shadow-[0_0_15px_rgba(251,191,36,0.6)] rounded-full z-10"
          ></motion.div>

          <div className="space-y-24 md:space-y-32 pb-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center w-full ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Content Card */}
                <div className={`pl-12 md:pl-0 w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-20 md:text-right' : 'md:pl-20 md:text-left'
                  }`}>
                  <div className="group bg-white p-8 md:p-10 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] hover:border-yellow-200/50 transition-all duration-500 relative overflow-hidden">
                    <div className={`absolute top-0 h-1 bg-gradient-to-r from-yellow-400 to-amber-600 transition-all duration-500 ${index % 2 === 0 ? 'right-0 w-24 group-hover:w-full' : 'left-0 w-24 group-hover:w-full'
                      }`}></div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Center Node / Year Badge */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                  <motion.div
                    whileInView={{ scale: [0.8, 1.2, 1] }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="bg-white p-1 rounded-full shadow-lg border border-gray-100">
                      <div className="bg-gradient-to-br from-yellow-400 to-amber-600 text-white text-sm font-bold py-1.5 px-4 rounded-full shadow-md whitespace-nowrap min-w-[80px] text-center">
                        {item.year}
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="w-full md:w-1/2 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-40 text-center relative max-w-4xl mx-auto"
        >
          <div className="w-32 h-1 bg-gray-300 mx-auto mb-10"></div>

          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10 leading-tight">
            Une Vision d'Avenir
          </h3>

          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
            Chez DREAMS, nous croyons en la <span className="font-semibold text-gray-900">autonomie</span>,
            l'<span className="font-semibold text-gray-900">indépendance</span> et
            l'<span className="font-semibold text-gray-900">liberté</span>.
            <br className="hidden md:block" />
            <span className="mt-4 block text-gray-500">
              Nous avançons chaque jour pour transformer ces idéaux en réalité pour tous.
            </span>
          </p>

          <div className="mt-16 text-gray-400 text-sm font-bold tracking-[0.2em] uppercase">
            — L'Équipe DREAMS
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Histoire;