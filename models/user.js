const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        // Vérification si l'e-mail est valide en utilisant la bibliothèque validator
        return validator.isEmail(email);
      },
      message: "L'e-mail n'est pas valide.",
    },
  },
  roles: {
    type: [String],
    default: ["ROLE_USER"],
  },
  first_name: String,
  last_name: String,
  size: Number,
  address: String,
  city: String,
  postalCode: String,
  country: String,
  state: String,
  passwordHash: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  favoris: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fav",
    },
  ],
  notices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notice",
    },
  ],
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
