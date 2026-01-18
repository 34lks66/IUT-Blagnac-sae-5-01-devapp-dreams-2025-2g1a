import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import Test from "./pages/page";
import Sensi from './pages/page_sensibilisation';
import Hebergement from "./pages/page_hebergement";
import Header from "./components/header";
import FooterMain from './components/Footer';
import Home from './components/Home/Home';
import PageAccueilPublic from "./pages/page_accueil_public";
import Accompagnement from "./pages/page_accompagnement";
import Villes from "./pages_dynamiques/villes"; 
import EvaluationOrientation from "./pages/page_evaluation_orientation";
import Pays from "./pages_dynamiques/pays";
import DevenirBenevole from "./pages/devenirBenevole";
import PageAgenda from "./pages/page_agenda";
import Contact from "./components/Contact";
import Donations from "./pages/donations";
import PagePolitique from "./pages/page_politique";
import NewsDetails from "./components/Home/NewsDetails";
import Organigramme from "./pages/organigramme";

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
        <Route path="/pays/:slug" element={<Pays />} />
        <Route path="/devenir-benevole" element={<DevenirBenevole />} />
        <Route path="/donner" element={<Donations/>}/>
        <Route path="/agenda" element={<PageAgenda />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/don" element={<Donations />} />
        <Route path="/politiques-de-confidentialites" element={<PagePolitique />} />
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="/organigramme" element={<Organigramme />} />
      </Routes>
      </Router>
      <FooterMain />
    </>
    
  )
}

export default App
