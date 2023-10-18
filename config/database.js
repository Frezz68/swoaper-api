const mongoose = require('mongoose');

// Connectez-vous à votre base de données MongoDB
mongoose.connect('mongodb+srv://swoaper:9Wdwqw77dE2HErSB@cluster0.ocnskey.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;