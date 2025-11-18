const mongoose = require('mongoose');

const PaysSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String, 
        required: true
    },
    nomSiege: {
        type: String
    },
    adresse: {
        type: String
    },
    horaire: {
        type: String
    },
    mail: {
        type: String
    },
    number: {
        type: String
    }
}, {
    timestamps: true 
});

const Pays = mongoose.model('Pays', PaysSchema);
module.exports = Pays;
