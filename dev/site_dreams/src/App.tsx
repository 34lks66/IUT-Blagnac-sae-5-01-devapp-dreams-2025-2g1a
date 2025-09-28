import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import Home from "./pages/Home";
import Test from "./pages/page";

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accueil" element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
