require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('../models/EventModel');

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/dreams_dev';

const sampleEvents = [
  {
    title: "Atelier CV - Toulouse",
    date: "2025-11-05",
    time: "10:00",
    location: "Maison des Associations - Toulouse",
    description: "Atelier pour améliorer CV et lettre de motivation.",
    antenna: "Toulouse",
    isGeneral: false,
  },
  {
    title: "Réunion équipe nationale",
    date: "2025-11-12",
    time: "14:00",
    location: "Siège DREAMS - Paris",
    description: "Réunion mensuelle des coordinateurs.",
    antenna: null,
    isGeneral: true,
  },
  {
    title: "Sensibilisation santé - Bordeaux",
    date: "2025-12-02",
    time: "09:30",
    location: "Centre Communal - Bordeaux",
    description: "Journée info prévention santé.",
    antenna: "Bordeaux",
    isGeneral: false,
  },
  {
    title: "Formation bénévoles",
    date: "2025-10-28",
    time: "18:00",
    location: "Visioconférence",
    description: "Session d'intégration pour nouveaux bénévoles.",
    antenna: null,
    isGeneral: true,
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB for seeding:', MONGODB_URL);

    // Purge (optionnel) — commente si tu veux ajouter sans supprimer
    await Event.deleteMany({});
    console.log('Existing events removed.');

    const created = await Event.insertMany(sampleEvents);
    console.log(`Inserted ${created.length} events.`);

    await mongoose.disconnect();
    console.log('Disconnected. Seed finished.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();