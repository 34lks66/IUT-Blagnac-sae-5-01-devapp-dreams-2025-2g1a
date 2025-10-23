const mongoose = require('mongoose');

const NewSchema = new mongoose.Schema({
    image: { 
        type: String, 
        required: true 
    },
    date: { 
        type: String, 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    link: { 
        type: String, 
        required: true 
    },
    
});

const News = mongoose.model('News', NewSchema);
module.exports = News;