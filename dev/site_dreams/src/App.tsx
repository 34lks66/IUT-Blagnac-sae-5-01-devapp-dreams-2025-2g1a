import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import Accueil from './pages/accueil';
import Sensi from './pages/sensibilisation';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/sensibilisation" element={<Sensi />} />
      </Routes>
    </Router>
    </>
    
  )
}

export default App
