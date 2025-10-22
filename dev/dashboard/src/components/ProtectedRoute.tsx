import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const [isAuth, setIsAuth] = useState<boolean | null>(null); // null = en attente
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5001/api/me", {
            credentials: "include", 
        })
            .then((res) => {
                if (res.ok) return res.json();
                throw new Error("Non autorisé");
            })
            .then(() => setIsAuth(true))
            .catch(() => setIsAuth(false))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-600">
                Vérification de la session...
            </div>
        );
    }

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
