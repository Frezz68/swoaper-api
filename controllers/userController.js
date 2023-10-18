const User = require('../models/user');
const express = require('express');

const isEmailUnique = async (email) => {
  const existingUser = await User.findOne({ email });
  return existingUser ? false : true;
};

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Vérifiez si l'adresse e-mail est unique
    const isUnique = await isEmailUnique(email);
    if (!isUnique) {
      return res.status(400).json({ error: 'Cette adresse e-mail existe déjà.' });
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (err) {
    // Gérez les erreurs spécifiques ici
    if (err.name === 'ValidationError') {
      // Erreur de validation des données (par exemple, des champs manquants)
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
  }
};

// Obtenir tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
};

// Obtenir un utilisateur par son ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
  }
};

// Mettre à jour un utilisateur par son ID
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
  }
};

// Supprimer un utilisateur par son ID
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
  }
};