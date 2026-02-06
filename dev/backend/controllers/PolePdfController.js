const fs = require("fs");
const path = require("path");
const AccountModel = require("../models/AccountModel");

const PDF_BASE_DIR = path.join(__dirname, "../pdf");

// Créer le répertoire s'il n'existe pas
if (!fs.existsSync(PDF_BASE_DIR)) {
  fs.mkdirSync(PDF_BASE_DIR, { recursive: true });
}

// Vérifier les permissions de l'utilisateur
const checkUserPermission = async (userId, pays, pole) => {
  const userAccount = await AccountModel.findById(userId);
  if (!userAccount) {
    return { authorized: false, error: "Compte introuvable" };
  }

  // Super admin (S) peut tout faire
  if (userAccount.statut === "S") {
    return { authorized: true };
  }

  // Admin pays (X) ne peut gérer que son propre pays
  if (userAccount.statut === "X") {
    if (String(userAccount.pays) !== pays) {
      return { authorized: false, error: "Vous n'avez pas la permission d'accéder aux PDFs de ce pays." };
    }
    return { authorized: true };
  }

  // Les utilisateurs normaux peuvent accéder uniquement à leurs propres PDFs (même pays et pôle)
  if (String(userAccount.pays) !== pays || userAccount.pole !== pole) {
    return { authorized: false, error: "Vous n'avez la permission d'accéder que aux PDFs de votre propre pôle." };
  }

  return { authorized: true };
};

module.exports.uploadPolePdfs = async (req, res) => {
  try {
    const { pays, pole } = req.params;

    if (!pays || !pole) {
      return res.status(400).json({ error: "Pays et pôle requis" });
    }

    // Valider que les paramètres ne contiennent que des caractères sûrs
    if (!/^[a-zA-Z0-9_-]+$/.test(pays)) {
      return res.status(400).json({ error: "Pays invalide" });
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(pole)) {
      return res.status(400).json({ error: "Pôle invalide" });
    }

    // Vérifier les permissions
    const permission = await checkUserPermission(req.user.sub, pays, pole);
    if (!permission.authorized) {
      return res.status(403).json({ error: permission.error });
    }

    const poleDir = path.join(PDF_BASE_DIR, pays, pole);

    // Créer le répertoire du pôle s'il n'existe pas
    if (!fs.existsSync(poleDir)) {
      fs.mkdirSync(poleDir, { recursive: true });
    }

    // Vérifier que des fichiers ont été uploadés
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Aucun fichier uploadé" });
    }

    const uploadedFiles = [];

    // Sauvegarder chaque fichier
    for (const file of req.files) {
      // Vérifier que c'est un PDF
      if (file.mimetype !== "application/pdf") {
        continue; // Ignorer les fichiers non-PDF
      }

      const fileName = `${Date.now()}_${file.originalname}`;
      const filePath = path.join(poleDir, fileName);

      // Écrire le fichier
      fs.writeFileSync(filePath, file.buffer);
      uploadedFiles.push(fileName);
    }

    if (uploadedFiles.length === 0) {
      return res.status(400).json({ error: "Aucun fichier PDF valide" });
    }

    // Retourner la liste des fichiers du pôle
    const files = fs.readdirSync(poleDir);

    res.json({
      message: `${uploadedFiles.length} PDF(s) uploadé(s) avec succès`,
      files: files,
    });
  } catch (error) {
    console.error("Erreur lors de l'upload des PDFs :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

module.exports.getPolePdfs = async (req, res) => {
  try {
    const { pays, pole } = req.params;

    if (!pays || !pole) {
      return res.status(400).json({ error: "Pays et pôle requis" });
    }

    // Valider que les paramètres ne contiennent que des caractères sûrs
    if (!/^[a-zA-Z0-9_-]+$/.test(pays)) {
      return res.status(400).json({ error: "Pays invalide" });
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(pole)) {
      return res.status(400).json({ error: "Pôle invalide" });
    }

    // Vérifier les permissions
    const permission = await checkUserPermission(req.user.sub, pays, pole);
    if (!permission.authorized) {
      return res.status(403).json({ error: permission.error });
    }

    const poleDir = path.join(PDF_BASE_DIR, pays, pole);

    // Si le répertoire n'existe pas, retourner une liste vide
    if (!fs.existsSync(poleDir)) {
      return res.json({ files: [] });
    }

    // Lire les fichiers du répertoire
    const files = fs.readdirSync(poleDir);

    res.json({ files: files });
  } catch (error) {
    console.error("Erreur lors de la récupération des PDFs :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

module.exports.deletePolePdf = async (req, res) => {
  try {
    const { pays, pole } = req.params;
    const { file } = req.query;

    if (!pays || !pole || !file) {
      return res.status(400).json({ error: "Pays, pôle et fichier requis" });
    }

    // Valider que les paramètres ne contiennent que des caractères sûrs
    if (!/^[a-zA-Z0-9_-]+$/.test(pays)) {
      return res.status(400).json({ error: "Pays invalide" });
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(pole)) {
      return res.status(400).json({ error: "Pôle invalide" });
    }

    // Vérifier les permissions
    const permission = await checkUserPermission(req.user.sub, pays, pole);
    if (!permission.authorized) {
      return res.status(403).json({ error: permission.error });
    }

    const poleDir = path.join(PDF_BASE_DIR, pays, pole);
    const filePath = path.join(poleDir, file);

    // Vérifier que le fichier existe et qu'il est bien dans le répertoire du pôle
    if (!fs.existsSync(filePath) || !filePath.startsWith(poleDir)) {
      return res.status(404).json({ error: "Fichier non trouvé" });
    }

    // Supprimer le fichier
    fs.unlinkSync(filePath);

    // Retourner la liste mise à jour des fichiers
    const files = fs.readdirSync(poleDir);

    res.json({
      message: "PDF supprimé avec succès",
      files: files,
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du PDF :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};


