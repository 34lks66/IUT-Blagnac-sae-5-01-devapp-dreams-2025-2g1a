const mongoose = require('mongoose');

const HebergeSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  telephone: { type: String, required: true },
  mail: { type: String, required: true },
  pdf: { type: [String], default: [] },
  // Référence vers le bénévole gestionnaire
  benevole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
});

const Heberge = mongoose.model('Heberge', HebergeSchema);
module.exports = Heberge;
