const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    nom: { 
        type: String, 
        required: true, 
        trim: true
    },
    prenom: { 
        type: String, 
        required: true,
        trim: true
    },
    telephone: { 
        type: String, 
        required: true,
        trim: true
    },
    mail: { 
        type: String, 
        required: true,
        trim: true,
        unique: true,
        lowercase: true

    },
    password: { 
        type: String, 
        required: true 
    },
    statut: { 
        type: String, 
        enum: ['O', 'X', 'S'], 
        default: 'O' 
    },
    pays:{
        type: String,
        required: true,
        trim: true
    }
    
});

const Account = mongoose.model('Account', AccountSchema);
module.exports = Account;