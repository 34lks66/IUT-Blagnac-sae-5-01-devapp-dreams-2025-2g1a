import { useEffect, useState, useMemo } from 'react';
import { apiFetch } from "../services/api";

interface Beneficiaire {
    _id?: string;
    nom: string;
    prenom: string;
    mail: string;
    telephone: string;
    pays: string;
}

interface Country {
    _id: string;
    nom: string;
}

const Beneficiaires = () => {
    const [beneficiaires, setBeneficiaires] = useState<Beneficiaire[]>([]);
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBeneficiaire, setEditingBeneficiaire] = useState<Beneficiaire | null>(null);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        mail: '',
        telephone: '',
        pays: ''
    });

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        const fetchBeneficiaires = async () => {
            try {
                const res = await apiFetch("/api/members/get", { method: "GET" });
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
        const fetchCountries = async () => {
            try {
                const res = await apiFetch("/api/pays/get", { method: "GET" });
                if (!res.ok) throw new Error("Erreur lors du chargement des pays");
                const data = await res.json();
                setCountries(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCountries();
    }, []);

    const handleSubmit = async () => {
        const { nom, prenom, telephone, mail, pays } = formData;

        if (!nom || !prenom || !telephone || !mail || !pays) {
            alert("Veuillez remplir tous les champs");
            return;
        }

        const beneficiaireData = {
            nom,
            prenom,
            telephone,
            mail,
            pays,
        };

        try {
            let res;
            if (editingBeneficiaire) {
                res = await apiFetch(`/api/members/update/${editingBeneficiaire._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(beneficiaireData),
                });
            } else {
                res = await apiFetch("/api/members/save", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(beneficiaireData),
                });
            }

            if (!res.ok) throw new Error("Erreur lors de l'enregistrement du bénéficiaire");

            // recharge les bénéficiaires
            const newRes = await apiFetch("/api/members/get", { method: "GET" });
            if (!newRes.ok)
                throw new Error("Erreur lors du rechargement des bénéficiaires");
            const newData = await newRes.json();
            setBeneficiaires(newData);
            closeModal();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await apiFetch(`/api/members/delete/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Erreur lors de la suppression");
            setBeneficiaires(beneficiaires.filter((b) => b._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const filteredBeneficiaires = useMemo(() => {
        return beneficiaires.filter((beneficiaire) =>
            [beneficiaire.nom, beneficiaire.prenom, beneficiaire.mail, beneficiaire.telephone, beneficiaire.pays]
                .join(' ')
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    }, [beneficiaires, searchTerm]);

    const openModal = (beneficiaire?: Beneficiaire) => {
        if (beneficiaire) {
            setEditingBeneficiaire(beneficiaire);
            setFormData({
                nom: beneficiaire.nom,
                prenom: beneficiaire.prenom,
                mail: beneficiaire.mail,
                telephone: beneficiaire.telephone,
                pays: beneficiaire.pays
            });
        } else {
            setEditingBeneficiaire(null);
            setFormData({
                nom: '',
                prenom: '',
                mail: '',
                telephone: '',
                pays: ''
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingBeneficiaire(null);
        setFormData({
            nom: '',
            prenom: '',
            mail: '',
            telephone: '',
            pays: ''
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-4xl font-extrabold ">Gestion Bénéficiaires</h1>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-yellow-500 bg-clip-text text-transparent">
                        Bénéficiaires
                    </h2>
                    <p className="text-gray-600">
                        Gérez les bénéficiaires de l'association
                    </p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                >
                    Ajouter
                </button>
            </div>

            {/* Barre de recherche */}
            <section className="border-t border-gray-200 pt-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Rechercher un bénéficiaire..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors"
                        />
                    </div>
                </div>

                {/* Tableau */}
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b-2 border-yellow-200">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nom</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Prénom</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Téléphone</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Pays</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBeneficiaires.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                                        Aucun bénéficiaire trouvé
                                    </td>
                                </tr>
                            ) : (
                                filteredBeneficiaires.map((beneficiaire) => (
                                    <tr key={beneficiaire._id} className="border-b border-gray-100 hover:bg-yellow-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-800">{beneficiaire.nom}</td>
                                        <td className="px-6 py-4 text-gray-700">{beneficiaire.prenom}</td>
                                        <td className="px-6 py-4 text-gray-700">{beneficiaire.mail}</td>
                                        <td className="px-6 py-4 text-gray-700">{beneficiaire.telephone}</td>
                                        <td className="px-6 py-4 text-gray-700">{beneficiaire.pays}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => openModal(beneficiaire)}
                                                    className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-sm font-medium"
                                                >
                                                    Modifier
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setDeleteId(beneficiaire._id || null);
                                                        setShowDeleteModal(true);
                                                    }}
                                                    className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 text-sm font-medium"
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Modale */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-3xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold mb-6 text-yellow-500 bg-clip-text text-transparent">
                            {editingBeneficiaire ? 'Modifier un bénéficiaire' : 'Ajouter un bénéficiaire'}
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                                <input
                                    type="text"
                                    value={formData.nom}
                                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Prénom</label>
                                <input
                                    type="text"
                                    value={formData.prenom}
                                    onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse email</label>
                                <input
                                    type="email"
                                    value={formData.mail}
                                    onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                                <input
                                    type="tel"
                                    value={formData.telephone}
                                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Pays
                                </label>
                                <select
                                    value={formData.pays}
                                    onChange={(e) => setFormData({ ...formData, pays: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors"
                                    required
                                >
                                    <option value="">-- Sélectionnez un pays --</option>

                                    {countries.map((country: Country) => (
                                        <option key={country._id} value={country.nom}>
                                            {country.nom}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={closeModal}
                                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!formData.nom || !formData.prenom || !formData.mail || !formData.telephone || !formData.pays}
                                className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${!formData.nom || !formData.prenom || !formData.mail || !formData.telephone || !formData.pays
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-yellow-500 text-white hover:shadow-lg"
                                    }`}
                            >
                                {editingBeneficiaire ? 'Modifier le bénéficiaire' : 'Créer le bénéficiaire'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODALE SUPPRESSION */}
            {showDeleteModal && (
                <div
                    className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowDeleteModal(false)}
                >
                    <div
                        className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-bold mb-4 text-red-600 ">
                            Confirmer la suppression
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Voulez-vous vraiment supprimer ce bénéficiaire ? <br />
                            Cette action est irréversible.
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={async () => {
                                    if (deleteId) {
                                        await handleDelete(deleteId);
                                    }
                                    setShowDeleteModal(false);
                                    setDeleteId(null);
                                }}
                                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
                            >
                                Supprimer
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Beneficiaires;
