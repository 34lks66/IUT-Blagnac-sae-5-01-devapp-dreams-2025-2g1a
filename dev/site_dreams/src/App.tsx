import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import Test from "./pages/page";
import Sensi from './pages/sensibilisation';
import Hebergement from "./pages/Hebergement";
import Header from "./components/header";
import MenuPays from './components/menu_pays';
import FooterMain from './components/Footer';
import Home from './components/Home/Home';
import PageAccueilPublic from "./pages/page_accueil_public";
import Accompagnement from "./pages/accompagnement";
import EvaluationOrientation from "./pages/EvaluationOrientation";

function App() {

  return (
    <>
    <MenuPays/>
    <Header/>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accueil" element={<Home />} />
        <Route path="/accueil_public" element={<PageAccueilPublic />} />
        <Route path="/test" element={<Test />} />
        <Route path="/hebergement" element={<Hebergement />} />
        <Route path="/sensibilisation" element={<Sensi />} />
        <Route path="/accompagnement" element={<Accompagnement />} />
        <Route path="/evaluation-orientation" element={<EvaluationOrientation />} />
      </Routes>
    </Router>
    <FooterMain />
    </>
    
  )
}

export default App
