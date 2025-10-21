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
    }
}, {
    timestamps: true 
});

const Pays = mongoose.model('Pays', PaysSchema);
module.exports = Pays;
