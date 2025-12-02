import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api";
import { useAuth } from "./utils/useAuth";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

type Antenne = {
  _id: string;
  nom: string;
  description: string;
  image: string;
  pays:
  | string
  | {
    _id: string;
    nom: string;
  };
};

type Pays = {
  _id: string;
  nom: string;
  description: string;
  image: string;
};

// const Label: React.FC<{ htmlFor?: string; children: React.ReactNode }> = ({
//   htmlFor,
//   children,
// }) => (
//   <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
//     {children}
//   </label>
// );

// const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (p) => (
//   <input
//     {...p}
//     className={
//       "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 " +
//       (p.className ?? "")
//     }
//   />
// );

// const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (
//   p
// ) => (
//   <textarea
//     {...p}
//     className={
//       "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 " +
//       (p.className ?? "")
//     }
//   />
// );

function AntenneForm() {
  const navigate = useNavigate();
  const { role, pays: userPays } = useAuth();
  const [pays, setPays] = useState<Pays[]>([]);
  const [antennes, setAntennes] = useState<Antenne[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Création / édition
  const [showFormModal, setShowFormModal] = useState(false);
  const [formUpdate, setFormUpdate] = useState(false);
  const [editingAntenne, setEditingAntenne] = useState<Antenne | null>(null);
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    pays: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Suppression
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Détails
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsAntenne, setDetailsAntenne] = useState<Antenne | null>(null);

  const [search, setSearch] = useState("");

  const getPaysNom = (
    paysData: string | { _id: string; nom: string }
  ): string => {
    if (typeof paysData === "object" && paysData !== null) {
      return paysData.nom;
    }
    const paysTrouve = pays.find((p) => p._id === paysData);
    return paysTrouve ? paysTrouve.nom : "Pays inconnu";
  };

  const loadAntennes = () => {
    apiFetch("/api/antenne/get")
      .then((res) => res.json())
      .then((data) => setAntennes(data))
      .catch((err) => console.error("Erreur antennes:", err));
  };

  const loadPays = () => {
    apiFetch("/api/pays/get")
      .then((res) => res.json())
      .then((data) => setPays(data))
      .catch((err) => console.error("Erreur pays:", err));
  };


  useEffect(() => {
    loadAntennes();
    loadPays();
  }, []);

  const resetForm = () => {
    setFormData({
      nom: "",
      description: "",
      pays: "",
    });
    setImageFile(null);
    setImagePreview("");
    setMessage("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateClick = () => {
    resetForm();
    setFormUpdate(false);
    setEditingAntenne(null);
    setShowFormModal(true);
  };

  const handleEditClick = (antenne: Antenne) => {
    setFormUpdate(true);
    setEditingAntenne(antenne);

    let paysId = "";
    if (typeof antenne.pays === "object") {
      paysId = antenne.pays._id;
    } else {
      paysId = antenne.pays;
    }

    setFormData({
      nom: antenne.nom,
      description: antenne.description,
      pays: paysId,
    });

    if (antenne.image) {
      setImagePreview(`${API_BASE}${antenne.image}`);
    } else {
      setImagePreview("");
    }
    setImageFile(null);
    setShowFormModal(true);
    setMessage("");
  };

  const closeFormModal = () => {
    setShowFormModal(false);
    setFormUpdate(false);
    setEditingAntenne(null);
    resetForm();
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const nomTrim = formData.nom.trim();

    if (!imageFile) {
      setMessage("❌ Veuillez sélectionner une image");
      setIsLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("nom", nomTrim);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("pays", formData.pays);
    formDataToSend.append("image", imageFile);

    try {
      const response = await apiFetch("/api/antenne/save", {
        method: "POST",
        body: formDataToSend,
      });


      if (response.ok) {
        setMessage("✅ Antenne créée avec succès !");
        if (window.location.href.includes('localhost:5174')) {
          navigate('http://localhost:5173/villes/' + nomTrim);
        } else {
          navigate('http://localhost:5174/villes/' + nomTrim);
        }
        loadAntennes();
        closeFormModal();
      } else {
        setMessage("❌ Erreur lors de la création");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editingAntenne) return;

    setIsLoading(true);
    setMessage("");
    const nomTrim = formData.nom.trim();

    const formDataToSend = new FormData();
    formDataToSend.append("nom", nomTrim);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("pays", formData.pays);
    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    try {
      const response = await apiFetch(
        `/api/antenne/update/${editingAntenne._id}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        setMessage("✅ Antenne modifiée avec succès !");
        loadAntennes();
        closeFormModal();
      } else {
        setMessage("❌ Erreur lors de la modification");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const response = await apiFetch(
        `/api/antenne/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setMessage("✅ Antenne supprimée avec succès !");
        loadAntennes();
      } else {
        setMessage("❌ Erreur lors de la suppression");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Erreur de connexion");
    }
  }

  const filteredAntennes = antennes.filter((a) => {
    const matchesSearch = (a.nom + " " + a.description + " " + getPaysNom(a.pays))
      .toLowerCase()
      .includes(search.toLowerCase());

    if (role === "X") {
      return matchesSearch && getPaysNom(a.pays) === userPays;
    }
    return matchesSearch;
  });

  const isCreateDisabled =
    isLoading ||
    !formData.nom.trim() ||
    !formData.description.trim() ||
    !formData.pays ||
    (!formUpdate && !imageFile); // image obligatoire seulement en création

  const isUpdateDisabled =
    isLoading ||
    !formData.nom.trim() ||
    !formData.description.trim() ||
    !formData.pays;

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-extrabold">Gestion Antennes</h1>
      </div>

      {/* SOUS-TITRE */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-yellow-500">Antennes</h2>
          <p className="text-gray-600">
            Gérez les antennes locales et leur rattachement aux pays.
          </p>
        </div>
        <button
          onClick={handleCreateClick}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
        >
          Nouvelle antenne
        </button>
      </div>

      {/* BARRE DE RECHERCHE */}
      <section className="border-t border-gray-200 pt-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Rechercher une antenne..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* TABLEAU ANTENNES */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b-2 border-yellow-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Nom
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Pays
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Détails
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredAntennes.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-gray-400"
                  >
                    Aucune antenne trouvée
                  </td>
                </tr>
              ) : (
                filteredAntennes.map((antenne) => (
                  <tr
                    key={antenne._id}
                    className="border-b border-gray-100 hover:bg-yellow-50 transition-colors"
                  >
                    {/* IMAGE */}
                    <td className="px-6 py-4">
                      {antenne.image ? (
                        <img
                          src={`${API_BASE}${antenne.image}`}
                          alt={antenne.nom}
                          className="w-16 h-12 object-cover rounded-md border border-gray-200 shadow-sm"
                        />
                      ) : (
                        <div className="w-16 h-12 bg-gray-100 rounded-md border border-gray-300 flex items-center justify-center text-xs text-gray-400">
                          —
                        </div>
                      )}
                    </td>

                    {/* NOM */}
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {antenne.nom}
                    </td>

                    {/* PAYS */}
                    <td className="px-6 py-4 text-gray-700">
                      {getPaysNom(antenne.pays)}
                    </td>

                    {/* DÉTAILS (modale de description) */}
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => {
                          setDetailsAntenne(antenne);
                          setShowDetailsModal(true);
                        }}
                        className="px-3 py-1.5 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200 text-xs font-medium hover:bg-yellow-100"
                      >
                        Voir détails
                      </button>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4">
                      <div className="flex gap-2 justify">
                        <button
                          type="button"
                          onClick={() => handleEditClick(antenne)}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-sm font-medium"
                        >
                          Modifier
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setDeleteId(antenne._id);
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

      {/* MODALE FORMULAIRE (CRÉATION / ÉDITION) */}
      {showFormModal && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4"
          onClick={closeFormModal}
        >
          <div
            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-yellow-500">
              {formUpdate ? "Modifier une antenne" : "Ajouter une antenne"}
            </h2>

            {message && (
              <div
                className={`mb-6 p-4 rounded-lg border text-sm ${message.includes("✅")
                  ? "bg-green-50 border-green-200 text-green-700"
                  : message.includes("❌")
                    ? "bg-red-50 border-red-200 text-red-700"
                    : "bg-gray-50 border-gray-200 text-gray-700"
                  }`}
              >
                {message.replace("✅", "").replace("❌", "")}
              </div>
            )}

            <form
              onSubmit={formUpdate ? handleUpdate : handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* <div>
                  <Label>Nom de l'antenne *</Label>
                  <Input
                    type="text"
                    value={formData.nom}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, nom: e.target.value })
                    }
                  />
                </div> */}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    value={formData.nom}
                    onChange={(e) =>
                      setFormData({ ...formData, nom: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                       focus:border-yellow-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* <div>
                  <Label>Pays *</Label>
                  <select
                    value={formData.pays}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, pays: e.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
                  >
                    <option value="">Sélectionnez un pays</option>
                    {pays.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.nom}
                      </option>
                    ))}
                  </select>
                </div> */}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pays *
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-colors"
                    value={formData.pays}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, pays: e.target.value })
                    }
                  >
                    <option value="">Sélectionner un pays</option>
                    {pays
                      .filter((p) => role !== "X" || p.nom === userPays)
                      .map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.nom}
                        </option>
                      ))}
                  </select>
                </div>

                {/* <div className="sm:col-span-2">
                  <Label>Description *</Label>
                  <TextArea
                    rows={4}
                    value={formData.description}
                    required
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Décrivez les activités, le rôle et les objectifs de cette antenne..."
                  />
                </div> */}

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    required
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                       focus:border-yellow-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image de l'antenne *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {formUpdate
                      ? "L'image est optionnelle, choisissez-en une nouvelle pour la remplacer."
                      : "Une image est requise pour créer l'antenne."}
                  </p>

                  {(imagePreview ||
                    (formUpdate &&
                      editingAntenne &&
                      editingAntenne.image &&
                      !imagePreview)) && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Aperçu :
                        </p>
                        <div className="w-48 h-32 border border-gray-300 rounded-lg overflow-hidden">
                          <img
                            src={
                              imagePreview ||
                              `${API_BASE}${editingAntenne?.image ?? ""}`
                            }
                            alt="Aperçu"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={closeFormModal}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={formUpdate ? isUpdateDisabled : isCreateDisabled}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${formUpdate
                    ? isUpdateDisabled
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-yellow-500 text-white hover:bg-yellow-600 hover:shadow-lg"
                    : isCreateDisabled
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-yellow-500 text-white hover:bg-yellow-600 hover:shadow-lg"
                    }`}
                >
                  {isLoading
                    ? "Enregistrement…"
                    : formUpdate
                      ? "Modifier l'antenne"
                      : "Créer l'antenne"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODALE DÉTAILS (DESCRIPTION FORMATÉE - OPTION 2) */}
      {showDetailsModal && detailsAntenne && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDetailsModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {detailsAntenne.nom}
                </h2>
                <p className="text-sm text-gray-500">
                  Antenne rattachée à{" "}
                  <span className="font-medium">
                    {getPaysNom(detailsAntenne.pays)}
                  </span>
                </p>
              </div>

              <button
                onClick={() => setShowDetailsModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
              >
                ✕
              </button>
            </div>

            {detailsAntenne.image && (
              <div className="mb-4">
                <img
                  src={`${API_BASE}${detailsAntenne.image}`}
                  alt={detailsAntenne.nom}
                  className="w-full max-h-60 object-cover rounded-xl border border-gray-200"
                />
              </div>
            )}

            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Description
              </h3>
              <div className="max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-800 leading-relaxed">
                {detailsAntenne.description || (
                  <span className="text-gray-400">
                    Aucune description renseignée.
                  </span>
                )}
              </div>
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
              Voulez-vous vraiment supprimer cette antenne ? <br />
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
}

export default AntenneForm;
