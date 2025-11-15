const NewsPaysModel = require("../models/newsPays");

// 🔴 ajoutés pour gérer les fichiers comme dans ton NewsController
const path = require("path");
const fs = require("fs").promises;

module.exports.getNewsPays = async (req, res) => {
  try {
    const { pays } = req.query; // ?pays=<id>

    const filter = {};
    if (pays) filter.pays = pays;

    const newspays = await NewsPaysModel
      .find(filter)
      .populate("pays", "nom description image");

    res.json(newspays);
  } catch (error) {
    console.error("Error fetching news pays:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getNewsPaysID = async (req, res) => {
  try {
    const news = await NewsPaysModel.findById(req.params.id);
    if (!news) return res.status(404).json({ error: "News not found" });
    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.saveNewsPays = async (req, res) => {
  try {
    const { titre, description, pays } = req.body;

    // ✅ image via Multer (comme dans ton autre controller)
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    // si tu veux la rendre obligatoire, on garde ce check
    if (!titre || !description || !image || !pays) {
      return res.status(400).json({
        error: "Tous les champs sont requis: titre, description, image, pays",
      });
    }

    const newNewsPays = await NewsPaysModel.create({
      titre,
      description,
      image,
      pays,
    });

    console.log("News pays saved successfully...");
    res.status(201).json(newNewsPays);
  } catch (error) {
    console.error("Error saving news pays:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.updateNewsPays = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, description, pays } = req.body;

    // nouvelle image uploadée ?
    const newImage = req.file ? `/uploads/${req.file.filename}` : null;

    if (!titre && !description && !newImage && !pays) {
      return res.status(400).json({
        error: "Au moins un champ doit être fourni: titre, description, image, pays",
      });
    }

    // on récupère l'existant pour savoir quoi remplacer/supprimer
    const existing = await NewsPaysModel.findById(id);
    if (!existing) {
      return res.status(404).json({ error: "News pays not found" });
    }

    // si une nouvelle image arrive, on supprime l’ancienne du disque
    if (newImage && existing.image) {
      try {
        const relPath = existing.image.replace(/^\/+/, "");
        const absImagePath = path.join(__dirname, "..", relPath);
        await fs.access(absImagePath);
        await fs.unlink(absImagePath);
        console.log("Ancienne image news-pays supprimée :", absImagePath);
      } catch (errFile) {
        console.warn("Erreur suppression ancienne image news-pays :", errFile);
      }
    }

    const updateData = {
      titre: titre || existing.titre,
      description: description || existing.description,
      pays: pays || existing.pays,
      image: newImage || existing.image,
    };

    const updatedNewsPays = await NewsPaysModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedNewsPays) {
      return res.status(404).json({ error: "News pays not found" });
    }

    res.json({ message: "Updated successfully", news: updatedNewsPays });
  } catch (error) {
    console.error("Error updating news pays:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.deleteNewsPays = async (req, res) => {
  try {
    const { id } = req.params;

    // récupérer d'abord pour supprimer l'image disque
    const existing = await NewsPaysModel.findById(id);
    if (!existing) {
      return res.status(404).json({ error: "News pays not found" });
    }

    if (existing.image) {
      try {
        const relPath = existing.image.replace(/^\/+/, "");
        const absImagePath = path.join(__dirname, "..", relPath);
        console.log("Chemin absolu de l'image à supprimer :", absImagePath);
        await fs.access(absImagePath);
        await fs.unlink(absImagePath);
        console.log("Image news-pays supprimée :", absImagePath);
      } catch (errFile) {
        console.warn("Erreur lors de la suppression du fichier image :", errFile);
      }
    }

    const deletedNewsPays = await NewsPaysModel.findByIdAndDelete(id);

    if (!deletedNewsPays) {
      return res.status(404).json({ error: "News pays not found" });
    }

    res.json({ message: "Deleted successfully", news: deletedNewsPays });
  } catch (error) {
    console.error("Error deleting news pays:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
