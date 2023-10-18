require('dotenv').config(); // Charge les variables d'environnement à partir de .env

const mongoose = require('mongoose');

// Utilisez process.env pour accéder à vos variables d'environnement
const dbURI = process.env.MONGODB_URI;

// Connectez-vous à votre base de données MongoDB
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;