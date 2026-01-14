const AccountModel = require("../models/AccountModel");
const bcrypt = require("bcrypt");

module.exports.getAccounts = async (req, res) => {
  try {
    const userAccount = await AccountModel.findById(req.user.sub);
    if (!userAccount) {
      return res.status(404).json({ error: "Compte introuvable" });
    }

    if (userAccount.statut === "S") {
      const accounts = await AccountModel.find();
      res.json(accounts);
    } else if (userAccount.statut === "X") {
      const accounts = await AccountModel.find({
        pays: userAccount.pays,
        statut: "O",
      });
      res.json(accounts);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des comptes :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

module.exports.saveAccount = async (req, res) => {
  try {
    const { nom, prenom, telephone, email, password, pays, statut, pole } = req.body;

    if (!nom || !prenom || !telephone || !email || !password || !pays || !pole) {
      return res.status(400).json({
        error: "Tous les champs sont requis : nom, prenom, telephone, email, password, pays, pole"
      });
    }

    const existingAccount = await AccountModel.findOne({ email });
    if (existingAccount) {
      return res.status(400).json({ error: "Un compte avec cet email existe déjà." });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const userAccount = await AccountModel.findById(req.user.sub);
    if (!userAccount) {
      return res.status(404).json({ error: "Compte introuvable" });
    }

    if (userAccount.statut !== "S") {
      if (userAccount.statut === "X") {
        if (String(userAccount.pays) !== pays) {
          return res.status(403).json({
            error: "Vous n'avez pas la permission de créer un compte pour ce pays."
          });
        }
        if (statut !== "O") {
          return res.status(403).json({
            error: "Vous n'avez pas la permission de créer un compte avec ce statut."
          });
        }
      } else {

        return res.status(403).json({ error: "Accès refusé." });
      }
    }

    const newAccount = await AccountModel.create({
      nom,
      prenom,
      telephone,
      email,
      password: hashedPassword,
      pays,
      statut: statut || "O",
      pole,
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
    const { nom, prenom, telephone, email, password, pays, statut, pole } = req.body;

    const existingAccount = await AccountModel.findById(id);
    if (!existingAccount) {
      return res.status(404).json({ error: "Compte introuvable" });
    }

    const userAccount = await AccountModel.findById(req.user.sub);
    if (!userAccount) {
      return res.status(404).json({ error: "Compte introuvable" });
    }

    if (userAccount.statut !== "S") {
      if (userAccount.statut === "X") {
        if (String(userAccount.pays) !== existingAccount.pays) {
          return res.status(403).json({
            error: "Vous n'avez pas la permission de mettre à jour un compte pour ce pays."
          });
        }
        if (existingAccount.statut !== "O") {
          return res.status(403).json({
            error: "Vous n'avez pas la permission de mettre à jour un compte avec ce statut."
          });
        }
      } else {

        return res.status(403).json({ error: "Accès refusé." });
      }
    }

    const updateData = {};
    if (nom) updateData.nom = nom;
    if (prenom) updateData.prenom = prenom;
    if (telephone) updateData.telephone = telephone;
    if (email) updateData.email = email;
    if (pays) updateData.pays = pays;
    if (statut) updateData.statut = statut;
    if (pole) updateData.pole = pole;

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }


    if (userAccount.statut !== "S") {
      if (userAccount.statut === "X") {
        if (String(userAccount.pays) !== pays) {
          return res.status(403).json({
            error: "Vous n'avez pas la permission de modifier un compte pour ce pays."
          });
        }
        if (updateData.statut !== "O") {
          return res.status(403).json({
            error: "Vous n'avez pas la permission de modifier un compte avec ce statut."
          });
        }
      } else {

        return res.status(403).json({ error: "Accès refusé." });
      }
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

    const userAccount = await AccountModel.findById(req.user.sub);
    if (!userAccount) {
      return res.status(404).json({ error: "Compte introuvable" });
    }

    const existingAccount = await AccountModel.findById(id);
    if (!existingAccount) {
      return res.status(404).json({ error: "Compte introuvable" });
    }

    if (userAccount.statut !== "S") {
      if (userAccount.statut === "X") {
        if (String(userAccount.pays) !== existingAccount.pays) {
          return res.status(403).json({
            error: "Vous n'avez pas la permission de supprimer un compte pour ce pays."
          });
        }
        if (existingAccount.statut !== "O") {
          return res.status(403).json({
            error: "Vous n'avez pas la permission de supprimer un compte avec ce statut."
          });
        }
      } else {

        return res.status(403).json({ error: "Accès refusé." });
      }
    }
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


