const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  pays: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pays',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
