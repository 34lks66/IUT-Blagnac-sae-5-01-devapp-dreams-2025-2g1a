import React, { useState, useMemo } from 'react';

interface User {
  id: number;
  nom: string;
  prenom: string;
  mail: string;
  role: string;
  telephone: string;
  pays: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, nom: 'Dupont', prenom: 'Marie', mail: 'marie.dupont@example.com', role: 'Administrateur', telephone: '0601020304', pays: 'France' },
    { id: 2, nom: 'Martin', prenom: 'Jean', mail: 'jean.martin@example.com', role: 'Bénévole', telephone: '0605060708', pays: 'Belgique' },
    { id: 3, nom: 'Bernard', prenom: 'Sophie', mail: 'sophie.bernard@example.com', role: 'Administrateur', telephone: '0609091011', pays: 'Suisse' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    mail: '',
    role: '',
    telephone: '',
    pays: '',
  });

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      [user.nom, user.prenom, user.mail, user.role, user.telephone, user.pays]
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
        mail: user.mail,
        role: user.role,
        telephone: user.telephone,
        pays: user.pays,
      });
    } else {
      setEditingUser(null);
      setFormData({
        nom: '',
        prenom: '',
        mail: '',
        role: '',
        telephone: '',
        pays: '',
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
      mail: '',
      role: '',
      telephone: '',
      pays: '',
    });
  };

  const handleSubmit = () => {
    if (!formData.nom || !formData.prenom || !formData.mail || !formData.role) return;

    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id ? { ...u, ...formData } : u
        )
      );
    } else {
      const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      setUsers([...users, { id: newId, ...formData }]);
    }

    closeModal();
  };

  const deleteUser = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-xl p-12 shadow-md">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-[#93720a] rounded-xl mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">
            Utilisateurs
          </h2>
          <p className="text-gray-600 mb-6">Gérez les comptes utilisateurs et leurs informations</p>
        </div>

        {/* Barre de recherche + bouton */}
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
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-yellow-500 to-[#93720a] text-white rounded-xl hover:shadow-lg transition-all font-medium"
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Mail</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Téléphone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Pays</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rôle</th>
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
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-yellow-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800">{user.nom}</td>
                    <td className="px-6 py-4 text-gray-700">{user.prenom}</td>
                    <td className="px-6 py-4 text-gray-700">{user.mail}</td>
                    <td className="px-6 py-4 text-gray-700">{user.telephone}</td>
                    <td className="px-6 py-4 text-gray-700">{user.pays}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openModal(user)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium transition-colors"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-medium transition-colors"
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
      </div>

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
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse mail</label>
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
                    <option value="france">France</option>
                    <option value="belgique">Togo</option>
                    <option value="suisse">Burkina Faso</option>
                    <option value="canada">Côte D'Ivoire</option>
                    <option value="luxembourg">Italie</option>
                    <option value="autre">Autre</option>
                </select>
                </div>


              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rôle</label>
                <div className="flex flex-wrap gap-3">
                  {['Bénévole', 'Administrateur', 'Super administrateur'].map((role) => (
                    <label
                      key={role}
                      className={`flex items-center gap-2 px-4 py-3 border-2 rounded-xl cursor-pointer transition-colors ${
                        formData.role === role
                          ? 'border-yellow-500 bg-yellow-50'
                          : 'border-gray-200 hover:border-yellow-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role}
                        checked={formData.role === role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="text-yellow-500 focus:ring-yellow-500"
                        required
                      />
                      <span className="text-gray-700 font-medium">{role}</span>
                    </label>
                  ))}
                </div>
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
                className="flex-1 px-6 py-3 bg-gradient-to-br from-yellow-500 to-[#93720a] text-white rounded-xl hover:shadow-lg transition-all font-medium"
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
