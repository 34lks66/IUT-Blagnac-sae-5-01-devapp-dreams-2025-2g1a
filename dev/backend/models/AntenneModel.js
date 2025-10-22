const mongoose = require('mongoose');

const AntenneSchema = new mongoose.Schema({
    nom: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    pays: { 
        type: String, 
        required: true 
    },    
});

const Antenne = mongoose.model('Antenne', AntenneSchema);
module.exports = Antenne;