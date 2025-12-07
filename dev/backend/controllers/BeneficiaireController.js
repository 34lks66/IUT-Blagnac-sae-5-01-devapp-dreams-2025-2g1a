const BeneficiaireModel = require("../models/BeneficiaireModel");

module.exports.getBeneficiaire = async (req, res) => {
  try {
    const beneficiaires = await BeneficiaireModel.find();
    res.json(beneficiaires);
  } catch (error) {
    console.error("Error fetching beneficiaires:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getBeneficiaireID = async (req, res) => {
  try {
    const beneficiaire = await BeneficiaireModel.findById(req.params.id);
    if (!beneficiaire) return res.status(404).json({ error: "Beneficiaire not found" });
    res.json(beneficiaire);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.saveBeneficiaire = async (req, res) => {
  try {
    const { nom, prenom, telephone, mail } = req.body;

    if (!nom || !prenom || !telephone || !mail) {
      return res.status(400).json({ 
        error: "Tous les champs sont requis: nom, prenom, telephone, mail" 
      });
    }

    const newBeneficiaire = await BeneficiaireModel.create({ 
      nom, 
      prenom, 
      telephone, 
      mail 
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
    const { nom, prenom, telephone, mail } = req.body;

    if (!nom && !prenom && !telephone && !mail) {
      return res.status(400).json({ 
        error: "Au moins un champ doit être fourni: nom, prenom, telephone, mail" 
      });
    }

    const updateData = {};
    if (nom) updateData.nom = nom;
    if (prenom) updateData.prenom = prenom;
    if (telephone) updateData.telephone = telephone;
    if (mail) updateData.mail = mail;

    const updatedBeneficiaire = await BeneficiaireModel.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true }
    );

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

    const deletedBeneficiaire = await BeneficiaireModel.findByIdAndDelete(id);

    if (!deletedBeneficiaire) {
      return res.status(404).json({ error: "Beneficiaire not found" });
    }

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
      return res.status(400).json({ error: 'Aucun fichier PDF fourni.' });
    }

    const pdfUrl = `/pdf/${req.file.filename}`;

    const existingBenef = await BeneficiaireModel.findById(id);
    if (!existingBenef) {
      return res.status(404).json({ error: 'Bénéficiaire introuvable' });
    }

    existingBenef.pdf.push(pdfUrl);
    await existingBenef.save();

    res.json({ message: 'PDF ajouté avec succès', beneficiaire: existingBenef, pdfUrl });
  } catch (error) {
    console.error("Erreur lors de l'ajout du PDF :", error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};