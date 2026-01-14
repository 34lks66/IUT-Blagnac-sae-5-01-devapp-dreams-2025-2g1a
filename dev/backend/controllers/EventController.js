const Event = require('../models/EventModel');
const Antenne = require('../models/AntenneModel');
const AccountModel = require('../models/AccountModel');
const PaysModel = require('../models/pays');
const path = require("path");
const EventModel = require('../models/EventModel');
const fs = require("fs").promises;

function isObjectId(str) {
  return /^[0-9a-fA-F]{24}$/.test(String(str));
}

module.exports.listEvents = async (req, res) => {
  try {
    const { antenna, general } = req.query;
    const filter = {};
    if (general === 'true') filter.isGeneral = true;

    if (antenna) {
      if (isObjectId(antenna)) filter.antenna = antenna;
      else filter.antennaName = antenna;
    }

    const events = await Event.find(filter).populate('antenna', 'nom').sort({ date: -1 });
    const out = events.map(e => {
      const obj = e.toObject();
      obj.antenna = e.antenna ? e.antenna.nom : e.antennaName || null;
      return obj;
    });
    res.json(out);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.getEvent = async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id).populate('antenna', 'nom');
    if (!ev) return res.status(404).json({ error: 'Not found' });
    const obj = ev.toObject();
    obj.antenna = ev.antenna ? ev.antenna.nom : ev.antennaName || null;
    res.json(obj);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.saveEvent = async (req, res) => {
  try {
    const { title, date, starttime, endtime, location, description, antenna, isGeneral } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    if (!title || !date || !image)
      return res.status(400).json({ error: "Tous les champs sont requis: image, date, title" });

    const payload = {
      title,
      date,
      starttime,
      endtime,
      location,
      description,
      image,
      isGeneral: !!isGeneral,
    };

    if (antenna) {
      if (isObjectId(antenna)) payload.antenna = antenna;
      else payload.antennaName = antenna;
    }

    const userAccount = await AccountModel.findById(req.user.sub);

    // SUPER ADMIN → accès total
    if (userAccount.statut !== "S") {
      // Besoin d'une antenne pour les rôles non super admin
      if (!payload.antenna) {
        return res.status(403).json({
          error: "Impossible de créer un événement sans antenne avec votre rôle.",
        });
      }

      const existingAntenne = await Antenne.findById(payload.antenna);
      if (!existingAntenne) {
        return res.status(400).json({ error: "Antenne introuvable" });
      }

      const existingPays = await PaysModel.findById(existingAntenne.pays);

      if (userAccount.statut === "X") {
        if (String(userAccount.pays) !== existingPays.nom) {
          return res.status(403).json({
            error:
              "Vous n'avez pas la permission de créer un événement pour une antenne d'un autre pays.",
          });
        }
      } else {
        return res.status(403).json({ error: "Accès refusé." });
      }
    }

    const newEv = await Event.create(payload);
    const evPop = await Event.findById(newEv._id).populate("antenna", "nom");
    const out = evPop.toObject();
    out.antenna = evPop.antenna ? evPop.antenna.nom : evPop.antennaName || null;

    res.status(201).json(out);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.updateEvent = async (req, res) => {
  try {
    const update = { ...req.body };
    const { antenna } = req.body;

    const newImage = req.file ? `/uploads/${req.file.filename}` : null;

    const existingEvent = await Event.findById(req.body._id);

    if (newImage && !existingEvent)
      return res.status(404).json({ error: "Event not found" });

    if (newImage) {
      update.image = newImage;
    }

    const user = await AccountModel.findById(req.user.sub);

    if (user.statut !== "S") {

      if (!existingEvent.antenna) {
        return res.status(403).json({
          error: "Impossible de modifier un événement sans antenne.",
        });
      }

      const currentAntenne = await Antenne.findById(existingEvent.antenna);
      const currentPays = await PaysModel.findById(currentAntenne.pays);

      if (user.statut === "X") {
        if (String(user.pays) !== currentPays.nom) {
          return res.status(403).json({
            error: "Vous n'avez pas la permission de modifier un événement d’un autre pays.",
          });
        }
      } else {
        return res.status(403).json({ error: "Accès refusé." });
      }
    }

    if(newImage && existingEvent.image) {
      try {
        const relPath = existingEvent.image.replace(/^\/+/, "");
        const absImagePath = path.join(__dirname, "..", relPath);
        await fs.access(absImagePath);
        await fs.unlink(absImagePath)
        console.log("Ancienne image supprimée :", absImagePath);
      } catch (errFile) {
        console.warn("Erreur lors de la suppression de l'ancienne image :", errFile);
      }
    }

    if (antenna !== undefined) {

      // Admin pays ne peut pas retirer l’antenne
      if (user.statut === "X" && (antenna === null || antenna === "")) {
        return res.status(403).json({
          error: "Vous ne pouvez pas retirer l'antenne de l'événement.",
        });
      }

      if (antenna && !isObjectId(antenna)) {
        return res.status(400).json({ error: "Antenne invalide." });
      }

      if (antenna) {
        const newAntenne = await Antenne.findById(antenna);
        if (!newAntenne) {
          return res.status(400).json({ error: "Antenne inconnue." });
        }

        const newPays = await PaysModel.findById(newAntenne.pays);

        if (user.statut === "X") {
          if (String(user.pays) !== newPays.nom) {
            return res.status(403).json({
              error: "Vous ne pouvez pas déplacer l'événement vers une antenne d'un autre pays.",
            });
          }
        }

        update.antenna = antenna;
      }

      if (antenna === null || antenna === "") {
        update.antenna = null;
      }
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      existingEvent._id,
      update,
      { new: true }
    ).populate("antenna", "nom");

    res.json(updatedEvent);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.deleteEvent = async (req, res) => {
  try {
    const existingEvent = await Event.findById(req.params.id);
    if (!existingEvent) return res.status(404).json({ error: "Event not found" });

    const userAccount = await AccountModel.findById(req.user.sub);
    if (userAccount.statut !== "S") {
      if (existingEvent.antenna) {
        const existingAntenne = await Antenne.findById(existingEvent.antenna);

        if (userAccount.statut === "X") {
          const existingPays = await PaysModel.findById(existingAntenne.pays);

          if (String(userAccount.pays) !== existingPays.nom) {
            return res.status(403).json({
              error:
                "Vous n'avez pas la permission de supprimer un événement pour une antenne d'un autre pays."
            });
          }
        } else {
          return res.status(403).json({ error: "Accès refusé." });
        }
      } else {
        return res.status(403).json({
          error: "Impossible de supprimer cet événement car il n'est rattaché à aucune antenne."
        });
      }
    } 

    if (existingEvent.image) {
      try {
        let imagePath = existingEvent.image;
        const relPath = imagePath.replace(/^\/+/, "");
        const absImagePath = path.join(__dirname, "..", relPath);
        console.log("Chemin absolut de l'image à supprimer :", absImagePath);
        await fs.access(absImagePath);
        await fs.unlink(absImagePath);
        console.log("Image supprimée :", absImagePath);
      } catch(errFile) {
        console.log("Erreur lors de la suppression du fichier image :", errFile);
      }
    }

    const ev = await Event.findByIdAndDelete(req.params.id);
    if (!ev) return res.status(404).json({ error: "Not found" });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
