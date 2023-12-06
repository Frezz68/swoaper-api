const User = require("../models/user");
const Cart = require("../models/cart");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const isEmailUnique = async (email) => {
  const existingUser = await User.findOne({ email });
  return existingUser ? false : true;
};

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifiez si l'adresse e-mail est unique
    const isUnique = await isEmailUnique(email);
    if (!isUnique) {
      return res
        .status(400)
        .json({ error: "Cette adresse e-mail existe déjà." });
    }

    // Hacher le mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Créer un nouvel utilisateur
    const newUser = new User({
      ...req.body,
      passwordHash: hashedPassword, // Utiliser le mot de passe haché
      roles: ["ROLE_USER"],
    });

    const user = await newUser.save();

    // Créer un nouveau panier pour l'utilisateur
    const newCart = new Cart({ _id: user._id });
    await newCart.save();

    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    // Gérez les erreurs spécifiques ici
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({
      error: "Erreur lors de la création de l'utilisateur",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    const token = jwt.sign(
      { id: user._id, roles: user.roles },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
};
// Obtenir tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      error: "Erreur lors de la récupération des utilisateurs",
    });
  }
};

// Obtenir un utilisateur par son ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      error: "Erreur lors de la récupération de l'utilisateur",
    });
  }
};

// Mettre à jour un utilisateur par son ID
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({
      error: "Erreur lors de la mise à jour de l'utilisateur",
    });
  }
};

// Supprimer un utilisateur par son ID
exports.deleteUser = async (req, res) => {
  try {
    await Cart.findByIdAndRemove(req.params.userId);
    const deletedUser = await User.findByIdAndRemove(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.status(204).json();
  } catch (err) {
    res.status(500).json({
      error: "Erreur lors de la suppression de l'utilisateur",
    });
  }
};
