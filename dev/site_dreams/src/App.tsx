import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import Home from "./pages/Home";
import Test from "./pages/page";
import Sensi from './pages/sensibilisation';
import Hebergement from "./pages/Hebergement";
import Header from "./components/header";
import MenuPays from './components/menu_pays';
import FooterMain from './components/Footer';
import Home from './components/Home/Home';

function App() {

  return (
    <>
    <MenuPays/>
    <Header/>
    <Home />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accueil" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/hebergement" element={<Hebergement />} />
        <Route path="/sensibilisation" element={<Sensi />} />
      </Routes>
    </Router>
    <FooterMain />
    </>
    
  )
}

export default App
