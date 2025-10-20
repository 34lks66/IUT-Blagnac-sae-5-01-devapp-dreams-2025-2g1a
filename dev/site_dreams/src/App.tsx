import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import Test from "./pages/page";
import Sensi from './pages/sensibilisation';
import Hebergement from "./pages/Hebergement";
import Header from "./components/header";
import FooterMain from './components/Footer';
import Home from './components/Home/Home';
import PageAccueilPublic from "./pages/page_accueil_public";
import Accompagnement from "./pages/accompagnement";
import Villes from "./pages_dynamiques/villes"; 
import EvaluationOrientation from "./pages/EvaluationOrientation";
import Pays from "./pages/pays";
import DevenirBenevole from "./pages/devenirBenevole";
import PageAgenda from "./pages/page_agenda";
import Contact from "./components/Contact";

function App() {

  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accueil" element={<Home />} />
        <Route path="/accueil_public" element={<PageAccueilPublic />} />
        <Route path="/test" element={<Test />} />
        <Route path="/hebergement" element={<Hebergement />} />
        <Route path="/sensibilisation" element={<Sensi />} />
        <Route path="/accompagnement" element={<Accompagnement />} />
        <Route path="/villes/:nom" element={<Villes />} />
        <Route path="/evaluation" element={<EvaluationOrientation />} />
        <Route path="/pays" element={<Pays />} />
        <Route path="/devenir-benevole" element={<DevenirBenevole />} />
        <Route path="/agenda" element={<PageAgenda />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
    <FooterMain />
    </>
    
  )
}

export default App
