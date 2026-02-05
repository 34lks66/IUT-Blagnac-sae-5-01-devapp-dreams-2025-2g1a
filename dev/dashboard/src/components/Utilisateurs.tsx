import { useEffect, useState, useMemo } from 'react';
import { apiFetch } from "../services/api";
import { useAuth } from "./utils/useAuth";

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

interface Country {
  _id: string;
  nom: string;
}


const Users = () => {
  const { role, pays: userPays } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // State pour gérer la modification du mot de passe
  const [showPasswordEdit, setShowPasswordEdit] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);

  // Regex de validation
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  // Regex téléphone internationale souple : chiffres, espaces, tirets, points, + au début
  const phoneRegex = /^[+]?[\d\s.-]{6,20}$/;

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    pays: '',
    pole: '',
    statut: 'O',
    password: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Fonction de génération de mot de passe
  const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  // Fonction pour copier le mot de passe
  const copyPasswordToClipboard = () => {
    if (formData.password) {
      navigator.clipboard.writeText(formData.password);
      setPasswordCopied(true);
      setTimeout(() => setPasswordCopied(false), 2000);
    }
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await apiFetch("/api/accounts", { method: "GET" });
        if (!res.ok) throw new Error("Erreur lors du chargement des comptes");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAccounts();
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
    const { nom, prenom, telephone, email, pays, statut, password, pole } = formData;
    const newErrors: { [key: string]: string } = {};

    if (!nom) newErrors.nom = "Le nom est requis";
    if (!prenom) newErrors.prenom = "Le prénom est requis";
    if (!pays) newErrors.pays = "Le pays est requis";
    if (!statut) newErrors.statut = "Le statut est requis";

    // Validation Email
    if (!email) {
      newErrors.email = "L'email est requis";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Format d'email invalide";
    }

    // Validation Téléphone
    if (!telephone) {
      newErrors.telephone = "Le téléphone est requis";
    } else if (!phoneRegex.test(telephone)) {
      newErrors.telephone = "Format invalide (chiffres, espaces, +, - autorisés)";
    }

    // Gestion mot de passe obligatoire en création
    if (!editingUser) {
      if (!password) {
        newErrors.password = "Le mot de passe est requis";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // Clear errors if valid

    const userData: any = {
      nom,
      prenom,
      telephone,
      email: email,
      statut,
      pays,
      pole,
    };

    // Gestion du mot de passe
    if (editingUser) {
      if (showPasswordEdit && password) {
        userData.password = password;
      }
    } else {
      userData.password = password;
    }

    // Debug: log payload in browser and send to backend debug endpoint
    try {
      console.log('DEBUG userData before send:', userData);
      apiFetch('/api/debug/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
    } catch (e) {
      // ignore
    }

    try {
      let res;
      if (editingUser) {
        res = await apiFetch(`/api/accounts/${editingUser._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
      } else {
        res = await apiFetch("/api/accounts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
      }

      if (!res.ok) throw new Error("Erreur lors de l'enregistrement du compte");

      const newRes = await apiFetch("/api/accounts", { method: "GET" });
      if (!newRes.ok)
        throw new Error("Erreur lors du rechargement des comptes");
      const newData = await newRes.json();
      setUsers(newData);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await apiFetch(`/api/accounts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      setUsers(users.filter((u) => u._id !== id));
    } catch (error) {
      console.error(error);
    }
  };


  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      [user.nom, user.prenom, user.email, user.statut, user.telephone, user.pays, user.pole]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const openModal = (user?: User) => {
    setErrors({}); // Reset errors
    if (user) {
      setEditingUser(user);
      setShowPasswordEdit(false);
      setFormData({
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        telephone: user.telephone,
        pays: user.pays,
        pole: user.pole || '',
        statut: user.statut,
        password: ''
      });
    } else {
      setEditingUser(null);
      setShowPasswordEdit(true);
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        pays: role === 'X' ? (userPays ?? '') : '',
        pole: '',
        statut: 'O',
        password: generatePassword()
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setErrors({});
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      pays: '',
      pole: '',
      statut: '',
      password: ''
    });
  };


  return (


    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-extrabold ">Gestion Utilisateurs</h1>
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
              placeholder="Rechercher un utilisateur..."
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Pôle</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Statut</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
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
                    <td className="px-6 py-4 text-gray-700">{user.pole}</td>
                    <td>
                      {user.statut === 'O' ? 'Bénévole' : user.statut === 'X' ? 'Administrateur' : 'Super administrateur'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openModal(user)}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-sm font-medium"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => {
                            setDeleteId(user._id || null);
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
            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-yellow-500 bg-clip-text text-transparent">
              {editingUser ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nom *</label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.nom ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-yellow-500"}`}
                />
                {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Prénom *</label>
                <input
                  type="text"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.prenom ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-yellow-500"}`}
                />
                {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.email ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-yellow-500"}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone *</label>
                <input
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.telephone ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-yellow-500"}`}
                />
                {errors.telephone && <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pays *
                </label>
                <select
                  value={formData.pays}
                  onChange={(e) => setFormData({ ...formData, pays: e.target.value })}
                  disabled={role === "X"}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.pays ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-yellow-500"}`}
                >
                  <option value="">-- Sélectionnez un pays --</option>

                  {countries
                    .filter((country: Country) => role !== "X" || country.nom === userPays)
                    .map((country: Country) => (
                      <option key={country._id} value={country.nom}>
                        {country.nom}
                      </option>
                    ))}
                </select>
                {errors.pays && <p className="text-red-500 text-xs mt-1">{errors.pays}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pôle</label>
                <select
                  value={formData.pole}
                  onChange={(e) => setFormData({ ...formData, pole: e.target.value })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.pole ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-yellow-500"}`}
                >
                  <option value="">-- Sélectionnez un pôle --</option>
                  <option value="permanence">Permanence</option>
                  <option value="hebergement">Hébergement</option>
                </select>
              </div>

              {/* Gestion du mot de passe */}
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe *</label>

                {!showPasswordEdit && editingUser ? (
                  <button
                    onClick={() => {
                      setShowPasswordEdit(true);
                      setFormData({ ...formData, password: generatePassword() });
                    }}
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 border border-blue-200 font-medium transition-colors"
                  >
                    Rénitialiser le mot de passe
                  </button>
                ) : (
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className={`flex-1 px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.password ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-yellow-500"}`}
                        placeholder="Mot de passe"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, password: generatePassword() })}
                        className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 border border-gray-200 font-medium transition-colors"
                        title="Générer un nouveau mot de passe"
                      >
                        {/* SVG Refresh */}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={copyPasswordToClipboard}
                          className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 border border-gray-200 font-medium transition-colors"
                          title="Copier le mot de passe"
                        >
                          {/* SVG Clipboard */}
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        </button>
                        {passwordCopied && (
                          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg animate-fade-in-out whitespace-nowrap">
                            Copié !
                          </span>
                        )}
                      </div>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                  </div>
                )}
              </div>

            </div>
            <div className="mt-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Statut *</label>
              <div className="flex flex-col sm:flex-row gap-3">
                {[
                  { label: "Bénévole", value: "O" },
                  { label: "Administrateur", value: "X" },
                  { label: "Super administrateur", value: "S" }
                ].map((roleOption) => {
                  const isDisabled = role === "X" && (roleOption.value === "X" || roleOption.value === "S");
                  return (
                    <label
                      key={roleOption.value}
                      className={`flex items-center gap-2 px-4 py-3 border-2 rounded-xl cursor-pointer transition-colors ${formData.statut === roleOption.value
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-gray-200 hover:border-yellow-400"
                        } ${isDisabled ? "opacity-50 cursor-not-allowed bg-gray-100" : ""}`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={roleOption.value}
                        checked={formData.statut === roleOption.value}
                        onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
                        className="text-yellow-500 focus:ring-yellow-500"
                        required
                        disabled={isDisabled}
                      />
                      <span className="text-gray-700 font-medium">{roleOption.label}</span>
                    </label>
                  );
                })}
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
                disabled={!formData.nom || !formData.prenom || !formData.email || !formData.telephone || !formData.pays || !formData.statut || (showPasswordEdit && !formData.password)}
                className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${!formData.nom || !formData.prenom || !formData.email || !formData.telephone || !formData.pays || !formData.statut || (showPasswordEdit && !formData.password)
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-yellow-500 text-white hover:shadow-lg hover:bg-yellow-600"
                  }`}
              >
                {editingUser ? 'Modifier l\'utilisateur' : 'Créer l\'utilisateur'}
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
              Voulez-vous vraiment supprimer cet utilisateur ? <br />
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

export default Users;
