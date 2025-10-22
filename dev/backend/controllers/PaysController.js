const PaysModel = require("../models/pays");
const NewsPaysModel = require("../models/newsPays"); // 👈 on importe le modèle des actus

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
    const { nom, description, image } = req.body;

    // Validation des champs requis
    if (!nom || !description || !image) {
      return res.status(400).json({
        error: "Tous les champs sont requis: nom, description, image",
      });
    }

    const newPays = await PaysModel.create({
      nom,
      description,
      image,
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
    const { nom, description, image } = req.body;

    if (!nom && !description && !image) {
      return res.status(400).json({
        error:
          "Au moins un champ doit être fourni: nom, description, image",
      });
    }

    const updateData = {};
    if (nom) updateData.nom = nom;
    if (description) updateData.description = description;
    if (image) updateData.image = image;

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

    // 1) Supprime le pays
    const deletedPays = await PaysModel.findByIdAndDelete(id);

    if (!deletedPays) {
      return res.status(404).json({ error: "Pays not found" });
    }

    // 2) Supprime toutes les actualités liées à ce pays
    const deleteResult = await NewsPaysModel.deleteMany({ pays: id });

    res.json({
      message: "Deleted successfully",
      pays: deletedPays,
      deletedNewsCount: deleteResult.deletedCount || 0, // 👈 utile pour savoir combien ont été supprimées
    });
  } catch (error) {
    console.error("Error deleting pays:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
