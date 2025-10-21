const PaysModel = require("../models/pays");
const NewsPaysModel = require("../models/newspays");

// GET /api/pays
module.exports.getPays = async (req, res) => {
  try {
    const pays = await PaysModel.find().sort({ nom: 1 });
    res.json(pays);
  } catch (error) {
    console.error("Error fetching pays:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/pays/:id
module.exports.getPaysById = async (req, res) => {
  try {
    const { id } = req.params;
    const pays = await PaysModel.findById(id);

    if (!pays) {
      return res.status(404).json({ error: "Pays introuvable" });
    }

    res.json(pays);
  } catch (error) {
    console.error("Error fetching pays by id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST /api/pays
module.exports.savePays = async (req, res) => {
  try {
    const { nom, description, image } = req.body;

    // Validation des champs requis
    if (!nom || !description || !image) {
      return res.status(400).json({
        error: "Champs requis manquants : nom, description, image",
      });
    }

    const newPays = await PaysModel.create({
      nom,
      description,
      image, // ex: "/uploads/pays/xxx.jpg" ou URL complète
    });

    console.log("Pays saved successfully...");
    res.status(201).json(newPays);
  } catch (error) {
    console.error("Error saving pays:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PATCH /api/pays/:id
module.exports.updatePays = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description, image } = req.body;

    if (!nom && !description && !image) {
      return res.status(400).json({
        error:
          "Au moins un champ doit être fourni : nom, description, image",
      });
    }

    const updateData = {};
    if (nom) updateData.nom = nom;
    if (description) updateData.description = description;
    if (image) updateData.image = image;

    const updatedPays = await PaysModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPays) {
      return res.status(404).json({ error: "Pays introuvable" });
    }

    res.json({ message: "Updated successfully", pays: updatedPays });
  } catch (error) {
    console.error("Error updating pays:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE /api/pays/:id
module.exports.deletePays = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPays = await PaysModel.findByIdAndDelete(id);

    if (!deletedPays) {
      return res.status(404).json({ error: "Pays introuvable" });
    }

    await NewsPaysModel.deleteMany({ pays: id });

    res.json({ message: "Deleted successfully", pays: deletedPays });
  } catch (error) {
    console.error("Error deleting pays:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
