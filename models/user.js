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
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (password) {
                // Vérification de la longueur minimale du mot de passe
                return password.length >= 8;
            },
            message: "Le mot de passe doit comporter au moins 8 caractères.",
        },
    },
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

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.passwordHash = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
