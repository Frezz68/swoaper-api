const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Créer un nouvel utilisateur
router.post('/users', userController.createUser);

// Obtenir tous les utilisateurs
router.get('/users', userController.getAllUsers);

// Obtenir un utilisateur par son ID
router.get('/users/:userId', userController.getUserById);

// Mettre à jour un utilisateur par son ID
router.put('/users/:userId', userController.updateUser);

// Supprimer un utilisateur par son ID
router.delete('/users/:userId', userController.deleteUser);

module.exports = router;
