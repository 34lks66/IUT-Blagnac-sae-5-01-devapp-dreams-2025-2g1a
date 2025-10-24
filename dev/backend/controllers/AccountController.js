const AccountModel = require("../models/AccountModel");
const bcrypt = require("bcrypt");

module.exports.getAccounts = async (req, res) => {
  try {
    const accounts = await AccountModel.find();
    res.json(accounts);
  } catch (error) {
    console.error("Erreur lors de la récupération des comptes :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

module.exports.saveAccount = async (req, res) => {
  try {
    const { nom, prenom, telephone, email, password, pays, statut } = req.body;

    if (!nom || !prenom || !telephone || !email || !password || !pays) {
      return res.status(400).json({
        error: "Tous les champs sont requis : nom, prenom, telephone, email, password, pays"
      });
    }

    const existingAccount = await AccountModel.findOne({ email });
    if (existingAccount) {
      return res.status(400).json({ error: "Un compte avec cet email existe déjà." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAccount = await AccountModel.create({
      nom,
      prenom,
      telephone,
      email,
      password: hashedPassword,
      pays,
      statut: statut || "O"
    });

    console.log("Compte créé avec succès !");
    res.status(201).json(newAccount);
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du compte :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

module.exports.updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, telephone, email, password, pays, statut } = req.body;

    
    const updateData = {};
    if (nom) updateData.nom = nom;
    if (prenom) updateData.prenom = prenom;
    if (telephone) updateData.telephone = telephone;
    if (email) updateData.email = email;
    if (pays) updateData.pays = pays;
    if (statut) updateData.statut = statut;

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedAccount = await AccountModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedAccount) {
      return res.status(404).json({ error: "Compte introuvable" });
    }

    res.json({ message: "Compte mis à jour avec succès", account: updatedAccount });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du compte :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

module.exports.deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAccount = await AccountModel.findByIdAndDelete(id);

    if (!deletedAccount) {
      return res.status(404).json({ error: "Compte introuvable" });
    }

    res.json({ message: "Compte supprimé avec succès", account: deletedAccount });
  } catch (error) {
    console.error("Erreur lors de la suppression du compte :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
