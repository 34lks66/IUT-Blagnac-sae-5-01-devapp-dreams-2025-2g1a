import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import people from "../../assets/accueil_image/about_image.png"

const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useSpring(0, {
    damping: 40,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  const displayValue = useTransform(motionValue, (latest) => Math.round(latest));

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <motion.span>{displayValue}</motion.span>
      <span>{suffix}</span>
    </span>
  );
}

const About: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* En-tête minimaliste */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            Notre Mission
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Accompagner vers l'autonomie et la liberté
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-xl text-gray-700 leading-relaxed">
              <span className="font-semibold text-gray-900">DREAMS</span> accompagne les personnes en situation d'exil ou de rupture sociale, particulièrement issues de minorités sexuelles, vers l'autonomie et l'épanouissement.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Fondée en <span className="font-medium text-gray-900">2024</span>, notre association internationale répond aux besoins des personnes LGBTQIA+ confrontées à la rupture sociale ou à l'exil forcé.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Notre nom incarne les valeurs fondamentales d'<span className="font-medium text-gray-900">autonomie, d'indépendance et de liberté</span> qui guident chacune de nos actions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <img
              src={people}
              alt="Équipe et bénéficiaires DREAMS"
              className="rounded-2xl shadow-md border border-gray-200"
            />
          </motion.div>
        </div>

        {/* Chiffres clés épurés */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
          className="mt-20 grid grid-cols-3 gap-6 text-center"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="p-6"
          >
            <h3 className="text-5xl font-bold text-gray-900 mb-2 flex justify-center items-baseline">
              <Counter value={1000} suffix="+" />
            </h3>
            <p className="text-gray-600">Personnes accompagnées</p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="p-6"
          >
            <h3 className="text-5xl font-bold text-gray-900 mb-2 flex justify-center items-baseline">
              <Counter value={50} suffix="+" />
            </h3>
            <p className="text-gray-600">Bénévoles engagés</p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="p-6"
          >
            <h3 className="text-5xl font-bold text-gray-900 mb-2 flex justify-center items-baseline">
              <Counter value={5} />
            </h3>
            <p className="text-gray-600">Pays d'intervention</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About