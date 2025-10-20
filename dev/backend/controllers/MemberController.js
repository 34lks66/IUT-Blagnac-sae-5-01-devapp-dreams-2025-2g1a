const MemberModel = require("../models/MemberModel");

module.exports.getMembers = async (req, res) => {
  try {
    const members = await MemberModel.find();
    res.json(members);
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.saveMember = async (req, res) => {
  try {
    const { nom, prenom, telephone, mail } = req.body;

    // Validation des champs requis
    if (!nom || !prenom || !telephone || !mail) {
      return res.status(400).json({ 
        error: "Tous les champs sont requis: nom, prenom, telephone, mail" 
      });
    }

    const newMember = await MemberModel.create({ 
      nom, 
      prenom, 
      telephone, 
      mail 
    });
    
    console.log("Saved successfully...");
    res.status(201).json(newMember);
  } catch (error) {
    console.error("Error saving member:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, telephone, mail } = req.body;

    if (!nom && !prenom && !telephone && !mail) {
      return res.status(400).json({ 
        error: "Au moins un champ doit être fourni: nom, prenom, telephone, mail" 
      });
    }

    const updateData = {};
    if (nom) updateData.nom = nom;
    if (prenom) updateData.prenom = prenom;
    if (telephone) updateData.telephone = telephone;
    if (mail) updateData.mail = mail;

    const updatedMember = await MemberModel.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.json({ message: "Updated successfully", member: updatedMember });
  } catch (error) {
    console.error("Error updating member:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMember = await MemberModel.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.json({ message: "Deleted successfully", member: deletedMember });
  } catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};