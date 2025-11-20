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
    image: {
        type: String,
        required: true
    },
    pays: {
            type: mongoose.Schema.Types.ObjectId, // référence vers la collection Pays
            ref: 'Pays',
            required: true
        },    
});

const Antenne = mongoose.model('Antenne', AntenneSchema);
module.exports = Antenne;