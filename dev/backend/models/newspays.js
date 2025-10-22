const mongoose = require('mongoose');

const NewsPaysSchema = new mongoose.Schema({
    titre: {
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
    pays: {
        type: mongoose.Schema.Types.ObjectId, // référence vers la collection Pays
        ref: 'Pays',
        required: true
    }
}, {
    timestamps: true
});

const NewsPays = mongoose.model('NewsPays', NewsPaysSchema);
module.exports = NewsPays;
