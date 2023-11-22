const dotenv = require("dotenv");
dotenv.config();

// Vous pouvez maintenant accéder à MONGODB_URI
const mongodbUri = process.env.MONGODB_URI;

// Utilisez mongodbUri dans votre configuration MongoDB
const mongoose = require("mongoose");

mongoose.connect(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Exportez la connexion ou toute autre configuration si nécessaire
module.exports = mongoose.connection;
