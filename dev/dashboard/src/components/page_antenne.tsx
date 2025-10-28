import { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

type Antenne = {
  _id: string;
  nom: string;
  description: string;
  pays: string | { 
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

// UI helpers - IDENTIQUES à PagePaysForm
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

const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (p) => (
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
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false); // ✅ Nouvel état pour afficher/masquer le formulaire

  const getPaysNom = (paysData: string | { _id: string; nom: string }): string => {
    if (typeof paysData === 'object' && paysData !== null) {
      return paysData.nom;
    }
    const paysTrouve = pays.find(p => p._id === paysData);
    return paysTrouve ? paysTrouve.nom : "Pays inconnu";
  };

  useEffect(() => {
    fetchAntennes();
    fetchPays();
  }, []);

  const fetchAntennes = () => {
    fetch(`${API_BASE}/api/antenne/get`)
      .then((res) => res.json())
      .then((data) => setAntennes(data))
      .catch((err) => console.error("Erreur:", err));
  };

  const fetchPays = () => {
    fetch(`${API_BASE}/api/pays/get`)
      .then((res) => res.json())
      .then((data) => setPays(data))
      .catch((err) => console.error("Erreur:", err));
  };

  const handleCreateClick = () => {
    setShowForm(true); 
    setFormUpdate(false);
    setEditingAntenne(null);
    setFormData({
      nom: "",
      description: "",
      pays: "",
    });
  };

  const handleEditClick = (antenne: Antenne) => {
    setShowForm(true);
    setFormUpdate(true); 
    setEditingAntenne(antenne);
    
    let paysId = "";
    if (typeof antenne.pays === 'object') {
      paysId = antenne.pays._id;
    } else {
      paysId = antenne.pays;
    }

    setFormData({
      nom: antenne.nom,
      description: antenne.description,
      pays: paysId,
    });
  };

  const handleCancelUpdate = () => {
    setShowForm(false); // ✅ Masquer le formulaire
    setFormUpdate(false);
    setEditingAntenne(null);
    setFormData({
      nom: "",
      description: "",
      pays: "",
    });
  };

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editingAntenne) return;

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${API_BASE}/api/antenne/update/${editingAntenne._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
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
      setMessage("Erreur de connexion");
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
        `${API_BASE}/api/antenne/delete/${id}`,
        {
          method: "DELETE",
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

    try {
      const response = await fetch(`${API_BASE}/api/antenne/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Antenne créée avec succès !");
        setFormData({ 
          nom: "", 
          description: "", 
          pays: ""
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-[#93720a] bg-clip-text text-transparent">
            Gestion des Antennes
          </h2>
          <p className="text-gray-600">
            Créez et gérez les antennes locales de votre réseau
          </p>
        </div>
        {/* Bouton "Créer une antenne" dans le header */}
        {!showForm && (
          <button
            onClick={handleCreateClick}
            className="px-4 py-2 rounded-lg text-white bg-gradient-to-b from-yellow-500 to-[#93720a] hover:brightness-110"
          >
            + Créer une antenne
          </button>
        )}
      </div>

      {/* Formulaire conditionnel */}
      {showForm && (
        <form onSubmit={formUpdate ? handleUpdate : handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-8 rounded-full ${
                  formUpdate 
                    ? "bg-gradient-to-b from-blue-500 to-blue-600" 
                    : "bg-gradient-to-b from-yellow-500 to-amber-600"
                }`}></div>
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
                  <span className="text-sm font-medium">{message.replace("✅", "").replace("❌", "")}</span>
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
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    placeholder="Paris, Lyon, Toulouse..."
                  />
                </div>

                <div>
                  <Label>Pays *</Label>
                  <select
                    value={formData.pays}
                    required
                    onChange={(e) => setFormData({ ...formData, pays: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Décrivez les activités, le rôle et les objectifs de cette antenne..."
                />
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
                  className="px-4 py-2 rounded-lg text-white bg-gradient-to-b from-yellow-500 to-[#93720a] hover:brightness-110 disabled:opacity-60"
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

      {/* Section Liste des antennes - Toujours visible */}
      <section className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Antennes existantes</h3>
          <span className="text-sm text-gray-500">
            {antennes.length} antenne(s)
          </span>
        </div>

        {antennes.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-4xl mb-3 text-gray-300">🏢</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Aucune antenne créée
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Commencez par créer votre première antenne
            </p>
            <button
              onClick={handleCreateClick}
              className="px-4 py-2 rounded-lg text-white bg-gradient-to-b from-yellow-500 to-[#93720a] hover:brightness-110"
            >
              + Créer une antenne
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {antennes.map((antenne) => (
              <div
                key={antenne._id}
                className="rounded-xl border border-gray-200 p-4 space-y-3 bg-white"
              >
                <div className="grid md:grid-cols-[1fr_auto] gap-4 items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">
                        {antenne.nom}
                      </h4>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                        {getPaysNom(antenne.pays)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {antenne.description}
                    </p>
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
                  <span className="text-xs text-gray-500">
                    ID: {antenne._id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default AntenneForm;