import { useEffect, useState, useMemo, useContext } from 'react';
import { apiFetch } from "../services/api";
import { Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

interface Volunteer {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  statut: string;
}

interface Heberge {
  _id?: string;
  nom: string;
  prenom: string;
  mail: string;
  telephone: string;
  benevole?: string | Volunteer;
}

interface HebergeFormData {
  nom: string;
  prenom: string;
  mail: string;
  telephone: string;
  benevole: string;
}

const Heberges = () => {
  const { user } = useContext(AuthContext)!;
  const [heberges, setHeberges] = useState<Heberge[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHeberge, setEditingHeberge] = useState<Heberge | null>(null);
  const [formData, setFormData] = useState<HebergeFormData>({
    nom: '',
    prenom: '',
    mail: '',
    telephone: '',
    benevole: '',
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeberges = async () => {
      try {
        const res = await apiFetch("/api/heberge/get", { method: "GET" });
        if (!res.ok) throw new Error("Erreur lors du chargement des hébergés");
        const data = await res.json();
        setHeberges(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHeberges();
  }, []);

  useEffect(() => {
    const fetchVolunteers = async () => {
      // Si l'utilisateur est un bénévole (role 'O'), on ne fetch pas les comptes (403 forbidden)
      // On l'ajoute lui-même à la liste pour le dropdown
      if (user?.role === 'O') {
        setVolunteers([{
          _id: user._id,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          statut: user.role
        }]);
        return;
      }

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

    if (user) {
        fetchVolunteers();
    }
  }, [user]);

  const handleSubmit = async () => {
    const { nom, prenom, telephone, mail, benevole } = formData;

    if (!nom || !prenom || !telephone || !mail || !benevole) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    const hebergeData = { nom, prenom, telephone, mail, benevole };

    try {
      let res;
      if (editingHeberge) {
        res = await apiFetch(`/api/heberge/update/${editingHeberge._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(hebergeData),
        });
      } else {
        res = await apiFetch("/api/heberge/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(hebergeData),
        });
      }

      if (!res.ok) throw new Error("Erreur lors de l'enregistrement de l'hébergé");

      const newRes = await apiFetch("/api/heberge/get", { method: "GET" });
      if (!newRes.ok) throw new Error("Erreur lors du rechargement des hébergés");
      const newData = await newRes.json();
      setHeberges(newData);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await apiFetch(`/api/heberge/delete/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      setHeberges(heberges.filter((b) => b._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const filteredHeberges = useMemo(() => {
    return heberges.filter((heberge) => {
      const benevoleName =
        typeof heberge.benevole === "object" && heberge.benevole
          ? `${heberge.benevole.nom} ${heberge.benevole.prenom}`
          : "";

      return [
        heberge.nom,
        heberge.prenom,
        heberge.mail,
        heberge.telephone,
        benevoleName,
      ]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
  }, [heberges, searchTerm]);

  const openModal = (heberge?: Heberge) => {
    if (heberge) {
      setEditingHeberge(heberge);

      const benevoleId = typeof heberge.benevole === "string" ? heberge.benevole : heberge.benevole?._id || "";

      setFormData({
        nom: heberge.nom,
        prenom: heberge.prenom,
        mail: heberge.mail,
        telephone: heberge.telephone,
        benevole: benevoleId,
      });
    } else {
      setEditingHeberge(null);
      // Pré-sélectionner l'utilisateur si c'est un bénévole
      const defaultBenevole = user?.role === 'O' ? user._id : '';
      setFormData({ nom: '', prenom: '', mail: '', telephone: '', benevole: defaultBenevole });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingHeberge(null);
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
              {filteredHeberges.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">Aucun élément trouvé</td>
                </tr>
              ) : (
                filteredHeberges.map((heberge) => {
                  let benevoleLabel = '-';
                  if (typeof heberge.benevole === "object" && heberge.benevole) {
                    benevoleLabel = `${heberge.benevole.prenom} ${heberge.benevole.nom}`;
                  } else if (typeof heberge.benevole === "string") {
                    const v = volunteers.find(vol => vol._id === heberge.benevole);
                    if (v) benevoleLabel = `${v.prenom} ${v.nom}`;
                  }

                  return (
                    <tr key={heberge._id} className="border-b border-gray-100 hover:bg-yellow-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-800">{heberge.nom}</td>
                      <td className="px-6 py-4 text-gray-700">{heberge.prenom}</td>
                      <td className="px-6 py-4 text-gray-700">{heberge.mail}</td>
                      <td className="px-6 py-4 text-gray-700">{heberge.telephone}</td>
                      <td className="px-6 py-4 text-gray-700">{benevoleLabel}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link to={`/heberge/${heberge._id}`} className="px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 text-sm font-medium">Voir</Link>
                          <button onClick={() => openModal(heberge)} className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-sm font-medium">Modifier</button>
                          <button onClick={() => { setDeleteId(heberge._id || null); setShowDeleteModal(true); }} className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 text-sm font-medium">Supprimer</button>
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
            <h2 className="text-2xl font-bold mb-6 text-yellow-500 bg-clip-text text-transparent">{editingHeberge ? 'Modifier' : 'Ajouter'}</h2>

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
                {editingHeberge ? 'Modifier' : 'Créer'}
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
