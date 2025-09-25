import './App.css';
import Header from './components/header';
import MenuPays from './components/menu_pays';
import FooterMain from './components/Footer';
import Map from './components/Map';
import Home from './components/Home';

function App() {

  return (
    <>
    <MenuPays/>
    <Header/>
    <Home />
    <Map paysDreams={["FR", "BF", "TG", "CI", "IT"]}/>
    <FooterMain />
    </>
  )
}

export default App
