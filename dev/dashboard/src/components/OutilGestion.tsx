import { useEffect, useState } from "react"
import { apiFetch } from "../services/api";
import Beneficiaires from "./Beneficiaires";

function OutilGestion() {

    const slugify = (str: string | undefined) => {
        if (!str) return "";
        return str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");
    };

    interface User {
        _id?: string;
        nom: string;
        prenom: string;
        email: string;
        telephone: string;
        pays: string;
        statut: string;
        pole: string;
    }

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchCurrentUser = async () => {
        try {
            const response = await apiFetch("/api/me", { method: "GET" });
            const data = await response.json();
            setCurrentUser(data.user);
            console.log("Utilisateur connecté :", data.user);
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur :", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, [])

    const pole = currentUser?.pole;


    return (
        <>
            <h1>Outil de Gestion</h1>
            {loading ? (
                <p>Chargement...</p>
            ) : currentUser ? (
                <>
                    <div>
                        <h2>Informations de l'utilisateur connecté</h2>
                        <p><strong>Nom:</strong> {currentUser.nom}</p>
                        <p><strong>Prénom:</strong> {currentUser.prenom}</p>
                        <p><strong>Email:</strong> {currentUser.email}</p>
                        <p><strong>Téléphone:</strong> {currentUser.telephone}</p>
                        <p><strong>Pays:</strong> {currentUser.pays}</p>
                        <p><strong>Statut:</strong> {currentUser.statut}</p>
                        <p><strong>Pôle:</strong> {currentUser.pole}</p>
                    </div>
                    {pole === "permanence" && (
                        <Beneficiaires />
                    )}
                </>
            ) : (
                <p>Utilisateur non trouvé</p>
            )}
        </>
    )
}

export default OutilGestion

