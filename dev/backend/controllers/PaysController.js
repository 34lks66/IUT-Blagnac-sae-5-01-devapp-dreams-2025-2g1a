const PaysModel = require("../models/pays");
const NewsPaysModel = require("../models/newsPays");
const AntenneModel = require("../models/AntenneModel"); // 👈 NEW: pour supprimer les antennes liées
const AccountModel = require("../models/AccountModel");

//ajoutés pour gérer les fichiers comme dans ton NewsController
const path = require("path");
const fs = require("fs").promises;

module.exports.getPays = async (req, res) => {
  try {
    const pays = await PaysModel.find();
    res.json(pays);
  } catch (error) {
    console.error("Error fetching pays:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.savePays = async (req, res) => {
  try {
    const { nom, description, nomSiege, adresse, horaire, mail, number } = req.body;

    // ✅ image via Multer (comme dans ton autre controller)
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    // si tu veux la rendre obligatoire, laisse ce check strict
    if (!nom || !description || !image) {
      return res.status(400).json({
        error: "Tous les champs sont requis: nom, description, image",
      });
    }

    const newPays = await PaysModel.create({
      nom,
      description,
      image,
      nomSiege,
      adresse,
      horaire,
      mail,
      number
    });

    console.log("Saved successfully...");
    res.status(201).json(newPays);
  } catch (error) {
    console.error("Error saving pays:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.updatePays = async (req, res) => {
  try {
    const { id } = req.params;

    // on récupère l'existant pour savoir quoi remplacer/supprimer
    const existingPays = await PaysModel.findById(id);
    if (!existingPays) {
      return res.status(404).json({ error: "Pays not found" });
    }

    const user = req.user;

    const userAccount = await AccountModel.findById(user.sub);

    if (userAccount.statut !== "S") {
      if (userAccount.statut === "X") {
        if (String(userAccount.pays) !== existingPays.nom) {
          return res.status(403).json({
            error: "Vous n'avez pas la permission de modifier ce pays."
          });
        }
      } else {

        return res.status(403).json({ error: "Accès refusé." });
      }
    }

    const { nom, description, nomSiege, adresse, horaire, mail, number } = req.body;

    // nouvelle image uploadée ?
    const newImage = req.file ? `/uploads/${req.file.filename}` : null;

    if (!nom && !description && !newImage) {
      return res.status(400).json({
        error: "Au moins un champ doit être fourni: nom, description, image",
      });
    }


    // si une nouvelle image arrive, on supprime l’ancienne du disque
    if (newImage && existingPays.image) {
      try {
        const relPath = existingPays.image.replace(/^\/+/, "");
        const absImagePath = path.join(__dirname, "..", relPath);
        await fs.access(absImagePath);
        await fs.unlink(absImagePath);
        console.log("Ancienne image du pays supprimée :", absImagePath);
      } catch (errFile) {
        console.warn("Erreur suppression ancienne image pays :", errFile);
      }
    }

    // on construit les nouvelles valeurs
    const updateData = {
      nom: nom || existingPays.nom,
      description: description || existingPays.description,
      image: newImage || existingPays.image,
      nomSiege: nomSiege || existingPays.nomSiege,
      adresse: adresse || existingPays.adresse,
      horaire: horaire || existingPays.horaire,
      mail: mail || existingPays.mail,
      number: number || existingPays.number
    };

    const updatedPays = await PaysModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedPays) {
      return res.status(404).json({ error: "Pays not found" });
    }

    res.json({ message: "Updated successfully", pays: updatedPays });
  } catch (error) {
    console.error("Error updating pays:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.deletePays = async (req, res) => {
  try {
    const { id } = req.params;

    // on récupère le pays d’abord pour connaître le chemin image
    const existingPays = await PaysModel.findById(id);
    if (!existingPays) {
      return res.status(404).json({ error: "Pays not found" });
    }

    // suppression du fichier image du pays (si présent)
    if (existingPays.image) {
      try {
        const relPath = existingPays.image.replace(/^\/+/, "");
        const absImagePath = path.join(__dirname, "..", relPath);
        console.log("Suppression image pays :", absImagePath);
        await fs.access(absImagePath);
        await fs.unlink(absImagePath);
      } catch (errFile) {
        console.warn("Erreur suppression image pays :", errFile);
      }
    }

    // suppression du document pays
    const deletedPays = await PaysModel.findByIdAndDelete(id);

    // suppression des actualités liées (+ suppression de leurs images si présentes)
    const relatedNews = await NewsPaysModel.find({ pays: id });
    for (const n of relatedNews) {
      if (n.image) {
        try {
          const rel = n.image.replace(/^\/+/, "");
          const abs = path.join(__dirname, "..", rel);
          await fs.access(abs);
          await fs.unlink(abs);
          console.log("Image news-pays supprimée :", abs);
        } catch (errFile) {
          console.warn("Erreur suppression image news-pays :", errFile);
        }
      }
    }
    const deleteNewsResult = await NewsPaysModel.deleteMany({ pays: id });

    const deleteAntennesResult = await AntenneModel.deleteMany({ pays: id });

    res.json({
      message: "Deleted successfully",
      pays: deletedPays,
      deletedNewsCount: deleteNewsResult.deletedCount || 0,
      deletedAntennesCount: deleteAntennesResult.deletedCount || 0, // 👈 renvoyé pour info
    });
  } catch (error) {
    console.error("Error deleting pays:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
