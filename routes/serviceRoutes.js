const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Service management
 */

/**
 * @swagger
 * /services:
 *   get:
 *     summary: List all services
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: An array of services
 */
router.get("/services", serviceController.listServices);

/**
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Get a service by id
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The service id
 *     responses:
 *       200:
 *         description: Service data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found
 */
router.get("/services/:id", serviceController.getServiceById);

/**
 * @swagger
 * /services/create:
 *   post:
 *     summary: Create a new service
 *     tags: [Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Service created
 */
router.post(
    "/services/create",
    requireAuth,
    requireAdmin,
    serviceController.createService
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
router.put(
    "/services/update/:id",
    requireAuth,
    requireAdmin,
    serviceController.updateService
);

/**
 * @swagger
 * /services/delete/{id}:
 *   delete:
 *     summary: Delete a service
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
 *     responses:
 *       200:
 *         description: Service deleted
 *       404:
 *         description: Service not found
 */
router.delete(
    "/services/delete/:id",
    requireAuth,
    requireAdmin,
    serviceController.deleteService
);

module.exports = router;
