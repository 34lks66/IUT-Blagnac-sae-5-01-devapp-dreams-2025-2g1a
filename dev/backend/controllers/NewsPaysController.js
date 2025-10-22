const NewsPaysModel = require("../models/newsPays");

module.exports.getNewsPays = async (req, res) => {
  try {
    const { pays } = req.query; // 🔹 On récupère le paramètre ?pays=ID depuis l’URL

    let filter = {};
    if (pays) {
      filter.pays = pays; // si un ID de pays est fourni, on filtre dessus
    }

    const newspays = await NewsPaysModel.find(filter).populate("pays", "nom description image");

    res.json(newspays);
  } catch (error) {
    console.error("Error fetching news pays:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.saveNewsPays = async (req, res) => {
  try {
    const { titre, description, image, pays } = req.body;

    if (!titre || !description || !image || !pays) {
      return res.status(400).json({
        error: "Tous les champs sont requis: titre, description, image, pays"
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
    const { titre, description, image, pays } = req.body;

    if (!titre && !description && !image && !pays) {
      return res.status(400).json({
        error: "Au moins un champ doit être fourni: titre, description, image, pays"
      });
    }

    const updateData = {};
    if (titre) updateData.titre = titre;
    if (description) updateData.description = description;
    if (image) updateData.image = image;
    if (pays) updateData.pays = pays;

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
