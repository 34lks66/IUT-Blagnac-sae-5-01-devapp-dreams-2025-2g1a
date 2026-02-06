const HebergeModel = require("../models/HebergeModel");
const path = require("path");
const fs = require("fs").promises;

module.exports.getHeberge = async (req, res) => {
  try {
    const heberges = await HebergeModel.find().populate("benevole", "nom prenom email telephone statut");
    res.json(heberges);
  } catch (error) {
    console.error("Error fetching heberges:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getHebergeID = async (req, res) => {
  try {
    const heberge = await HebergeModel.findById(req.params.id).populate("benevole", "nom prenom email telephone statut");
    if (!heberge) return res.status(404).json({ error: "Hebergé not found" });
    res.json(heberge);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.saveHeberge = async (req, res) => {
  try {
    const { nom, prenom, telephone, mail, benevole } = req.body;

    if (!nom || !prenom || !telephone || !mail || !benevole) {
      return res.status(400).json({ error: "Tous les champs sont requis: nom, prenom, telephone, mail, benevole" });
    }

    const newHeberge = await HebergeModel.create({ nom, prenom, telephone, mail, benevole });
    res.status(201).json(newHeberge);
  } catch (error) {
    console.error("Error saving heberge:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.updateHeberge = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, telephone, mail, benevole } = req.body;

    if (!nom && !prenom && !telephone && !mail && !benevole) {
      return res.status(400).json({ error: "Au moins un champ doit être fourni: nom, prenom, telephone, mail, benevole" });
    }

    const updateData = {};
    if (nom) updateData.nom = nom;
    if (prenom) updateData.prenom = prenom;
    if (telephone) updateData.telephone = telephone;
    if (mail) updateData.mail = mail;
    if (benevole) updateData.benevole = benevole;

    const updated = await HebergeModel.findByIdAndUpdate(id, updateData, { new: true }).populate("benevole", "nom prenom email telephone statut");
    if (!updated) return res.status(404).json({ error: "Hebergé not found" });
    res.json({ message: "Updated successfully", heberge: updated });
  } catch (error) {
    console.error("Error updating heberge:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.deleteHeberge = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await HebergeModel.findById(id);
    if (!existing) return res.status(404).json({ error: "Hebergé not found" });

    if (Array.isArray(existing.pdf) && existing.pdf.length > 0) {
      for (const pdfPath of existing.pdf) {
        if (!pdfPath) continue;
        try {
          const relPath = pdfPath.replace(/^\/+/, "");
          const absPdfPath = path.join(__dirname, "..", relPath);
          await fs.access(absPdfPath);
          await fs.unlink(absPdfPath);
        } catch (errFile) {
          if (errFile.code === "ENOENT") {
            console.warn("PDF déjà inexistant ou introuvable :", pdfPath);
          } else {
            console.warn("Erreur suppression PDF :", pdfPath, errFile);
          }
        }
      }
    }

    const deleted = await HebergeModel.findByIdAndDelete(id);
    res.json({ message: "Deleted successfully", heberge: deleted });
  } catch (error) {
    console.error("Error deleting heberge:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.addPDFHeberge = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file) return res.status(400).json({ error: "Aucun fichier PDF fourni." });
    const pdfUrl = `/pdf/${req.file.filename}`;
    const existing = await HebergeModel.findById(id);
    if (!existing) return res.status(404).json({ error: "Hebergé introuvable" });
    existing.pdf.push(pdfUrl);
    await existing.save();
    res.json({ message: "PDF ajouté avec succès", heberge: existing, pdfUrl });
  } catch (error) {
    console.error("Erreur lors de l'ajout du PDF :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

module.exports.deletePDFHeberge = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.query.file;
    if (!file || typeof file !== "string") return res.status(400).json({ error: "Paramètre 'file' manquant" });
    const existing = await HebergeModel.findById(id);
    if (!existing) return res.status(404).json({ error: "Hebergé introuvable" });

    const index = existing.pdf.indexOf(file);
    if (index === -1) return res.status(404).json({ error: "PDF non trouvé pour cet hébergé" });

    try {
      const relPath = file.replace(/^\/+/, "");
      const absPdfPath = path.join(__dirname, "..", relPath);
      await fs.access(absPdfPath);
      await fs.unlink(absPdfPath);
    } catch (errFile) {
      if (errFile.code === "ENOENT") {
        console.warn("PDF déjà inexistant ou introuvable :", file);
      } else {
        console.warn("Erreur suppression fichier PDF :", file, errFile);
      }
    }

    existing.pdf.splice(index, 1);
    await existing.save();
    res.json({ message: "PDF supprimé avec succès", heberge: existing });
  } catch (error) {
    console.error("Erreur lors de la suppression du PDF :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
