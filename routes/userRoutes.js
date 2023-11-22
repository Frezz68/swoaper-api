const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Opérations relatives aux utilisateurs.
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Créer un nouvel utilisateur.
 *     tags: [User]
 *     description: Crée un nouvel utilisateur avec les données fournies.
 *     requestBody:
 *       required: true
 *     responses:
 *       '201':
 *         description: Utilisateur créé avec succès.
 *       '400':
 *         description: Cette adresse e-mail existe déjà ou des données invalides ont été fournies.
 *       '500':
 *         description: Erreur du serveur.
 */
router.post("/users", userController.createUser);

router.post("/login", userController.login);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupère tous les utilisateurs.
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     description: Récupère tous les utilisateurs de la base de données.
 *     responses:
 *       '200':
 *         description: Réponse réussie.
 *       '500':
 *         description: Erreur du serveur.
 */
router.get("/users", requireAuth, requireAdmin, userController.getAllUsers);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Récupère un utilisateur par son ID.
 *     tags: [User]
 *     description: Récupère un utilisateur spécifique en utilisant son ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur à récupérer.
 *     responses:
 *       '200':
 *         description: Utilisateur récupéré avec succès.
 *       '404':
 *         description: Utilisateur non trouvé.
 *       '500':
 *         description: Erreur du serveur.
 */
router.get("/users/:userId", userController.getUserById);

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Met à jour un utilisateur par son ID.
 *     tags: [User]
 *     description: Met à jour un utilisateur spécifique en utilisant son ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur à mettre à jour.
 *     requestBody:
 *       required: true
 *     responses:
 *       '200':
 *         description: Utilisateur mis à jour avec succès.
 *       '404':
 *         description: Utilisateur non trouvé.
 *       '500':
 *         description: Erreur du serveur.
 */
router.put("/users/:userId", userController.updateUser);

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Supprime un utilisateur par son ID.
 *     tags: [User]
 *     description: Supprime un utilisateur spécifique en utilisant son ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur à supprimer.
 *     responses:
 *       '204':
 *         description: Utilisateur supprimé avec succès.
 *       '404':
 *         description: Utilisateur non trouvé.
 *       '500':
 *         description: Erreur du serveur.
 */
router.delete(
    "/users/:userId",
    requireAuth,
    requireAdmin,
    userController.deleteUser
);

module.exports = router;
