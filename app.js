const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const db = mongoose.connection;

// Connexion à la base de données via un fichier de configuration
require('./config/database');

// Importez le routeur de userController
const userRouter = require('./routes/userRoutes');

// Middleware pour gérer les données JSON
app.use(express.json());

// Montez le routeur sur votre application
app.use('/', userRouter); // Cela signifie que toutes les routes définies dans userController commenceront par '/'

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

db.on('error', (err) => {
  console.error('Erreur de connexion à la base de données :', err);
});

db.once('open', () => {
  console.log('Connecté à la base de données MongoDB');
  // Vous pouvez commencer à configurer vos modèles et vos routes ici
});

db.on('disconnected', () => {
  console.log('La connexion à la base de données MongoDB a été interrompue');
});

// Gestion des erreurs de connexion
process.on('SIGINT', () => {
  db.close(() => {
    console.log("La connexion à la base de données MongoDB a été interrompue en raison de la fermeture de l'application");
    process.exit(0);
  });
});