const ProjectModel = require("../models/ProjectModel");
const AccountModel = require('../models/AccountModel');
const PaysModel = require('../models/pays');

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

    const userAccount = await AccountModel.findById(req.user.sub);

    // Vérification des droits
    if (userAccount.statut !== "S") {
      if (userAccount.statut === "X") {
        const targetPays = await PaysModel.findById(pays);
        if (!targetPays) {
          return res.status(400).json({ error: "Pays cible introuvable." });
        }
        
        // La comparaison se fait sur le NOM du pays car userAccount.pays est une string
        if (String(userAccount.pays) !== targetPays.nom) {
          return res.status(403).json({
            error: "Vous n'avez pas la permission de créer un projet pour un autre pays que le vôtre."
          });
        }
      } else {
        // Ni S ni X -> pas le droit de créer
        return res.status(403).json({ error: "Accès refusé. Droits insuffisants." });
      }
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

    const existingProject = await ProjectModel.findById(id);
    if (!existingProject) return res.status(404).json({ error: "Project not found" });

    const userAccount = await AccountModel.findById(req.user.sub);

    // Vérification des droits
    if (userAccount.statut !== "S") {
      if (userAccount.statut !== "X") {
        return res.status(403).json({ error: "Accès refusé. Droits insuffisants." });
      }

      // Si c'est un admin pays (X), vérifier qu'il modifie un projet de SON pays
      const currentPaysDoc = await PaysModel.findById(existingProject.pays);
      if (currentPaysDoc) { // Le projet a un pays valide
        if (String(userAccount.pays) !== currentPaysDoc.nom) {
          return res.status(403).json({ 
            error: "Vous n'avez pas la permission de modifier un projet d'un autre pays." 
          });
        }
      }

      // S'il essaie de changer le pays du projet
      if (pays && pays !== String(existingProject.pays)) {
         const newPaysDoc = await PaysModel.findById(pays);
         if (!newPaysDoc) return res.status(400).json({ error: "Nouveau pays introuvable." });
         
         if (String(userAccount.pays) !== newPaysDoc.nom) {
            return res.status(403).json({ 
              error: "Vous ne pouvez pas déplacer le projet vers un autre pays." 
            });
         }
      }
    }

    const updatedProject = await ProjectModel.findByIdAndUpdate(
      id, 
      { title, description, pays },
      { new: true }
    );

    res.json(updatedProject); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    const existingProject = await ProjectModel.findById(id);
    if (!existingProject) return res.status(404).json({ error: "Project not found" });

    const userAccount = await AccountModel.findById(req.user.sub);

    // Vérification des droits
    if (userAccount.statut !== "S") {
      if (userAccount.statut !== "X") {
        return res.status(403).json({ error: "Accès refusé. Droits insuffisants." });
      }

      // Vérifier que le projet appartient au pays de l'admin
      const currentPaysDoc = await PaysModel.findById(existingProject.pays);
      if (currentPaysDoc) {
        if (String(userAccount.pays) !== currentPaysDoc.nom) {
          return res.status(403).json({ 
            error: "Vous n'avez pas la permission de supprimer un projet d'un autre pays." 
          });
        }
      }
    }
    
    await ProjectModel.findByIdAndDelete(id);
    
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
