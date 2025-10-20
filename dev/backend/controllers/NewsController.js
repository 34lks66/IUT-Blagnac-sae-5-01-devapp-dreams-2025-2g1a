const NewsModel = require("../models/NewsModel");

module.exports.getNews = async (req, res) => {
  try {
    const news = await NewsModel.find();
    res.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.saveNews = async (req, res) => {
  try {
    const { image, date, title, link } = req.body;

    // Validation des champs requis
    if (!image || !date || !title || !link) {
      return res.status(400).json({ 
        error: "Tous les champs sont requis: image, date, title, link" 
      });
    }

    const newNews = await NewsModel.create({ 
      image,
      date,
      title,
      link
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
    const { image, date, title, link } = req.body;

    if (!image && !date && !title && !link) {
      return res.status(400).json({ 
        error: "Au moins un champ doit être fourni: image, date, title, link" 
      });
    }

    const updateData = {};
    if (image) updateData.image = image;
    if (date) updateData.date = date;
    if (title) updateData.title = title;
    if (link) updateData.link = link;

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