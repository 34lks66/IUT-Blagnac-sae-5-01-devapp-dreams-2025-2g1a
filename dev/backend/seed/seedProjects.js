const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Project = require('../models/ProjectModel');
const Pays = require('../models/pays'); 

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/dreams_dev';

async function seed() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log('Connected to MongoDB');

    // Find a country or create a dummy one if none exists (just to avoid crashes)
    let pays = await Pays.findOne();
    
    if (!pays) {
       console.log("No country found. Creating a dummy France.");
       pays = await Pays.create({
           nom: "France",
           description: "Pays par défaut",
           image: "default.jpg"
       });
    }

    const projects = [
      {
        title: "Soutien Psychologique en Ligne",
        description: "Mise en place d'une plateforme d'écoute et de soutien psychologique accessible à tous les membres de la communauté, où qu'ils soient.",
        pays: pays._id
      },
      {
        title: "Campagne de Sensibilisation",
        description: "Une série d'événements et d'ateliers dans les écoles et entreprises pour sensibiliser aux enjeux LGBTQIA+ et promouvoir l'inclusivité.",
        pays: pays._id
      },
      {
        title: "Aide au Logement d'Urgence",
        description: "Programme visant à fournir un hébergement temporaire et sécurisé pour les jeunes LGBTQIA+ en rupture familiale.",
        pays: pays._id
      }
    ];

    await Project.deleteMany({});
    await Project.insertMany(projects);
    
    console.log('Sample projects seeded successfully');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
