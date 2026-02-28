/**
 * Script de seed : crée un compte admin par défaut dans la base MongoDB.
 * 
 * Usage : node seed.js
 * 
 * Le compte créé :
 *   Email    : admin@dreams.fr
 *   Password : Admin2025!
 *   Statut   : S (super admin)
 */

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Account = require("./models/AccountModel");

const DEFAULT_ACCOUNT = {
    nom: "Admin",
    prenom: "DREAMS",
    telephone: "0000000000",
    email: "admin@dreams.fr",
    password: "Admin2025!",
    statut: "S",
    pays: "France",
};

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connecté à MongoDB");

        const existing = await Account.findOne({ email: DEFAULT_ACCOUNT.email });
        if (existing) {
            console.log(`Le compte "${DEFAULT_ACCOUNT.email}" existe déjà. Aucune action.`);
            process.exit(0);
        }

        const hashed = await bcrypt.hash(DEFAULT_ACCOUNT.password, 10);
        await Account.create({ ...DEFAULT_ACCOUNT, password: hashed });

        console.log("Compte admin créé avec succès :");
        console.log(`  Email    : ${DEFAULT_ACCOUNT.email}`);
        console.log(`  Password : ${DEFAULT_ACCOUNT.password}`);
        console.log(`  Statut   : ${DEFAULT_ACCOUNT.statut}`);
    } catch (err) {
        console.error("Erreur lors du seed :", err);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

seed();
