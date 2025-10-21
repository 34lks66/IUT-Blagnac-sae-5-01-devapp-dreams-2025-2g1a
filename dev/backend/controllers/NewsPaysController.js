const NewsPaysModel = require("../models/newspays"); // modèle des actualités
const PaysModel = require("../models/pays");         // pour vérifier l'existence du pays

// GET /api/news-pays?pays=<paysId>
module.exports.getNewsPays = async (req, res) => {
  try {
    const { pays } = req.query;
    const filter = {};
    if (pays) filter.pays = pays; // filtre optionnel par pays

    const news = await NewsPaysModel
      .find(filter)
      .sort({ createdAt: -1 })          // les plus récentes d'abord
      .populate("pays", "nom _id");     // ajoute { _id, nom } du pays

    res.json(news);
  } catch (error) {
    console.error("Error fetching news pays:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/news-pays/:id
module.exports.getOneNewsPays = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await NewsPaysModel
      .findById(id)
      .populate("pays", "nom _id");

    if (!news) {
      return res.status(404).json({ error: "Actualité introuvable" });
    }

    res.json(news);
  } catch (error) {
    console.error("Error fetching one news pays:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST /api/news-pays
// body attendu: { titre, description, image, pays }
module.exports.createNewsPays = async (req, res) => {
  try {
    const { titre, description, image, pays } = req.body;

    // Vérif champs requis
    if (!titre || !description || !image || !pays) {
      return res.status(400).json({
        error: "Champs requis: titre, description, image, pays",
      });
    }

    // Vérifier que le pays existe
    const paysDoc = await PaysModel.findById(pays);
    if (!paysDoc) {
      return res.status(400).json({ error: "Pays associé introuvable" });
    }

    const created = await NewsPaysModel.create({
      titre,
      description,
      image,
      pays,
    });

    // renvoyer avec le pays peuplé
    const populated = await created.populate("pays", "nom _id");

    res.status(201).json(populated);
  } catch (error) {
    console.error("Error creating news pays:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PATCH /api/news-pays/:id
// body partiel possible: { titre?, description?, image?, pays? }
module.exports.updateNewsPays = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, description, image, pays } = req.body;

    // Si on change le pays, vérifier qu'il existe
    if (pays) {
      const paysDoc = await PaysModel.findById(pays);
      if (!paysDoc) {
        return res.status(400).json({ error: "Pays associé introuvable" });
      }
    }

    const updateData = {};
    if (typeof titre === "string") updateData.titre = titre;
    if (typeof description === "string") updateData.description = description;
    if (typeof image === "string") updateData.image = image;
    if (typeof pays === "string") updateData.pays = pays;

    const updated = await NewsPaysModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate("pays", "nom _id");

    if (!updated) {
      return res.status(404).json({ error: "Actualité introuvable" });
    }

    res.json({ message: "Mise à jour réussie", news: updated });
  } catch (error) {
    console.error("Error updating news pays:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE /api/news-pays/:id
module.exports.deleteNewsPays = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await NewsPaysModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Actualité introuvable" });
    }

    res.json({ message: "Actualité supprimée avec succès", news: deleted });
  } catch (error) {
    console.error("Error deleting news pays:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
