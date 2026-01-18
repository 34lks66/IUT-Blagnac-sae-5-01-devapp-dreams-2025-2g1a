const fs = require("fs");
const path = require("path");

const PDF_BASE_DIR = path.join(__dirname, "../pdf");

// Créer le répertoire s'il n'existe pas
if (!fs.existsSync(PDF_BASE_DIR)) {
  fs.mkdirSync(PDF_BASE_DIR, { recursive: true });
}

module.exports.uploadPolePdfs = async (req, res) => {
  try {
    const { pole } = req.params;

    if (!pole) {
      return res.status(400).json({ error: "Pôle requis" });
    }

    // Valider que le pôle ne contient que des caractères sûrs
    if (!/^[a-zA-Z0-9_-]+$/.test(pole)) {
      return res.status(400).json({ error: "Pôle invalide" });
    }

    const poleDir = path.join(PDF_BASE_DIR, pole);

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
    const { pole } = req.params;

    if (!pole) {
      return res.status(400).json({ error: "Pôle requis" });
    }

    // Valider que le pôle ne contient que des caractères sûrs
    if (!/^[a-zA-Z0-9_-]+$/.test(pole)) {
      return res.status(400).json({ error: "Pôle invalide" });
    }

    const poleDir = path.join(PDF_BASE_DIR, pole);

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
    const { pole } = req.params;
    const { file } = req.query;

    if (!pole || !file) {
      return res.status(400).json({ error: "Pôle et fichier requis" });
    }

    // Valider que le pôle ne contient que des caractères sûrs
    if (!/^[a-zA-Z0-9_-]+$/.test(pole)) {
      return res.status(400).json({ error: "Pôle invalide" });
    }

    const poleDir = path.join(PDF_BASE_DIR, pole);
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
