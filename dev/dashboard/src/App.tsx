import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./components/login";
import ProtectedRoute from "./components/ProtectedRoute";
import Page_antenne from "./components/pages_site/page_antenne";

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
                            <Page_antenne />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>

    )
}

export default App