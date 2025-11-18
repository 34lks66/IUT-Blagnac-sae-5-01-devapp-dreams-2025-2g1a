const NewsModel = require("../models/NewsModel");
const path = require("path");
const fs = require("fs").promises;

module.exports.getNews = async (req, res) => {
  try {
    const news = await NewsModel.find();
    res.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getNewsID = async (req, res) => {
  try {
    const news = await NewsModel.findById(req.params.id);
    if (!news) return res.status(404).json({ error: "News not found" });
    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.saveNews = async (req, res) => {
  try {
    const { date, title, link, description } = req.body;

    // Ligne à ajouter pour l'image
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    // Validation des champs requis
    if (!image || !date || !title) {
      return res.status(400).json({ 
        error: "Tous les champs sont requis: image, date, title, link" 
      });
    }

    if (!link && !description) {
      return res.status(400).json({ 
        error: "Veuillez fournir soit un lien, soit une description" 
      });
    }

    const newNews = await NewsModel.create({ 
      image,
      date,
      title,
      link,
      description
    });
    
    console.log("Saved successfully...");
    res.status(201).json(newNews);
  } catch (error) {
    console.error("Error saving news:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, title, link, description } = req.body;

    // Ligne à ajouter pour l'image
    const newImage = req.file ? `/uploads/${req.file.filename}` : null;

    const existingNews = await NewsModel.findById(id);

    if(newImage && existingNews.image) {
      try {
        const relPath = existingNews.image.replace(/^\/+/, "");
        const absImagePath = path.join(__dirname, "..", relPath);
        await fs.access(absImagePath);
        await fs.unlink(absImagePath)
        console.log("Ancienne image supprimée :", absImagePath);
      } catch (errFile) {
          console.warn("Erreur lors de la suppression de l'ancienne image :", errFile);
      }
    }

    if (!date && !title && !link && !description) {
      return res.status(400).json({ 
        error: "Au moins un champ doit être fourni: date, title, link, description" 
      });
    }
 
    const updateData = {
      date: date || existingNews.date,
      title: title || existingNews.title,
      link: link || existingNews.link,
      image: newImage || existingNews.image,
      description: description || existingNews.description
    };
    // if (image) updateData.image = image;
    // if (date) updateData.date = date;
    // if (title) updateData.title = title;
    // if (link) updateData.link = link;

    const updatedNews = await NewsModel.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ error: "News not found" });
    }

    res.json({ message: "Updated successfully", news: updatedNews });
  } catch (error) {
    console.error("Error updating news:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    // Code à ajouter pour l'image
    const news = await NewsModel.findById(id);
    if (news.image) {
      try {
        let imagePath = news.image;
        const relPath = imagePath.replace(/^\/+/, "");
        const absImagePath = path.join(__dirname, "..", relPath);
        console.log("Chemin absolut de l'image à supprimer :", absImagePath);
        await fs.access(absImagePath);
        await fs.unlink(absImagePath)
        console.log("Image supprimée :", absImagePath);
      } catch(errFile) {
        console.log("Erreur lors de la suppression du fichier image :", errFile);
      }
    }

    const deletedNews = await NewsModel.findByIdAndDelete(id);

    if (!deletedNews) {
      return res.status(404).json({ error: "News not found" });
    }

    res.json({ message: "Deleted successfully", news: deletedNews });
  } catch (error) {
    console.error("Error deleting news:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};