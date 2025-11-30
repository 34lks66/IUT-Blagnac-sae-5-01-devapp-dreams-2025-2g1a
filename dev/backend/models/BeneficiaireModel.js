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
    
});

const Beneficiaire = mongoose.model('Beneficiaire', BeneficiaireSchema);
module.exports = Beneficiaire;