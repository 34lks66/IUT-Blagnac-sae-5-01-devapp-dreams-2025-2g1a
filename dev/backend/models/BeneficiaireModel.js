const mongoose = require('mongoose');

const BeneficiaireSchema = new mongoose.Schema({
  nom: { 
    type: String, 
    required: true 
  },
  prenom: { 
    type: String, 
    required: true 
  },
  telephone: { 
    type: String, 
    required: true 
  },
  mail: { 
    type: String, 
    required: true 
  },
  pdf: {
    type: [String],
    default: [],
  },
  // Référence vers le bénévole gestionnaire
  benevole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
});

const Beneficiaire = mongoose.model('Beneficiaire', BeneficiaireSchema);
module.exports = Beneficiaire;
