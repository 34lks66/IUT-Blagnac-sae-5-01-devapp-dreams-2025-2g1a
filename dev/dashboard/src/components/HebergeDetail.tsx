import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import { apiFetch } from "../services/api";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const HebergeDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [heberge, setHeberge] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [showPdfForm, setShowPdfForm] = useState(false);
    const [notes, setNotes] = useState("");

    useEffect(() => {
        const fetchHeberge = async () => {
            try {
                const res = await apiFetch(`/api/heberge/get/${id}`);
                const data = await res.json();

                if (data && !data.error) {
                    setHeberge(data);
                } else {
                    setHeberge(null);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchHeberge();
    }, [id]);

    const handleGeneratePdf = async () => {
        if (!heberge) return;

        setLoading(true);
        setMessage("");

        try {
            const pdf = new jsPDF();
            const pageWidth = pdf.internal.pageSize.getWidth();

            pdf.setFontSize(18);
            pdf.text("Détail de l'Hébergé", 20, 20);
            pdf.setFontSize(11);

            let y = 40;
            pdf.text(`Nom: ${heberge.nom}`, 20, y); y += 10;
            pdf.text(`Prénom: ${heberge.prenom}`, 20, y); y += 10;
            pdf.text(`Téléphone: ${heberge.telephone}`, 20, y); y += 10;
            pdf.text(`Email: ${heberge.mail}`, 20, y); y += 10;

            if (heberge.benevole) {
                pdf.text(
                    `Bénévole référent: ${heberge.benevole.prenom} ${heberge.benevole.nom} (${heberge.benevole.email})`,
                    20,
                    y
                );
                y += 10;
            }

            if (notes.trim()) {
                pdf.text("Notes importantes :", 20, y);
                y += 8;
                const textWidth = pageWidth - 40;
                const wrappedText = pdf.splitTextToSize(notes, textWidth);
                pdf.text(wrappedText, 20, y);
                y += wrappedText.length * 6 + 4;
            }

            pdf.text(
                `Généré le ${new Date().toLocaleString("fr-FR")}`,
                20,
                pdf.internal.pageSize.getHeight() - 10
            );

            const blob = pdf.output("blob");
            const fileName = `heberge_${heberge._id}_${Date.now()}.pdf`;
            const form = new FormData();
            form.append("pdf", blob, fileName);

            const res = await apiFetch(`/api/heberge/${heberge._id}/pdf`, {
                method: "POST",
                body: form,
            });

            if (!res.ok) throw new Error("Upload échoué");
            const data = await res.json();
            if (data && data.heberge) {
                setHeberge(data.heberge);
                setMessage("✅ PDF généré et associé à l'hébergé");
                setNotes("");
                setShowPdfForm(false);
            } else {
                setMessage("❌ Erreur lors de l'enregistrement");
            }

            pdf.save(fileName);
        } catch (err) {
            console.error(err);
            setMessage("❌ Erreur lors de la génération/upload du PDF");
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const handleDeletePdf = async (pdfPath: string) => {
        if (!heberge) return;

        const confirmDelete = window.confirm("Supprimer ce PDF ?");
        if (!confirmDelete) return;

        try {
            const res = await apiFetch(
                `/api/heberge/${heberge._id}/pdf?file=${encodeURIComponent(pdfPath)}`,
                { method: "DELETE" }
            );

            if (!res.ok) throw new Error("Erreur lors de la suppression du PDF");
            const data = await res.json();
            if (data && data.heberge) {
                setHeberge(data.heberge);
                setMessage("✅ PDF supprimé");
            } else {
                setMessage("❌ Erreur lors de la mise à jour des données");
            }
        } catch (err) {
            console.error(err);
            setMessage("❌ Erreur lors de la suppression du PDF");
        } finally {
            setTimeout(() => setMessage(""), 3000);
        }
    };

    if (!heberge) return <p className="text-center mt-20">Chargement...</p>;

    const pdfList: string[] = Array.isArray(heberge.pdf) ? heberge.pdf : [];

    return (
        <div className="max-w-5xl mx-auto px-8 lg:px-12 py-20 space-y-8">
            <button
                onClick={() => navigate(-1)}
                className="absolute top-6 left-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg shadow text-sm font-medium"
            >
                ← Retour
            </button>

            <header>
                <h1 className="text-4xl font-bold">
                    Hébergé : {heberge.nom} {heberge.prenom}
                </h1>
                <div className="mt-3 space-y-1 text-gray-700">
                    <p><span className="font-semibold">Email :</span> {heberge.mail}</p>
                    <p><span className="font-semibold">Téléphone :</span> {heberge.telephone}</p>
                    {heberge.benevole && (
                        <p>
                            <span className="font-semibold">Bénévole référent :</span>{" "}
                            {heberge.benevole.prenom} {heberge.benevole.nom} (
                            {heberge.benevole.email})
                        </p>
                    )}
                </div>
            </header>

            {/* Section PDFs */}
            <section className="mt-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">PDF associés</h2>
                    <button
                        onClick={() => setShowPdfForm((v) => !v)}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
                    >
                        {showPdfForm ? "Annuler" : "➕ Ajouter un PDF"}
                    </button>
                </div>

                {showPdfForm && (
                    <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-3">
                        <p className="text-sm text-gray-700">
                            Le PDF contiendra automatiquement les informations principales de l'hébergé.
                            Vous pouvez ajouter des notes ou informations importantes ci-dessous.
                        </p>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Notes importantes
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="Ex : situation, besoins, remarques, suivi..."
                        />
                        <button
                            onClick={handleGeneratePdf}
                            disabled={loading}
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
                        >
                            {loading ? "Génération..." : "📄 Générer et associer le PDF"}
                        </button>
                    </div>
                )}

                {pdfList.length === 0 ? (
                    <p className="text-gray-500 text-sm">Aucun PDF associé pour le moment.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {pdfList.map((pdfPath, index) => {
                            const fileName = pdfPath.split("/").pop() || `PDF ${index + 1}`;
                            const downloadUrl = `${API_BASE}${pdfPath}`;

                            return (
                                <div
                                    key={pdfPath + index}
                                    className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm flex flex-col justify-between"
                                >
                                    <div className="flex items-center gap-3 mb-3 min-w-0">
                                        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-red-100 text-red-600 font-bold text-sm">
                                            PDF
                                        </div>
                                        <div className="flex-1 min-w-0 overflow-hidden">
                                            <p className="text-sm font-semibold truncate" title={fileName}>
                                                {fileName}
                                            </p>
                                            <p className="text-xs text-gray-500">Document associé</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mt-2">
                                        <a
                                            href={downloadUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 inline-flex items-center justify-center px-3 py-1.5 text-xs rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                                        >
                                            📥 Télécharger
                                        </a>
                                        <button
                                            onClick={() => handleDeletePdf(pdfPath)}
                                            className="flex-1 inline-flex items-center justify-center px-3 py-1.5 text-xs rounded-lg border border-red-300 text-red-600 hover:bg-red-50"
                                        >
                                            🗑 Supprimer
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {message && <div className="mt-4 text-sm">{message}</div>}
            </section>
        </div>
    );
};

export default HebergeDetail;
