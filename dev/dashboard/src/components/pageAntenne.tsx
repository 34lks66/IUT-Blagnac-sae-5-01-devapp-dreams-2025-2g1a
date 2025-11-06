import { useState, useEffect } from "react";

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

const Label: React.FC<{ htmlFor?: string; children: React.ReactNode }> = ({
  htmlFor,
  children,
}) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
    {children}
  </label>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (p) => (
  <input
    {...p}
    className={
      "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 " +
      (p.className ?? "")
    }
  />
);

const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (
  p
) => (
  <textarea
    {...p}
    className={
      "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 " +
      (p.className ?? "")
    }
  />
);

function AntenneForm() {
  const [pays, setPays] = useState<Pays[]>([]);
  const [formUpdate, setFormUpdate] = useState(false);
  const [editingAntenne, setEditingAntenne] = useState<Antenne | null>(null);
  const [antennes, setAntennes] = useState<Antenne[]>([]);
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    pays: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const getPaysNom = (
    paysData: string | { _id: string; nom: string }
  ): string => {
    if (typeof paysData === "object" && paysData !== null) {
      return paysData.nom;
    }
    const paysTrouve = pays.find((p) => p._id === paysData);
    return paysTrouve ? paysTrouve.nom : "Pays inconnu";
  };

  useEffect(() => {
    fetchAntennes();
    fetchPays();
  }, []);

  const fetchAntennes = () => {
    fetch(`http://localhost:5000/api/antenne/get`)
      .then((res) => res.json())
      .then((data) => setAntennes(data))
      .catch((err) => console.error("Erreur:", err));
  };

  const fetchPays = () => {
    fetch(`http://localhost:5000/api/pays/get`)
      .then((res) => res.json())
      .then((data) => setPays(data))
      .catch((err) => console.error("Erreur:", err));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Créer une preview de l'image
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      nom: "",
      description: "",
      pays: "",
    });
    setImageFile(null);
    setImagePreview("");
  };

  const handleCreateClick = () => {
    setShowForm(true);
    setFormUpdate(false);
    setEditingAntenne(null);
    resetForm();
  };

  const handleEditClick = (antenne: Antenne) => {
    setShowForm(true);
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

    // Si l'antenne a une image, on la montre en preview
    if (antenne.image) {
      setImagePreview(`http://localhost:5000${antenne.image}`);
    } else {
      setImagePreview("");
    }
    setImageFile(null);
  };

  const handleCancelUpdate = () => {
    setShowForm(false);
    setFormUpdate(false);
    setEditingAntenne(null);
    resetForm();
  };

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editingAntenne) return;

    setIsLoading(true);
    setMessage("");

    const formDataToSend = new FormData();
    formDataToSend.append("nom", formData.nom);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("pays", formData.pays);
    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/antenne/update/${editingAntenne._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        setMessage("Antenne modifiée avec succès !");
        fetchAntennes();
        handleCancelUpdate();
      } else {
        setMessage("Erreur lors de la modification");
      }
    } catch (error) {
      setMessage("Erreur de connexion :");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette antenne ?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/antenne/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (response.ok) {
        setMessage("Antenne supprimée avec succès !");
        fetchAntennes();
      } else {
        setMessage("Erreur lors de la suppression");
      }
    } catch (error) {
      setMessage("Erreur de connexion");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!imageFile) {
      setMessage("❌ Veuillez sélectionner une image");
      setIsLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("nom", formData.nom);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("pays", formData.pays);
    formDataToSend.append("image", imageFile);

    try {
      const response = await fetch(`http://localhost:5000/api/antenne/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Antenne créée avec succès !");
        setFormData({
          nom: "",
          description: "",
          pays: "",
        });
        fetchAntennes();
        setShowForm(false); // Ferme le formulaire après création
      } else {
        setMessage("Erreur lors de la création");
      }
    } catch (error) {
      setMessage("Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-extrabold ">Gestion Antennes</h1>
        <button onClick={handleCreateClick} className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg transition-all duration-200 font-semibold inline-flex items-center shadow-lg hover:shadow-xl transform hover:scale-105">
          Nouvelle Antenne
        </button>
      </div>

      {/* Formulaire conditionnel */}
      {showForm && (
        <form
          onSubmit={formUpdate ? handleUpdate : handleSubmit}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-8 rounded-full ${
                    formUpdate
                      ? "bg-gradient-to-b from-blue-500 to-blue-600"
                      : "bg-gradient-to-b from-yellow-500 to-amber-600"
                  }`}
                ></div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {formUpdate ? "Modifier l'Antenne" : "Nouvelle Antenne"}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {formUpdate
                      ? "Modifiez les informations de l'antenne"
                      : "Ajoutez une nouvelle antenne locale"}
                  </p>
                </div>
              </div>
            </div>

            {message && (
              <div
                className={`mb-6 p-4 rounded-lg border ${
                  message.includes("✅")
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "bg-red-50 border-red-200 text-red-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{message.includes("✅") ? "✅" : "❌"}</span>
                  <span className="text-sm font-medium">
                    {message.replace("✅", "").replace("❌", "")}
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4 items-start">
                <div>
                  <Label>Nom de l'antenne *</Label>
                  <Input
                    type="text"
                    value={formData.nom}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, nom: e.target.value })
                    }
                    placeholder="Paris, Lyon, Toulouse..."
                  />
                </div>

                <div>
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
                </div>
              </div>

              <div>
                <Label>Description *</Label>
                <TextArea
                  rows={4}
                  value={formData.description}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Décrivez les activités, le rôle et les objectifs de cette antenne..."
                />
              </div>

              {/* Section Image */}
              <div>
                <Label>
                  {formUpdate ? "Image de l'antenne" : "Image de l'antenne *"}
                  {!formUpdate && <span className="text-red-500 ml-1">*</span>}
                </Label>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    {formUpdate
                      ? "Choisissez une nouvelle image pour remplacer l'actuelle (optionnel)"
                      : "Sélectionnez une image représentative de l'antenne"}
                  </p>
                </div>

                {/* Preview de l'image */}
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Aperçu :
                    </p>
                    <div className="relative w-48 h-32 border border-gray-300 rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Image actuelle en modification */}
                {formUpdate &&
                  editingAntenne &&
                  editingAntenne.image &&
                  !imagePreview && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Image actuelle :
                      </p>
                      <div className="relative w-48 h-32 border border-gray-300 rounded-lg overflow-hidden">
                        <img
                          src={`http://localhost:5000${editingAntenne.image}`}
                          alt="Actuelle"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancelUpdate}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 rounded-lg text-white bg-yellow-500 hover:brightness-110 disabled:opacity-60"
                >
                  {isLoading
                    ? "Enregistrement…"
                    : formUpdate
                    ? "Modifier l'antenne"
                    : "Créer l'antenne"}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Section Liste des antennes */}
      <section className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Antennes existantes</h3>
          <span className="text-sm text-gray-500">
            {antennes.length} antenne(s)
          </span>
        </div>

        <div className="grid gap-4">
          {antennes.map((antenne) => (
            <div
              key={antenne._id}
              className="rounded-xl border border-gray-200 p-4 space-y-3 bg-white"
            >
              <div className="grid md:grid-cols-[auto_1fr_auto] gap-4 items-start">
                {/* Image de l'antenne */}
                {antenne.image && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={`http://localhost:5000${antenne.image}`}
                      alt={antenne.nom}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-900">
                      {antenne.nom}
                    </h4>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      {getPaysNom(antenne.pays)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{antenne.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleEditClick(antenne)}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-sm font-medium"
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(antenne._id)}
                    className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 text-sm font-medium"
                  >
                    Supprimer
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">ID: {antenne._id}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AntenneForm;
