const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware'); // Assurez-vous d'avoir le middleware d'authentification

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Opérations relatives au panier d'un utilisateur.
 */

/**
 * @swagger
 * /carts:
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
 *   post:
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

router.route('/carts')
  .get(requireAuth, requireAuth, cartController.getUserCart)
  .post(requireAuth, requireAuth, requireAdmin, cartController.createCart);

/**
 * @swagger
 * /carts/{cartId}:
 *   put:
 *     summary: Modifie le panier de l'utilisateur connecté.
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         description: ID of the cart to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: New cart data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *               services:
 *                 type: array
 *     responses:
 *       200:
 *         description: Successfully updated the user's cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /carts/{cartId}:
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

router.route('/carts/:cartId')
  .put(requireAuth, cartController.updateCart)
  .delete(requireAuth, cartController.deleteCart);

module.exports = router;
