import { useEffect, useState } from "react"
import { apiFetch } from "../services/api";
import Beneficiaires from "./Beneficiaires";
import Heberges from "./Heberges";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
    const [pdfFiles, setPdfFiles] = useState<File[]>([]);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [poleFiles, setPoleFiles] = useState<string[]>([]);

    const fetchCurrentUser = async () => {
        try {
            const response = await apiFetch("/api/me", { method: "GET" });
            if (response.ok) {
                const data = await response.json();
                setCurrentUser(data.user);
                console.log("Utilisateur connecté :", data.user);
                // Charger les PDFs du pôle
                fetchPolePDFs(data.user.pole, data.user.pays);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur :", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPolePDFs = async (pole: string, pays: string) => {
        try {
            const response = await apiFetch(`/api/pole-pdfs/${pays}/${pole}`, { method: "GET" });
            if (response.ok) {
                const data = await response.json();
                setPoleFiles(data.files || []);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des PDFs du pôle :", error);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, [])

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPdfFiles(Array.from(e.target.files));
        }
    };

    const handleUploadPDFs = async () => {
        if (!pdfFiles.length || !currentUser) {
            setMessage("⚠️ Veuillez sélectionner au moins un PDF");
            return;
        }

        setUploadLoading(true);
        setMessage("");

        try {
            const formData = new FormData();
            pdfFiles.forEach((file) => {
                formData.append("pdfs", file);
            });

            const response = await apiFetch(`/api/upload-pole-pdfs/${currentUser.pays}/${currentUser.pole}`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setPoleFiles(data.files || []);
                setPdfFiles([]);
                setMessage(`✅ ${pdfFiles.length} PDF(s) uploadé(s) avec succès`);
                // Réinitialiser l'input file
                const fileInput = document.getElementById("pdf-input") as HTMLInputElement;
                if (fileInput) fileInput.value = "";
            } else {
                setMessage("❌ Erreur lors de l'upload");
            }
        } catch (error) {
            console.error("Erreur lors de l'upload :", error);
            setMessage("❌ Erreur lors de l'upload des PDFs");
        } finally {
            setUploadLoading(false);
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const handleDeletePDF = async (fileName: string) => {
        if (!currentUser) return;

        const confirmDelete = window.confirm(`Supprimer "${fileName}" ?`);
        if (!confirmDelete) return;

        try {
            const response = await apiFetch(
                `/api/delete-pole-pdf/${currentUser.pays}/${currentUser.pole}?file=${encodeURIComponent(fileName)}`,
                { method: "DELETE" }
            );

            if (response.ok) {
                const data = await response.json();
                setPoleFiles(data.files || []);
                setMessage("✅ PDF supprimé");
            } else {
                setMessage("❌ Erreur lors de la suppression");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
            setMessage("❌ Erreur lors de la suppression");
        } finally {
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const pole = currentUser?.pole;

    return (
        <>
            {loading ? (
                <p>Chargement...</p>
            ) : currentUser ? (
                <>
                    {/* Section gestion PDFs du pôle */}
                    <div className="mb-8 p-6 bg-white rounded-lg shadow">
                        <h2 className="text-2xl font-semibold mb-4">📄 Gestion des PDFs du pôle "{pole}"</h2>

                        {/* Formulaire d'upload */}
                        <div className="mb-6 p-4 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Sélectionner et déposer des PDFs
                            </label>
                            <input
                                id="pdf-input"
                                type="file"
                                multiple
                                accept=".pdf"
                                onChange={handleFileSelect}
                                className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                            />
                            {pdfFiles.length > 0 && (
                                <div className="mt-3 p-3 bg-white rounded border border-blue-200">
                                    <p className="text-sm font-medium mb-2">{pdfFiles.length} fichier(s) sélectionné(s):</p>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                        {pdfFiles.map((file, idx) => (
                                            <li key={idx}>• {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <button
                                onClick={handleUploadPDFs}
                                disabled={uploadLoading || pdfFiles.length === 0}
                                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                            >
                                {uploadLoading ? "Upload en cours..." : "📤 Uploader les PDFs"}
                            </button>
                        </div>

                        {/* Messages */}
                        {message && (
                            <div className={`mb-4 p-3 rounded ${message.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                {message}
                            </div>
                        )}

                        {/* Liste des PDFs du pôle */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3">PDFs disponibles</h3>
                            {poleFiles.length === 0 ? (
                                <p className="text-gray-500 text-sm">Aucun PDF pour le moment. Uploadez-en un!</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {poleFiles.map((fileName, idx) => {
                                        const downloadUrl = `${API_BASE}/pdf/${currentUser.pays}/${pole}/${fileName}`;
                                        return (
                                            <div
                                                key={idx}
                                                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm flex flex-col justify-between hover:shadow-md transition"
                                            >
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-100 text-red-600 font-bold text-sm">
                                                        PDF
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-semibold truncate" title={fileName}>
                                                            {fileName}
                                                        </p>
                                                        <p className="text-xs text-gray-500">Document du pôle</p>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2 mt-auto">
                                                    <a
                                                        href={downloadUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-1 inline-flex items-center justify-center px-3 py-2 text-xs rounded-lg border border-blue-300 text-blue-600 hover:bg-blue-50 font-medium transition"
                                                    >
                                                        📥 Télécharger
                                                    </a>
                                                    <button
                                                        onClick={() => handleDeletePDF(fileName)}
                                                        className="flex-1 inline-flex items-center justify-center px-3 py-2 text-xs rounded-lg border border-red-300 text-red-600 hover:bg-red-50 font-medium transition"
                                                    >
                                                        🗑 Supprimer
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {pole === "permanence" && (
                        <div className="mt-8">
                            <Beneficiaires />
                        </div>
                    )}
                    {pole === "hebergement" && (
                        <div className="mt-8">
                            <Heberges />
                        </div>
                    )}
                </>
            ) : (
                <p>Utilisateur non trouvé</p>
            )}
        </>
    )
}

export default OutilGestion

