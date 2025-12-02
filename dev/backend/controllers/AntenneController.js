const AntenneModel = require("../models/AntenneModel");
const PaysModel = require("../models/pays");
const AccountModel = require("../models/AccountModel");
const fs = require("fs").promises;
const path = require("path");

module.exports.getAntennes = async (req, res) => {
  try {
    const { nom, pays } = req.query;
    const filtre = {};

    if (nom) {
      filtre.nom = new RegExp(`^${nom}$`, 'i');
    }

    if (pays) {
      if (typeof pays === "string" && pays.includes(",")) {
        filtre.pays = { $in: pays.split(",").map((id) => id.trim()) };
      } else {
        filtre.pays = pays;
      }
    }

    const antennes = await AntenneModel
      .find(filtre)
      .populate("pays", "nom description image");

    res.json(antennes);
  } catch (error) {
    console.error("Error fetching antennes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.saveAntenne = async (req, res) => {
  try {
    const { nom, description, pays } = req.body;
  
    // const image = req.file ? `/uploads/${req.file.filename}` : null;

    const image = req.files?.image?.[0] ? `/uploads/${req.files.image[0].filename}` : null;
    const galerie1 = req.files?.galerie1?.[0] ? `/uploads/${req.files.galerie1[0].filename}` : null;
    const galerie2 = req.files?.galerie2?.[0] ? `/uploads/${req.files.galerie2[0].filename}` : null;

    if (!nom || !description || !pays) {
      return res.status(400).json({
        error: "Tous les champs sont requis: nom, description, pays"
      });
    }

    const existingPays = await PaysModel.findById(pays);
    const userAccount = await AccountModel.findById(req.user.sub);
    if (userAccount.statut !== "S") {
      if (userAccount.statut === "X") {
        if (String(userAccount.pays) !== existingPays.nom) {
          return res.status(403).json({
            error: "Vous n'avez pas la permission de créer une antenne pour ce pays."
          });
        }
      } else {

        return res.status(403).json({ error: "Accès refusé." });
      }
    }

    const newAntenne = await AntenneModel.create({
      nom,
      description,
      image,
      galerie1,
      galerie2,
      pays
    });

    console.log("Antenne saved successfully...");
    res.status(201).json(newAntenne);
  } catch (error) {
    console.error("Error saving antenne:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.updateAntenne = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description, pays } = req.body;
    
    const newImage = req.files?.image?.[0] ? `/uploads/${req.files.image[0].filename}` : null;
    const newGalerie1 = req.files?.galerie1?.[0] ? `/uploads/${req.files.galerie1[0].filename}` : null;
    const newGalerie2 = req.files?.galerie2?.[0] ? `/uploads/${req.files.galerie2[0].filename}` : null;

    if (!nom && !description && !newImage && !newGalerie1 && !newGalerie2 && !pays) {
      return res.status(400).json({
        error: "Au moins un champ doit être fourni: nom, description, image, galerie1, galerie2, pays"
      });
    }
    const existingAntenne = await AntenneModel.findById(id);
    if (!existingAntenne) {
      return res.status(404).json({ error: "Antenne not found" });
    }

    const existingPays = await PaysModel.findById(existingAntenne.pays);
    const userAccount = await AccountModel.findById(req.user.sub);
    if (userAccount.statut !== "S") {
      if (userAccount.statut === "X") {
        if (String(userAccount.pays) !== existingPays.nom) {
          return res.status(403).json({
            error: "Vous n'avez pas la permission de mettre à jour une antenne pour ce pays."
          });
        }
      } else {

        return res.status(403).json({ error: "Accès refusé." });
      }
    }

    const updateData = {};
    if (nom) updateData.nom = nom;
    if (description) updateData.description = description;
    if (pays) updateData.pays = pays;

    const deleteIfExists = async (filePath) => {
      if (!filePath) return;
      const fullPath = path.join(__dirname, "..", filePath.replace(/^\/+/, ""));
      try {
        await fs.unlink(fullPath);
        console.log("Fichier supprimé :", fullPath);
      } catch (err) {
        if (err.code === "ENOENT") {
          console.log("Fichier non trouvé :", fullPath);
        } else {
          console.warn("Erreur suppression fichier :", err.message);
        }
      }
    };

    if (newImage) {
      await deleteIfExists(existingAntenne.image);
      updateData.image = newImage;
    }
    if (newGalerie1) {
      await deleteIfExists(existingAntenne.galerie1);
      updateData.galerie1 = newGalerie1;
    }
    if (newGalerie2) {
      await deleteIfExists(existingAntenne.galerie2);
      updateData.galerie2 = newGalerie2;
    }

    const updatePays = await PaysModel.findById(updateData.pays);
    if (userAccount.statut !== "S") {
      if (userAccount.statut === "X") {
        if (String(userAccount.pays) !== updatePays.nom) {
          return res.status(403).json({
            error: "Vous n'avez pas la permission de mettre à jour cette antenne pour un autre pays."
          });
        }
      } else {

        return res.status(403).json({ error: "Accès refusé." });
      }
    }

    const updatedAntenne = await AntenneModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedAntenne) {
      return res.status(404).json({ error: "Antenne not found" });
    }

    console.log("Antenne mise à jour:", updatedAntenne.nom);
    res.json({ message: "Updated successfully", antenne: updatedAntenne });
  } catch (error) {
    console.error("Error updating antenne:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.deleteAntenne = async (req, res) => {
  try {
    const { id } = req.params;

    const existingAntenne = await AntenneModel.findById(id);
    if (!existingAntenne) {
      return res.status(404).json({ error: "Antenne not found" });
    }
    const existingPays = await PaysModel.findById(existingAntenne.pays);
    const userAccount = await AccountModel.findById(req.user.sub);
    if (userAccount.statut !== "S") {
      if (userAccount.statut === "X") {
        if (String(userAccount.pays) !== existingPays.nom) {
          return res.status(403).json({
            error: "Vous n'avez pas la permission de supprimer cette antenne pour un autre pays."
          });
        }
      } else {

        return res.status(403).json({ error: "Accès refusé." });
      }
    }

    const deletedAntenne = await AntenneModel.findByIdAndDelete(id);

    if (!deletedAntenne) {
      return res.status(404).json({ error: "Antenne not found" });
    }

    const deleteFile = async (filePath) => {
      if (!filePath) return;
      const fullPath = path.join(__dirname, "..", filePath.replace(/^\/+/, ""));
      try {
        await fs.unlink(fullPath);
        console.log("Fichier supprimé :", fullPath);
      } catch (err) {
        if (err.code === "ENOENT") {
          console.log("Fichier non trouvé :", fullPath);
        } else {
          console.warn("Erreur suppression fichier :", err.message);
        }
      }
    };

    await deleteFile(deletedAntenne.image);
    await deleteFile(deletedAntenne.galerie1);
    await deleteFile(deletedAntenne.galerie2);

    res.json({ message: "Deleted successfully", antenne: deletedAntenne });
  } catch (error) {
    console.error("Error deleting antenne:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};