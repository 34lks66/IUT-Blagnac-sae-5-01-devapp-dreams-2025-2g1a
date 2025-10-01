import Map from './Map';
import Mission from './Mission';
import About from './About';

function Home() {

  return (
    <>
    <About/>
    <Mission/>
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Explorer la carte</h2>
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
