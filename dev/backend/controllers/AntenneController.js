// controllers/AntenneController.js
module.exports.getAntennes = async (req, res) => {
  try {
    const { nom, pays } = req.query; 
    const filtre = {};

    if (nom) {
      filtre.nom = new RegExp(`^${nom}$`, 'i');
    }

    if (pays) {
      if (typeof pays === "string" && pays.includes(",")) {
        filtre.pays = { $in: pays.split(",").map((p) => p.trim()) };
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

    if (!nom || !description || !pays) {
      return res.status(400).json({ 
        error: "Tous les champs sont requis: nom, description, pays" 
      });
    }

    const newAntenne = await AntenneModel.create({ 
      nom, 
      description, 
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

    if (!nom && !description && !pays) {
      return res.status(400).json({ 
        error: "Au moins un champ doit être fourni: nom, description, pays" 
      });
    }

    const updateData = {};
    if (nom) updateData.nom = nom;
    if (description) updateData.description = description;
    if (pays) updateData.pays = pays;

    const updatedAntenne = await AntenneModel.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true }
    );

    if (!updatedAntenne) {
      return res.status(404).json({ error: "Antenne not found" });
    }

    res.json({ message: "Updated successfully", antenne: updatedAntenne });
  } catch (error) {
    console.error("Error updating antenne:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// CORRECTION : Changé de deleteAtenne à deleteAntenne
module.exports.deleteAntenne = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAntenne = await AntenneModel.findByIdAndDelete(id);

    if (!deletedAntenne) {
      return res.status(404).json({ error: "Antenne not found" });
    }

    res.json({ message: "Deleted successfully", antenne: deletedAntenne });
  } catch (error) {
    console.error("Error deleting antenne:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
