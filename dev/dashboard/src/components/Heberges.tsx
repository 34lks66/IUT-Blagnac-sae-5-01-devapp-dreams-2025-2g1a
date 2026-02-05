import { useEffect, useState, useMemo } from 'react';
import { apiFetch } from "../services/api";
import { Link } from 'react-router-dom';

interface Volunteer {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  statut: string;
}

interface Beneficiaire {
  _id?: string;
  nom: string;
  prenom: string;
  mail: string;
  telephone: string;
  benevole?: string | Volunteer;
}

interface BeneficiaireFormData {
  nom: string;
  prenom: string;
  mail: string;
  telephone: string;
  benevole: string;
}

const Heberges = () => {
  const [beneficiaires, setBeneficiaires] = useState<Beneficiaire[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBeneficiaire, setEditingBeneficiaire] = useState<Beneficiaire | null>(null);
  const [formData, setFormData] = useState<BeneficiaireFormData>({
    nom: '',
    prenom: '',
    mail: '',
    telephone: '',
    benevole: '',
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBeneficiaires = async () => {
      try {
        const res = await apiFetch("/api/beneficiaire/get", { method: "GET" });
        if (!res.ok) throw new Error("Erreur lors du chargement des bénéficiaires");
        const data = await res.json();
        setBeneficiaires(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBeneficiaires();
  }, []);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const res = await apiFetch("/api/accounts", { method: "GET" });
        if (!res.ok) throw new Error("Erreur lors du chargement des comptes");
        const data = await res.json();
        const benevolesOnly = (data as Volunteer[]).filter((a) => a.statut === "O");
        setVolunteers(benevolesOnly);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVolunteers();
  }, []);

  const handleSubmit = async () => {
    const { nom, prenom, telephone, mail, benevole } = formData;

    if (!nom || !prenom || !telephone || !mail || !benevole) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    const beneficiaireData = { nom, prenom, telephone, mail, benevole };

    try {
      let res;
      if (editingBeneficiaire) {
        res = await apiFetch(`/api/beneficiaire/update/${editingBeneficiaire._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(beneficiaireData),
        });
      } else {
        res = await apiFetch("/api/beneficiaire/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(beneficiaireData),
        });
      }

      if (!res.ok) throw new Error("Erreur lors de l'enregistrement du bénéficiaire");

      const newRes = await apiFetch("/api/beneficiaire/get", { method: "GET" });
      if (!newRes.ok) throw new Error("Erreur lors du rechargement des bénéficiaires");
      const newData = await newRes.json();
      setBeneficiaires(newData);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await apiFetch(`/api/beneficiaire/delete/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      setBeneficiaires(beneficiaires.filter((b) => b._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const filteredBeneficiaires = useMemo(() => {
    return beneficiaires.filter((beneficiaire) => {
      const benevoleName =
        typeof beneficiaire.benevole === "object" && beneficiaire.benevole
          ? `${beneficiaire.benevole.nom} ${beneficiaire.benevole.prenom}`
          : "";

      return [
        beneficiaire.nom,
        beneficiaire.prenom,
        beneficiaire.mail,
        beneficiaire.telephone,
        benevoleName,
      ]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
  }, [beneficiaires, searchTerm]);

  const openModal = (beneficiaire?: Beneficiaire) => {
    if (beneficiaire) {
      setEditingBeneficiaire(beneficiaire);

      const benevoleId = typeof beneficiaire.benevole === "string" ? beneficiaire.benevole : beneficiaire.benevole?._id || "";

      setFormData({
        nom: beneficiaire.nom,
        prenom: beneficiaire.prenom,
        mail: beneficiaire.mail,
        telephone: beneficiaire.telephone,
        benevole: benevoleId,
      });
    } else {
      setEditingBeneficiaire(null);
      setFormData({ nom: '', prenom: '', mail: '', telephone: '', benevole: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBeneficiaire(null);
    setFormData({ nom: '', prenom: '', mail: '', telephone: '', benevole: '' });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-extrabold ">Gestion Hébergés</h1>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-yellow-500 bg-clip-text text-transparent">Hébergés</h2>
          <p className="text-gray-600">Gérez les personnes hébergées</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-xl hover:shadow-lg transition-all font-medium">Ajouter</button>
      </div>

      <section className="border-t border-gray-200 pt-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Rechercher..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors" />
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b-2 border-yellow-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nom</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Prénom</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Téléphone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Bénévole référent</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBeneficiaires.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">Aucun élément trouvé</td>
                </tr>
              ) : (
                filteredBeneficiaires.map((beneficiaire) => {
                  let benevoleLabel = '-';
                  if (typeof beneficiaire.benevole === "object" && beneficiaire.benevole) {
                    benevoleLabel = `${beneficiaire.benevole.prenom} ${beneficiaire.benevole.nom}`;
                  } else if (typeof beneficiaire.benevole === "string") {
                    const v = volunteers.find(vol => vol._id === beneficiaire.benevole);
                    if (v) benevoleLabel = `${v.prenom} ${v.nom}`;
                  }

                  return (
                    <tr key={beneficiaire._id} className="border-b border-gray-100 hover:bg-yellow-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-800">{beneficiaire.nom}</td>
                      <td className="px-6 py-4 text-gray-700">{beneficiaire.prenom}</td>
                      <td className="px-6 py-4 text-gray-700">{beneficiaire.mail}</td>
                      <td className="px-6 py-4 text-gray-700">{beneficiaire.telephone}</td>
                      <td className="px-6 py-4 text-gray-700">{benevoleLabel}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link to={`/beneficiaire/${beneficiaire._id}`} className="px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 text-sm font-medium">Voir</Link>
                          <button onClick={() => openModal(beneficiaire)} className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-sm font-medium">Modifier</button>
                          <button onClick={() => { setDeleteId(beneficiaire._id || null); setShowDeleteModal(true); }} className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 text-sm font-medium">Supprimer</button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-6 text-yellow-500 bg-clip-text text-transparent">{editingBeneficiaire ? 'Modifier' : 'Ajouter'}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                <input type="text" value={formData.nom} onChange={(e) => setFormData({ ...formData, nom: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Prénom</label>
                <input type="text" value={formData.prenom} onChange={(e) => setFormData({ ...formData, prenom: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse email</label>
                <input type="email" value={formData.mail} onChange={(e) => setFormData({ ...formData, mail: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                <input type="tel" value={formData.telephone} onChange={(e) => setFormData({ ...formData, telephone: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bénévole référent</label>
                <select value={formData.benevole} onChange={(e) => setFormData({ ...formData, benevole: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors" required>
                  <option value="">-- Sélectionnez un bénévole --</option>
                  {volunteers.map((v) => (
                    <option key={v._id} value={v._id}>{v.prenom} {v.nom} ({v.email})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={closeModal} className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium">Annuler</button>
              <button onClick={handleSubmit} disabled={!formData.nom || !formData.prenom || !formData.mail || !formData.telephone || !formData.benevole} className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${!formData.nom || !formData.prenom || !formData.mail || !formData.telephone || !formData.benevole ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-yellow-500 text-white hover:shadow-lg"}`}>
                {editingBeneficiaire ? 'Modifier' : 'Créer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4" onClick={() => setShowDeleteModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4 text-red-600 ">Confirmer la suppression</h2>
            <p className="text-gray-700 mb-6">Voulez-vous vraiment supprimer cet hébergé ? <br />Cette action est irréversible.</p>

            <div className="flex gap-4">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium">Annuler</button>
              <button onClick={async () => { if (deleteId) { await handleDelete(deleteId); } setShowDeleteModal(false); setDeleteId(null); }} className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Heberges;
