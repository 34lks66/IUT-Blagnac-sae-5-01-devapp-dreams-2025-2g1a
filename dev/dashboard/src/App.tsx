import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./components/login";
import ProtectedRoute from "./components/ProtectedRoute";
import BeneficiaireDetail from "./components/BeneficiaireDetail";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />,
                <Route path="beneficiaire/:id" element={<BeneficiaireDetail />} />
            </Routes>
        </Router>
    )
}

export default App