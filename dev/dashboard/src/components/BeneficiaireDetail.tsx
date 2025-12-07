import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from 'jspdf';
import { apiFetch } from '../services/api';

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const BeneficiaireDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [beneficiaire, setBeneficiaire] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBeneficiaire = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/beneficiaire/get/${id}`);
        const data = await res.json();

        if (data && !data.error) {
          setBeneficiaire(data);
        } else {
          setBeneficiaire(null);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchBeneficiaire();
  }, [id]);

  if (!beneficiaire) return <p className="text-center mt-20">Chargement...</p>;

  return (
    <div className="max-w-5xl mx-auto px-8 lg:px-12 py-20">
      <button
        onClick={() => navigate(-1)} // revient à la page précédente
        className="absolute top-6 left-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg shadow text-sm font-medium"
      >
        ← Retour
      </button>
      <h1 className="text-4xl font-bold">Bénéficiaire : {beneficiaire.nom} {beneficiaire.prenom}</h1>

      <div className="mt-4">
        <button
          onClick={async () => {
            // Générer et uploader le PDF
            setLoading(true);
            setMessage('');
            try {
              const pdf = new jsPDF();
              pdf.setFontSize(18);
              pdf.text('Détail du Bénéficiaire', 20, 20);
              pdf.setFontSize(11);
              let y = 40;
              pdf.text(`Nom: ${beneficiaire.nom}`, 20, y); y += 10;
              pdf.text(`Prénom: ${beneficiaire.prenom}`, 20, y); y += 10;
              pdf.text(`Téléphone: ${beneficiaire.telephone}`, 20, y); y += 10;
              pdf.text(`Email: ${beneficiaire.mail}`, 20, y); y += 10;
              pdf.text(`Généré le ${new Date().toLocaleString('fr-FR')}`, 20, pdf.internal.pageSize.getHeight() - 10);

              const blob = pdf.output('blob');
              const fileName = `beneficiaire_${beneficiaire._id}_${Date.now()}.pdf`;
              const form = new FormData();
              form.append('pdf', blob, fileName);

              const res = await apiFetch(`/api/beneficiaire/${beneficiaire._id}/pdf`, {
                method: 'POST',
                body: form,
              });

              if (!res.ok) throw new Error('Upload échoué');
              const data = await res.json();
              if (data && data.beneficiaire) {
                setBeneficiaire(data.beneficiaire);
                setMessage('✅ PDF généré et associé au bénéficiaire');
              } else {
                setMessage('❌ Erreur lors de l\'enregistrement');
              }
              // proposer le téléchargement local
              pdf.save(fileName);
            } catch (err) {
              console.error(err);
              setMessage('❌ Erreur lors de la génération/upload du PDF');
            } finally {
              setLoading(false);
              setTimeout(() => setMessage(''), 3000);
            }
          }}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {loading ? 'Génération...' : '📄 Générer et associer un PDF'}
        </button>

        {message && <div className="mt-3 text-sm">{message}</div>}
      </div>
    </div>
  );
};

export default BeneficiaireDetail;