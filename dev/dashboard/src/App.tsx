import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./components/login";
import ProtectedRoute from "./components/ProtectedRoute";
import BeneficiaireDetail from "./components/BeneficiaireDetail";
import OutilGestion from "./components/OutilGestion";
import { AuthProvider } from "./components/context/AuthContext";

function App() {

    return (
        <Router basename="/admin">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <AuthProvider>
                                <Dashboard />
                            </AuthProvider>
                        </ProtectedRoute>
                    }
                />,
                <Route path="beneficiaire/:id" element={<BeneficiaireDetail />} />
                <Route path="outil-gestion/:pole" element={<OutilGestion />} />
            </Routes>
        </Router>
    )
}

export default App