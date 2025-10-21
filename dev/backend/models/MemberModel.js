const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
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

const Member = mongoose.model('Member', MemberSchema);
module.exports = Member;