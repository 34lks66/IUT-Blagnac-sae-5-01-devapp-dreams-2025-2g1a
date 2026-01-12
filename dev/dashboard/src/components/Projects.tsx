import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [paysList, setPaysList] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [paysId, setPaysId] = useState("");

  useEffect(() => {
    fetchProjects();
    fetchPays();
  }, []);

  const fetchProjects = () => {
    apiFetch("/api/project/get")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  };

  const fetchPays = () => {
    apiFetch("/api/pays/get")
      .then((res) => res.json())
      .then((data) => setPaysList(data))
      .catch((err) => console.error(err));
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPaysId("");
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (project: any) => {
    setTitle(project.title);
    setDescription(project.description);
    setPaysId(project.pays?._id || project.pays); // Handle populated or id
    setEditingId(project._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) return;

    try {
      await apiFetch(`/api/project/delete/${id}`, { method: "DELETE" });
      setProjects(projects.filter(p => p._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      pays: paysId
    };

    try {
      if (editingId) {
        // Update
        const res = await apiFetch(`/api/project/update/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
           fetchProjects(); // Refresh to get populated data if needed
           resetForm();
        }
      } else {
        // Create
        const res = await apiFetch("/api/project/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          fetchProjects();
          resetForm();
        }
      }
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Projets</h2>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Nouveau Projet
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold mb-4">{editingId ? "Modifier le projet" : "Ajouter un projet"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Titre</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Pays</label>
              <select
                value={paysId}
                onChange={(e) => setPaysId(e.target.value)}
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none"
                required
              >
                <option value="">Sélectionner un pays</option>
                {paysList.map(p => (
                  <option key={p._id} value={p._id}>{p.nom}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none"
                rows={4}
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition-colors shadow-sm"
              >
                {editingId ? "Mettre à jour" : "Sauvegarder"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b-2 border-yellow-200">
              <th className="px-6 py-4 font-semibold border-b border-gray-100">Titre</th>
              <th className="px-6 py-4 font-semibold border-b border-gray-100">Pays</th>
              <th className="px-6 py-4 font-semibold border-b border-gray-100">Description</th>
              <th className="px-6 py-4 font-semibold border-b border-gray-100 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.map((project) => (
              <tr key={project._id} className="hover:bg-gray-50/80 transition-colors group">
                <td className="px-6 py-4">
                   <div className="font-semibold text-gray-900">{project.title}</div>
                </td>
                <td className="px-6 py-4">
                    {project.pays?.nom || "Non défini"}
                </td>
                <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={project.description}>
                  {project.description}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => handleEdit(project)}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-sm font-medium transition-colors"
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(project._id)}
                      className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 text-sm font-medium transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                 <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    Aucun projet trouvé. Commencez par en ajouter un !
                 </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
