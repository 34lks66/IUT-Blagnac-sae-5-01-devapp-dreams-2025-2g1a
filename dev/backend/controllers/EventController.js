const Event = require('../models/EventModel');
const Antenne = require('../models/AntenneModel');
const AccountModel = require('../models/AccountModel');
const PaysModel = require('../models/pays');


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
    if (!title || !date)
      return res.status(400).json({ error: "title and date required" });

    const payload = {
      title,
      date,
      starttime,
      endtime,
      location,
      description,
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

    const existingEvent = await Event.findById(req.body._id);
    if (!existingEvent)
      return res.status(404).json({ error: "Event not found" });

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

    const ev = await Event.findByIdAndDelete(req.params.id);
    if (!ev) return res.status(404).json({ error: "Not found" });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
