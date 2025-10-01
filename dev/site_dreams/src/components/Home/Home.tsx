import Map from './Map';
import Mission from './Mission';

function Home() {

  return (
    <>
    <Mission/>
    <Map paysDreams={["FR", "BF", "TG", "CI", "IT"]}/>
    </>
  )
}

export default Home
