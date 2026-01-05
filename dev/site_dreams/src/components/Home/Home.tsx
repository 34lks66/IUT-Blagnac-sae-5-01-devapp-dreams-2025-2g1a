import Hero from "./Hero";
import About from "./About";
import Mission from "./Mission";
import News from "./News";
import History from "./History";
import Map from "./Map";
import Partner from "./Partner";

export default function Home() {
  return (
    <>
      {/* Section Hero */}
      <section className="mb-20">
        <Hero />
      </section>

      {/* Section About */}
      <section className="mb-24">
        <About />
      </section>

      {/* Section Mission */}
      <section className="mb-24">
        <Mission />
      </section>

      {/* Section News */}
      <section className="mb-24">
        <News />
      </section>

      {/* Section History */}
      <section className="mb-24">
        <History />
      </section>

      {/* Section Map agrandie */}
      <section className="relative py-24 bg-white">
        <div className="max-w-8xl mx-auto px-8 lg:px-12">
          {/* En-tête grande */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Zones d'Intervention
            </h2>
            <div className="w-32 h-1 bg-gray-300 mx-auto mb-8"></div>
            <p className="text-2xl text-gray-600 max-w-5xl mx-auto leading-relaxed">
              DREAMS déploie son expertise à travers l'Europe et l'Afrique.
              Explorez notre carte interactive pour découvrir l'étendue de nos
              actions et engagements.
            </p>
          </div>

          {/* Carte agrandie */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] transition-all duration-500">
            <Map paysDreams={["FR", "BF", "TG", "CI"]} />
          </div>
        </div>
      </section>

      {/* Section Partners */}
      <section className="mb-32">
        <Partner />
      </section>
    </>
  );
}
