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
    if (!title || !date) return res.status(400).json({ error: 'title and date required' });

    const payload = { title, date, starttime, endtime, location, description, isGeneral: !!isGeneral };

    if (antenna) {
      if (isObjectId(antenna)) payload.antenna = antenna;
      else payload.antennaName = antenna;
    }
    const existingAntenne = await Antenne.findById(payload.antenna);
    const userAccount = await AccountModel.findById(req.user.sub);
    const existingPays = await PaysModel.findById(existingAntenne.pays);
    if (userAccount.statut !== "S") {
      if (userAccount.statut === "X") {
        if (String(userAccount.pays) !== existingPays.nom) {
          return res.status(403).json({
            error: "Vous n'avez pas la permission de créer un événement pour cette antenne pour un autre pays."
          });
        }
      } else {

        return res.status(403).json({ error: "Accès refusé." });
      }
    }

    const newEv = await Event.create(payload);
    const evPop = await Event.findById(newEv._id).populate('antenna', 'nom');
    const out = evPop.toObject();
    out.antenna = evPop.antenna ? evPop.antenna.nom : evPop.antennaName || null;
    res.status(201).json(out);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.updateEvent = async (req, res) => {
  try {
    const { antenna } = req.body;
    const update = { ...req.body };

    const existingEvent = await Event.findById(req.body._id);
    const existingAntenne = await Antenne.findById(existingEvent.antenna);
    const userAccount = await AccountModel.findById(req.user.sub);
    const existingPays = await PaysModel.findById(existingAntenne.pays);
    if (userAccount.statut !== "S") {
      if (userAccount.statut === "X") {
        if (String(userAccount.pays) !== existingPays.nom) {
          return res.status(403).json({
            error: "Vous n'avez pas la permission de modifier un événement pour cette antenne pour un autre pays."
          });
        }
      } else {

        return res.status(403).json({ error: "Accès refusé." });
      }
    }

    if (antenna !== undefined) {
      if (antenna === null || antenna === '') {
        update.antenna = null;
        update.antennaName = null;
      } else if (isObjectId(antenna)) {
        update.antenna = antenna;
        update.antennaName = undefined;
      } else {
        update.antennaName = antenna;
        update.antenna = undefined;
      }
    }

    let updatedEventAntennaID = update.antenna
    if (updatedEventAntennaID === undefined) {
      updatedEventAntennaID = existingEvent.antenna;
    }

    const updatedEventAntenne = await Antenne.findById(updatedEventAntennaID);
    const updatedEventExistingPays = await PaysModel.findById(updatedEventAntenne.pays);
    if (userAccount.statut !== "S") {
      if (userAccount.statut === "X") {
        if (String(userAccount.pays) !== updatedEventExistingPays.nom) {
          return res.status(403).json({
            error: "Vous n'avez pas la permission de modifier un événement pour cette antenne pour un autre pays."
          });
        }
      } else {

        return res.status(403).json({ error: "Accès refusé." });
      }
    }


    const ev = await Event.findByIdAndUpdate(req.params.id, update, { new: true }).populate('antenna', 'nom');
    if (!ev) return res.status(404).json({ error: 'Not found' });
    const out = ev.toObject();
    out.antenna = ev.antenna ? ev.antenna.nom : ev.antennaName || null;
    res.json(out);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.deleteEvent = async (req, res) => {
  try {
    const existingEvent = await Event.findById(req.params.id);
    const existingAntenne = await Antenne.findById(existingEvent.antenna);
    const userAccount = await AccountModel.findById(req.user.sub);
    const existingPays = await PaysModel.findById(existingAntenne.pays);
    if (userAccount.statut !== "S") {
      if (userAccount.statut === "X") {
        if (String(userAccount.pays) !== existingPays.nom) {
          return res.status(403).json({
            error: "Vous n'avez pas la permission de supprimer un événement pour cette antenne pour un autre pays."
          });
        }
      } else {

        return res.status(403).json({ error: "Accès refusé." });
      }
    }
    const ev = await Event.findByIdAndDelete(req.params.id);
    if (!ev) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};