import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import people from "../../assets/accueil_image/about_image.png";

// --- Configuration des données ---
const CHART_DATA = [
  { name: 'Personnes accompagnées', value: 200 },
  { name: 'Bénévoles engagés', value: 100 },
  { name: "Pays d'intervention", value: 4 },
];

const COLORS = ['#111827', '#4b5563', '#ca8a04']; // Anthracite, Gris, Doré

// --- Composant Compteur Animé ---
const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useSpring(0, { damping: 40, stiffness: 100 });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  const displayValue = useTransform(motionValue, (latest) => Math.round(latest));

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <motion.span>{displayValue}</motion.span>
      <span>{suffix}</span>
    </span>
  );
};

const About: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">

        {/* 1. En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Notre Mission</h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">Accompagner vers l'autonomie et la liberté</p>
        </motion.div>

        {/* 2. Présentation (Texte + Image) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-xl text-gray-700 leading-relaxed"
          >
            <p><span className="font-semibold text-gray-900 notranslate" translate="no">DREAMS</span> accompagne les personnes en situation d'exil ou de rupture sociale vers l'autonomie.</p>
            <p>Fondée en <span className="font-medium text-gray-900">2024</span>, notre association répond aux besoins des personnes LGBTQIA+.</p>
            <p>Notre nom incarne l'autonomie, l'indépendance et la liberté.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img src={people} alt="Équipe DREAMS" className="rounded-2xl shadow-md border border-gray-200 notranslate" translate="no" />
          </motion.div>
        </div>

        {/* 3. Chiffres Clés */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="mt-20 grid grid-cols-3 gap-6 text-center"
        >
          {[
            { val: 200, suf: "+", label: "Personnes accompagnées" },
            { val: 100, suf: "+", label: "Bénévoles engagés" },
            { val: 4, suf: "", label: "Pays d'intervention" }
          ].map((item, i) => (
            <motion.div key={i} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="p-6">
              <h3 className="text-5xl font-bold text-gray-900 mb-2 flex justify-center items-baseline">
                <Counter value={item.val} suffix={item.suf} />
              </h3>
              <p className="text-gray-600 font-medium">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 4. Diagramme de pourcentage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 h-[450px] w-full bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm"
        >
          <h4 className="text-center text-gray-500 uppercase tracking-widest text-sm font-bold mb-4">Répartition de l'impact</h4>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={CHART_DATA}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={8}
                dataKey="value"
                animationDuration={1800}
                // Affiche uniquement le % sur le diagramme
                label={({ percent }) => percent ? `${(percent * 100).toFixed(0)}%` : ""}              >
                {CHART_DATA.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
};

export default About;