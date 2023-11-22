const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware"); // Assurez-vous d'avoir le middleware d'authentification

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Opérations relatives au panier d'un utilisateur.
 */

/**
 * @swagger
 * /carts/user-cart:
 *   get:
 *     summary: Récupère le panier de l'utilisateur connecté.
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 _user:
 *                   type: string
 *                 products:
 *                   type: array
 *                 services:
 *                   type: array
 */
router.get("/carts/user-cart", requireAuth, cartController.getUserCart);

/**
 * @swagger
 *   /carts/create:
 *     summary: Créé un panier pour un utilisateur.
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Successfully created a new cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post("/carts/create", requireAuth, cartController.getUserCart);

/**
 * @swagger
 * /carts/delete/{cartId}:
 *   delete:
 *     summary: Supprime le panier de l'utilisateur connecté.
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         description: ID of the cart to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Successfully deleted the user's cart.
 */

router
    .route("/carts/delete/:cartId")
    .put(requireAuth, cartController.updateCart)
    .delete(requireAuth, cartController.deleteCart);

module.exports = router;
