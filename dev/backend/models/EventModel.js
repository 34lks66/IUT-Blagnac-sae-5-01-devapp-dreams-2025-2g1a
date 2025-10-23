const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String },
  location: { type: String },
  description: { type: String },
  antenna: { type: mongoose.Schema.Types.ObjectId, ref: 'Antenne', default: null },
  antennaName: { type: String, default: null },
  isGeneral: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);