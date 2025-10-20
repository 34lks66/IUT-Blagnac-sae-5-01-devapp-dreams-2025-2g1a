const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    text: { 
        type: String, 
        required: true 
    },
});

const Member = mongoose.model('Member', MemberSchema);
module.exports = Member;