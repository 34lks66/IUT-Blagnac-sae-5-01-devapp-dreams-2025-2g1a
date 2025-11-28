import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const BeneficiaireDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [beneficiaire, setBeneficiaire] = useState<any>(null);

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

      <div className="mt-6 bg-white shadow p-6 rounded-lg">
        <p><strong>Nom :</strong> {beneficiaire.nom}</p>
        <p><strong>Prénom :</strong> {beneficiaire.prenom}</p>
        <p><strong>Téléphone :</strong> {beneficiaire.telephone}</p>
        <p><strong>Email :</strong> {beneficiaire.mail}</p>
      </div>
    </div>
  );
};

export default BeneficiaireDetail;