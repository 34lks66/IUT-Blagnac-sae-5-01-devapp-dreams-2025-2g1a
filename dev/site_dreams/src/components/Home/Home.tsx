import Hero from './Hero';
import About from './About';
import Mission from './Mission';
import History from './History';
import Map from './Map';

function Home() {

  return (
    <>
    <Hero/>
    <About/>
    <Mission/>
    <History/>
    {/* <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center p-10">
                    Explorer{" "}
                    <span className="text-yellow-500">la carte</span>
    </h1> */}
    <div className="mb-6"></div>
    <div className="h-[800px] overflow-y-auto col-span-12 p-0">
      <div className="col-span-12 lg:col-span-5 bg-[#93720a] absolute z-10 py-17 max-w-2xl p-10">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">LES PAYS D'ACTION DE DREAMS</h2>
        <p className="text-white mt-5 mb-4">DREAMS est engagée en Afrique et en Europe pour vous accompagner. Découvrez notre carte interactive pour en savoir plus sur nos actions dans ces pays.</p>
      </div>
      <Map paysDreams={["FR", "BF", "TG", "CI", "IT"]}/>
    </div>
    </>
  )
}

export default Home
