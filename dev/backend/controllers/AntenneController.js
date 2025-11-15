const AntenneModel = require("../models/AntenneModel");
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

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!nom || !description || !pays) {
      return res.status(400).json({ 
        error: "Tous les champs sont requis: nom, description, pays" 
      });
    }

    const newAntenne = await AntenneModel.create({ 
      nom, 
      description, 
      image,
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

    const newImage = req.file ? `/uploads/${req.file.filename}` : null;

    if (!nom && !description && !newImage && !pays) {
      return res.status(400).json({ 
        error: "Au moins un champ doit être fourni: nom, description, pays" 
      });
    }

    const existingAntenne = await AntenneModel.findById(id);
    if (!existingAntenne) {
      return res.status(404).json({ error: "Antenne not found" });
    }

    const updateData = {};
    if (nom) updateData.nom = nom;
    if (description) updateData.description = description;
    if (pays) updateData.pays = pays;

     if (newImage && existingAntenne.image) {
         try {
           const imageName = existingAntenne.image.replace(/^\/+/, "");
           const absImagePath = path.join(__dirname, "..", imageName);
          
           try {
             await fs.access(absImagePath);
             await fs.unlink(absImagePath);
             console.log("Ancienne image supprimée:", absImagePath);
           } catch (accessError) {
             if (accessError.code === 'ENOENT') {
               console.log("Ancienne image non trouvée, poursuite du traitement");
             } else {
               throw accessError;
             }
           }
         } catch (errFile) {
           console.warn("Erreur gestion ancienne image:", errFile.message);
         }
       updateData.image = newImage;
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

    const deletedAntenne = await AntenneModel.findByIdAndDelete(id);

    if (!deletedAntenne) {
      return res.status(404).json({ error: "Antenne not found" });
    }

    if(deletedAntenne.image){
      try {
        const imageName = deletedAntenne.image.replace('/uploads/', '');
        const absImagePath = path.join(__dirname, '../uploads', imageName);
        
        try {
          await fs.access(absImagePath);
          await fs.unlink(absImagePath);
          console.log("Image supprimée:", absImagePath);
        } catch (accessError) {
          if (accessError.code === 'ENOENT') {
            console.log("Image non trouvée lors de la suppression");
          } else {
            throw accessError;
          }
        }
      } catch (errFile) {
        console.warn("Erreur lors de la suppression du fichier image:", errFile.message);
      }
    }

    res.json({ message: "Deleted successfully", antenne: deletedAntenne });
  } catch (error) {
    console.error("Error deleting antenne:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};