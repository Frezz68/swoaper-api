const Cart = require("../models/cart");
const jwt = require("jsonwebtoken");
const { decryptJwtToken } = require("../utils/jwtUtils");

// Ajouter un service au panier de l'utilisateur
exports.addServiceToCart = async (req, res) => {
  const serviceId = req.body.serviceId; // ID du service à ajouter, passé dans le corps de la requête
  const token = req.headers.authorization.split(" ")[1]; // Extrait le token JWT du header Authorization
  const decryptedToken = decryptJwtToken(token);

  if (!decryptedToken) {
    return res
      .status(401)
      .send("L'utilisateur n'est pas connecté ou le token est invalide.");
  }

  const userId = decryptedToken.userId; // Extrait l'ID de l'utilisateur depuis le token déchiffré

  try {
    // Trouver le panier de l'utilisateur par son ID et ajouter le service à la liste des services
    const userCart = await Cart.findById(userId);

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Vérifier si le service est déjà dans le panier pour éviter les doublons
    if (!userCart.services.includes(serviceId)) {
      userCart.services.push(serviceId); // Ajouter le serviceId au panier
      await userCart.save(); // Sauvegarder les changements dans le panier
      res.status(200).json({
        message: "Service added to cart successfully",
        cart: userCart,
      });
    } else {
      res.status(400).json({ message: "Service already in cart" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error while adding service to cart",
      error: error.message,
    });
  }
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         _user:
 *           type: string
 *         products:
 *           type: array
 *         services:
 *           type: array
 *       required:
 *         - _user
 */

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Get the user's cart.
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's cart.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */
exports.getUserCart = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decryptedToken = decryptJwtToken(token);

  if (decryptedToken) {
    try {
      // Obtenez le panier de l'utilisateur actuellement authentifié
      const userCart = await Cart.findById(decryptedToken.userId);

      if (!userCart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      res.status(200).json(userCart);
    } catch (error) {
      res.status(500).json({
        message: "Error while fetching user's cart",
        error: error.message,
      });
    }
  } else {
    // Gérer l'erreur ou la situation où le token est invalide ou expiré
    res.status(401).send("L'utilisateur n'est pas connecté.");
  }
};

/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Create a new cart for the user.
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
exports.createCart = async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const decryptedToken = decryptJwtToken(token);
    const userId = decryptedToken.userId;

    const newCart = new Cart({ _id: userId });
    await newCart.save();

    res.status(201).json({ message: "Cart created successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error while creating the cart",
      error: error.message,
    });
  }
};

/**
 * @swagger
 * /carts/{cartId}:
 *   put:
 *     summary: Update the user's cart by ID.
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
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       200:
 *         description: Successfully updated the user's cart.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */
exports.updateCart = async (req, res) => {
  try {
    // Remplacez le contenu du panier actuel par le nouveau contenu du corps de la demande
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.cartId,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({
      message: "Error while updating the cart",
      error: error.message,
    });
  }
};

/**
 * @swagger
 * /carts/{cartId}:
 *   delete:
 *     summary: Delete the user's cart by ID.
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
exports.deleteCart = async (req, res) => {
  // Delete le panier toutes les semaines
  try {
    // Supprimez le panier de l'utilisateur par ID
    const deletedCart = await Cart.findByIdAndRemove(req.params.cartId);

    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      message: "Error while deleting the cart",
      error: error.message,
    });
  }
};
