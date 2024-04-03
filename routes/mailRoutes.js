const express = require("express");
const router = express.Router();
const multer = require("multer");
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5 // limite chaque IP à 5 requêtes par fenêtre
});
const mailController = require("../controllers/mailController");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * @swagger
 * /mail/contact:
 *   post:
 *     summary: send mail
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: contact mail send
 */
router.post(
    "/mail/contact",upload.array('pieceJointe', 10),limiter,
    mailController.contactSendMail
);

/**
 * @swagger
 * /services/update/{id}:
 *   put:
 *     summary: Update a service
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The service id
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       200:
 *         description: Service updated
 *       404:
 *         description: Service not found
 */
router.post(
    "/mail/motPasseOublie",
    mailController.motDePasseOublie
);

module.exports = router;
