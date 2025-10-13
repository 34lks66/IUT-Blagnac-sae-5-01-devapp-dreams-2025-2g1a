import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import Test from "./pages/page";
import Sensi from './pages/Sensibilisation';
import Hebergement from "./pages/Hebergement";
import Header from "./components/Header";
import MenuPays from './components/Menu_Pays';
import FooterMain from './components/Footer';
import Home from './components/Home/Home';
import PageAccueilPublic from "./pages/Page_Accueil_Public";
import Accompagnement from "./pages/Accompagnement";
import EvaluationOrientation from "./pages/EvaluationOrientation";

function App() {

  return (
    <>
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
        <Route path="/evaluation" element={<EvaluationOrientation />} />
      </Routes>
    </Router>
    <FooterMain />
    </>
    
  )
}

export default App
