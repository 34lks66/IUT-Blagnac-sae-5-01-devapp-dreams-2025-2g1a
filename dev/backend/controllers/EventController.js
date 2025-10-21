const Event = require("../models/EventModel");

module.exports.listEvents = async (req, res) => {
  try {
    const { antenna, general } = req.query;
    const filter = {};
    if (general === 'true') filter.isGeneral = true;
    if (antenna) filter.antenna = antenna;
    const events = await Event.find(filter).sort({ date: -1 });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getEvent = async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ error: "Not found" });
    res.json(ev);
  } catch (err) { /*...*/ }
};

module.exports.createEvent = async (req, res) => {
  try {
    const { title, date, time, location, description, antenna, isGeneral } = req.body;
    if (!title || !date) return res.status(400).json({ error: "title and date required" });
    const newEv = await Event.create({ title, date, time, location, description, antenna: antenna || null, isGeneral: !!isGeneral });
    // optional: emit socket event here for real-time sync
    res.status(201).json(newEv);
  } catch (err) { /*...*/ }
};

module.exports.updateEvent = async (req, res) => {
  try {
    const ev = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ev) return res.status(404).json({ error: "Not found" });
    // optional: emit socket update
    res.json(ev);
  } catch (err) { /*...*/ }
};

module.exports.deleteEvent = async (req, res) => {
  try {
    const ev = await Event.findByIdAndDelete(req.params.id);
    if (!ev) return res.status(404).json({ error: "Not found" });
    // optional: emit socket update
    res.json({ success: true });
  } catch (err) { /*...*/ }
};
