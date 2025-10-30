const Event = require('../models/EventModel');
const Antenne = require('../models/AntenneModel');

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

module.exports.createEvent = async (req, res) => {
  try {
    const { title, date, starttime, endtime, location, description, antenna, isGeneral } = req.body;
    if (!title || !date) return res.status(400).json({ error: 'title and date required' });

    const payload = { title, date, starttime, endtime, location, description, isGeneral: !!isGeneral };

    if (antenna) {
      if (isObjectId(antenna)) payload.antenna = antenna;
      else payload.antennaName = antenna;
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
    const ev = await Event.findByIdAndDelete(req.params.id);
    if (!ev) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};