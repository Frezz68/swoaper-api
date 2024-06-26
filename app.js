const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3001;
const db = mongoose.connection;

const cors = require("cors");

app.use(cors());

// Connexion à la base de données
require("./config/database");

// User routes
const userRouter = require("./routes/userRoutes");
app.use(express.json());
app.use("/", userRouter);

// Cart routes
const cartRouter = require("./routes/cartRoutes");
app.use(express.json());
app.use("/", cartRouter);

// Service routes
const serviceRouter = require("./routes/serviceRoutes");
app.use(express.json());
app.use("/", serviceRouter);

// Mail routes
const mailRouter = require("./routes/mailRoutes");
app.use(express.json());
app.use("/", mailRouter);

// UserServiceDescriptions routes
const userServiceDescriptionRouter = require("./routes/userServiceDescriptionRoutes");
app.use(express.json());
app.use("/", userServiceDescriptionRouter);

// Swagger config
const configureSwagger = require("./swagger/config");
configureSwagger(app);

// Passport config
const passport = require("./config/passeport");
app.use(passport.initialize());

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});

db.on("error", (err) => {
  console.error("Erreur de connexion à la base de données :", err);
});

db.once("open", () => {
  console.log("Connecté à la base de données MongoDB");
  // Vous pouvez commencer à configurer vos modèles et vos routes ici
});

db.on("disconnected", () => {
  console.log("La connexion à la base de données MongoDB a été interrompue");
});

// Gestion des erreurs de connexion
process.on("SIGINT", () => {
  db.close(() => {
    console.log(
      "La connexion à la base de données MongoDB a été interrompue en raison de la fermeture de l'application"
    );
    process.exit(0);
  });
});
