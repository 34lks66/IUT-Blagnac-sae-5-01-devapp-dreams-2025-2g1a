const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
<<<<<<< HEAD
    text: { 
        type: String, 
        required: true 
    },
=======
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
    
>>>>>>> main
});

const Member = mongoose.model('Member', MemberSchema);
module.exports = Member;