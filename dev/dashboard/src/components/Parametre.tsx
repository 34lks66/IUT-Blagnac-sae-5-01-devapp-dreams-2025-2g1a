import { useState, useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { apiFetch } from "../services/api";
import { useNavigate } from "react-router-dom";

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

function Parametre() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { user, setUser } = useContext(AuthContext)!;

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profileData, setProfileData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        nom: user.nom || "",
        prenom: user.prenom || "",
        telephone: user.telephone || "",
      });
    }
  }, [user]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [profileMessage, setProfileMessage] = useState("");
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProfileLoading(true);
    setProfileMessage("");

    try {
      const response = await apiFetch("/api/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (response.ok) {
        setProfileMessage("Informations mises à jour avec succès !");
        // Update user context with new data
        setUser({ ...user!, ...profileData });
      } else {
        setProfileMessage(data.message || "Erreur lors de la mise à jour");
      }
    } catch (error) {
      console.error(error);
      setProfileMessage("Erreur de connexion");
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    // Validation
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("Les nouveaux mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setMessage("Le nouveau mot de passe doit contenir au moins 6 caractères");
      setIsLoading(false);
      return;
    }

    try {
      // Appel à l'API pour changer le mot de passe
      const response = await apiFetch(`/api/change-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      if (response.ok) {
        setMessage("Mot de passe modifié avec succès !");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        // Déconnexion après un délai
      } else {
        const error = await response.json();
        setMessage(error.message || "Erreur lors du changement de mot de passe");
      }
    } catch (error) {
      console.error(error);
      setMessage("Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    formData.currentPassword &&
    formData.newPassword &&
    formData.confirmPassword &&
    formData.newPassword === formData.confirmPassword;

  return (
    <div className="space-y-8">
      {/* SECTION INFORMATIONS PERSONNELLES */}
      <section className="border border-gray-200 rounded-xl p-6 bg-white">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-600">
            Informations personnelles
          </h2>
          <p className="text-gray-600 mt-2">
            Gérez vos informations personnelles.
          </p>
        </div>

        <div className="max-w-2xl">
          {profileMessage && (
            <div
              className={`mb-6 p-4 rounded-lg border text-sm ${profileMessage.includes("Erreur")
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-green-50 border-green-200 text-green-700"
                }`}
            >
              {profileMessage}
            </div>
          )}

          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="nom">Nom</Label>
                <Input
                  type="text"
                  id="nom"
                  name="nom"
                  value={profileData.nom}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="prenom">Prénom</Label>
                <Input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={profileData.prenom}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={profileData.telephone}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  value={user?.email || ""}
                  disabled
                  className="bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <Label htmlFor="pays">Pays</Label>
                <Input
                  type="text"
                  id="pays"
                  value={user?.pays || ""}
                  disabled
                  className="bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isProfileLoading}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${isProfileLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                  }`}
              >
                {isProfileLoading ? "Enregistrement..." : "Enregistrer les modifications"}
              </button>
            </div>
          </form>
        </div>
      </section>
      {/* SECTION CHANGEMENT DE MOT DE PASSE */}
      <section className="border border-gray-200 rounded-xl p-6 bg-white">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-yellow-500">
            Changer le mot de passe
          </h2>
          <p className="text-gray-600 mt-2">
            Modifiez votre mot de passe. Vous serez déconnecté après cette
            opération.
          </p>
        </div>

        <div className="max-w-2xl">
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg border text-sm ${message.includes("Erreur")
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-green-50 border-green-200 text-green-700"
                }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-5">
              {/* ANCIEN MOT DE PASSE */}
              <div>
                <Label htmlFor="currentPassword">Mot de passe actuel *</Label>
                <Input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                  placeholder="Entrez votre mot de passe actuel"
                />
              </div>

              {/* NOUVEAU MOT DE PASSE */}
              <div>
                <Label htmlFor="newPassword">Nouveau mot de passe *</Label>
                <Input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                  placeholder="Entrez votre nouveau mot de passe"
                  minLength={6}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Le mot de passe doit contenir au moins 6 caractères.
                </p>
              </div>

              {/* CONFIRMATION MOT DE PASSE */}
              <div>
                <Label htmlFor="confirmPassword">
                  Confirmer le nouveau mot de passe *
                </Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirmez votre nouveau mot de passe"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
              >
                Retour
              </button>
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${!isFormValid || isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-yellow-500 text-white hover:bg-yellow-600 hover:shadow-lg"
                  }`}
              >
                {isLoading
                  ? "Changement en cours..."
                  : "Changer le mot de passe"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* AUTRES SECTIONS PARAMÈTRES (POUR EXTENSIONS FUTURES) */}
      <section className="border border-gray-200 rounded-xl p-6 bg-white">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Préférences</h2>
          <p className="text-gray-600 mt-2">
            Gérez vos préférences et paramètres de compte.
          </p>
        </div>

        <div className="max-w-2xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <h3 className="font-medium text-gray-800">Notifications</h3>
                <p className="text-sm text-gray-600">
                  Gérer les notifications par email
                </p>
              </div>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium">
                Configurer
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <h3 className="font-medium text-gray-800">Confidentialité</h3>
                <p className="text-sm text-gray-600">
                  Paramètres de confidentialité
                </p>
              </div>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium">
                Modifier
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Parametre;
