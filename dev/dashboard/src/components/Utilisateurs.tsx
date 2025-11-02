import { useEffect,useState, useMemo } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface User {
  _id?: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  pays: string;
  statut: string;
}


const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    pays: '',
    statut: 'O'
  });

  useEffect(() => {
  const fetchAccounts = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/accounts`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Erreur lors du chargement des comptes");
      const data = await res.json();
      setUsers(data);
    } catch (error) {   
      console.error(error);
    }
  };

  fetchAccounts();
  }, []);

  const handleSubmit = async () => {
  const { nom, prenom, telephone, email, pays, statut } = formData;

  if (!nom || !prenom || !telephone || !email || !statut || !pays) {
    alert("Veuillez remplir tous les champs");
    return;
  }

  const userData = {
    nom,
    prenom,
    telephone,
    email: email,
    password: "123456", // mdp temporaire
    statut,
    pays,
  };

  try {
    let res;
    if (editingUser) {
      res = await fetch(`${API_BASE}/api/accounts/${editingUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(userData),
      });
    } else {
      res = await fetch(`${API_BASE}/api/accounts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(userData),
      });
    }

    if (!res.ok) throw new Error("Erreur lors de l'enregistrement du compte");

    // Recharge les comptes après création / modification
    const newRes = await fetch(`${API_BASE}/api/accounts`, {
      credentials: "include",
    });
    if (!newRes.ok) throw new Error("Erreur lors du rechargement des comptes");
    const newData = await newRes.json();
    setUsers(newData);
    closeModal();
  } catch (error) {
    console.error(error);
  }
  };

  const deleteUser = async (id: string) => {
  if (!window.confirm("Supprimer cet utilisateur ?")) return;

  try {
    const res = await fetch(`${API_BASE}/api/accounts/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Erreur lors de la suppression");
    setUsers(users.filter((u) => u._id !== id));
  } catch (error) {
    console.error(error);
  }
};

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      [user.nom, user.prenom, user.email, user.statut, user.telephone, user.pays]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const openModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        telephone: user.telephone,
        pays: user.pays,
        statut: user.statut
      });
    } else {
      setEditingUser(null);
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        pays: '',
        statut: 'O'
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      pays: '',
      statut: ''
    });
  };


  return (
    

    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-extrabold ">Gestion Utilisateurs</h1>
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg transition-all duration-200 font-semibold inline-flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Ajouter
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-yellow-500 bg-clip-text text-transparent">
            Utilisateurs
          </h2>
          <p className="text-gray-600">
            Gérez les comptes utilisateurs et leurs informations
          </p>
        </div>
        
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
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors"
            />
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter un utilisateur
          </button>
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Statut</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="border-b border-gray-100 hover:bg-yellow-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800">{user.nom}</td>
                    <td className="px-6 py-4 text-gray-700">{user.prenom}</td>
                    <td className="px-6 py-4 text-gray-700">{user.email}</td>
                    <td className="px-6 py-4 text-gray-700">{user.telephone}</td>
                    <td className="px-6 py-4 text-gray-700">{user.pays}</td>
                    <td>
                        {user.statut === 'O' ? 'Bénévole' : user.statut === 'X' ? 'Administrateur' : 'Super administrateur'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openModal(user)}
                          // className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm font-medium transition-colors"
                          className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-sm font-medium"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => deleteUser(user._id!)}
                          // className="px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 text-sm font-medium transition-colors"
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
              {editingUser ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'}
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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                    <option value="France">France</option>
                    <option value="Togo">Togo</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Côte D'Ivoire">Côte D'Ivoire</option>
                    <option value="Italie">Italie</option>
                    <option value="Autre">Autre</option>
                </select>
                </div>

                </div>
                <div className="mt-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Statut</label>
                <div className="flex flex-col sm:flex-row gap-3">
                    {[
                    { label: "Bénévole", value: "O" },
                    { label: "Administrateur", value: "X" },
                    { label: "Super administrateur", value: "S" }
                    ].map((role) => (
                    <label
                        key={role.value}
                        className={`flex items-center gap-2 px-4 py-3 border-2 rounded-xl cursor-pointer transition-colors ${
                        formData.statut === role.value
                            ? "border-yellow-500 bg-yellow-50"
                            : "border-gray-200 hover:border-yellow-400"
                        }`}
                    >
                        <input
                        type="radio"
                        name="role"
                        value={role.value}
                        checked={formData.statut === role.value}
                        onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
                        className="text-yellow-500 focus:ring-yellow-500"
                        required
                        />
                        <span className="text-gray-700 font-medium">{role.label}</span>
                    </label>
                    ))}
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
                className="flex-1 px-6 py-3 bg-yellow-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
