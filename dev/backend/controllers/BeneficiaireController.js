const BeneficiaireModel = require("../models/BeneficiaireModel");
const path = require("path");
const fs = require("fs").promises; // comme dans ton PaysController

module.exports.getBeneficiaire = async (req, res) => {
  try {
    const beneficiaires = await BeneficiaireModel.find()
      .populate("benevole", "nom prenom email telephone statut");
    res.json(beneficiaires);
  } catch (error) {
    console.error("Error fetching beneficiaires:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getBeneficiaireID = async (req, res) => {
  try {
    const beneficiaire = await BeneficiaireModel.findById(req.params.id)
      .populate("benevole", "nom prenom email telephone statut");
    if (!beneficiaire) return res.status(404).json({ error: "Beneficiaire not found" });
    res.json(beneficiaire);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.saveBeneficiaire = async (req, res) => {
  try {
    const { nom, prenom, telephone, mail, benevole } = req.body;

    if (!nom || !prenom || !telephone || !mail || !benevole) {
      return res.status(400).json({
        error: "Tous les champs sont requis: nom, prenom, telephone, mail, benevole",
      });
    }

    const newBeneficiaire = await BeneficiaireModel.create({
      nom,
      prenom,
      telephone,
      mail,
      benevole,
    });

    console.log("Saved successfully...");
    res.status(201).json(newBeneficiaire);
  } catch (error) {
    console.error("Error saving beneficiaire:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.updateBeneficiaire = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, telephone, mail, benevole } = req.body;

    if (!nom && !prenom && !telephone && !mail && !benevole) {
      return res.status(400).json({
        error: "Au moins un champ doit être fourni: nom, prenom, telephone, mail, benevole",
      });
    }

    const updateData = {};
    if (nom) updateData.nom = nom;
    if (prenom) updateData.prenom = prenom;
    if (telephone) updateData.telephone = telephone;
    if (mail) updateData.mail = mail;
    if (benevole) updateData.benevole = benevole;

    const updatedBeneficiaire = await BeneficiaireModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate("benevole", "nom prenom email telephone statut");

    if (!updatedBeneficiaire) {
      return res.status(404).json({ error: "Beneficiaire not found" });
    }

    res.json({ message: "Updated successfully", beneficiaires: updatedBeneficiaire });
  } catch (error) {
    console.error("Error updating beneficiaire:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.deleteBeneficiaire = async (req, res) => {
  try {
    const { id } = req.params;

    const existingBenef = await BeneficiaireModel.findById(id);
    if (!existingBenef) {
      return res.status(404).json({ error: "Beneficiaire not found" });
    }

    // Supprimer tous les PDFs associés
    if (Array.isArray(existingBenef.pdf) && existingBenef.pdf.length > 0) {
      for (const pdfPath of existingBenef.pdf) {
        if (!pdfPath) continue;

        try {
          const relPath = pdfPath.replace(/^\/+/, ""); // "/pdf/xxx" -> "pdf/xxx"
          const absPdfPath = path.join(__dirname, "..", relPath);
          console.log("Suppression PDF (deleteBeneficiaire) :", absPdfPath);
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

    const deletedBeneficiaire = await BeneficiaireModel.findByIdAndDelete(id);

    res.json({ message: "Deleted successfully", beneficiaire: deletedBeneficiaire });
  } catch (error) {
    console.error("Error deleting beneficiaire:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.addPDF = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: "Aucun fichier PDF fourni." });
    }

    const pdfUrl = `/pdf/${req.file.filename}`;

    const existingBenef = await BeneficiaireModel.findById(id);
    if (!existingBenef) {
      return res.status(404).json({ error: "Bénéficiaire introuvable" });
    }

    existingBenef.pdf.push(pdfUrl);
    await existingBenef.save();

    res.json({ message: "PDF ajouté avec succès", beneficiaire: existingBenef, pdfUrl });
  } catch (error) {
    console.error("Erreur lors de l'ajout du PDF :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// 🔥 Nouveau : supprimer UN seul PDF
module.exports.deletePDF = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.query.file;

    if (!file || typeof file !== "string") {
      return res.status(400).json({ error: "Paramètre 'file' manquant" });
    }

    const existingBenef = await BeneficiaireModel.findById(id);
    if (!existingBenef) {
      return res.status(404).json({ error: "Bénéficiaire introuvable" });
    }

    const index = existingBenef.pdf.indexOf(file);
    if (index === -1) {
      return res.status(404).json({ error: "PDF non trouvé pour ce bénéficiaire" });
    }

    // suppression du fichier physique
    try {
      const relPath = file.replace(/^\/+/, ""); // "/pdf/xxx" -> "pdf/xxx"
      const absPdfPath = path.join(__dirname, "..", relPath);
      console.log("Suppression PDF (deletePDF) :", absPdfPath);
      await fs.access(absPdfPath);
      await fs.unlink(absPdfPath);
    } catch (errFile) {
      if (errFile.code === "ENOENT") {
        console.warn("PDF déjà inexistant ou introuvable :", file);
      } else {
        console.warn("Erreur suppression fichier PDF :", file, errFile);
      }
    }

    // suppression de l'entrée dans le tableau
    existingBenef.pdf.splice(index, 1);
    await existingBenef.save();

    res.json({ message: "PDF supprimé avec succès", beneficiaire: existingBenef });
  } catch (error) {
    console.error("Erreur lors de la suppression du PDF :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
