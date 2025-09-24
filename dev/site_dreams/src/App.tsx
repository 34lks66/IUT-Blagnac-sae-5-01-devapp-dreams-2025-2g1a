import './App.css';
import Header from './components/header';
import MenuPays from './components/menu_pays';
import FooterMain from './components/Footer';
import Map from './components/Map';

function App() {

  return (
    <>
    <MenuPays/>
    <Header/>
    <Map paysDreams={["FR", "BF", "TG", "CI", "IT"]}/>
    <FooterMain />
    </>
  )
}

export default App
