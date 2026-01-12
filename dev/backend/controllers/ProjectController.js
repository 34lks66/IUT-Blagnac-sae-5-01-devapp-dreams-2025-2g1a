const ProjectModel = require("../models/ProjectModel");

module.exports.getProjects = async (req, res) => {
  try {
    const projects = await ProjectModel.find().populate('pays');
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getProject = async (req, res) => {
  try {
    const project = await ProjectModel.findById(req.params.id).populate('pays');
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.saveProject = async (req, res) => {
  try {
    const { title, description, pays } = req.body;

    if (!title || !description || !pays) {
      return res.status(400).json({ 
        error: "Champs requis: title, description, pays" 
      });
    }

    const newProject = await ProjectModel.create({ 
      title,
      description,
      pays
    });
    
    res.status(201).json(newProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, pays } = req.body;

    const updatedProject = await ProjectModel.findByIdAndUpdate(
      id, 
      { title, description, pays },
      { new: true }
    );

    if (!updatedProject) return res.status(404).json({ error: "Project not found" });

    res.json(updatedProject); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedProject = await ProjectModel.findByIdAndDelete(id);
    if (!deletedProject) return res.status(404).json({ error: "Project not found" });
    
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
