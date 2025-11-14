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
    },
    description: {
        type: String,
    }
    
});

NewSchema.pre('validate', function(next) {
  if (!this.link && !this.description) {
    next(new Error('Vous devez fournir soit un lien, soit une description.'));
  } else {
    next();
  }
});

const News = mongoose.model('News', NewSchema);
module.exports = News;