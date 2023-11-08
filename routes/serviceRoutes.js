const express = require('express');
const router = express.Router();
const serviceController = require('./serviceController');

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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 */
router.get('/', serviceController.listServices);

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
router.get('/:id', serviceController.getServiceById);

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Create a new service
 *     tags: [Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       201:
 *         description: Service created
 */
router.post('/', serviceController.createService);

/**
 * @swagger
 * /services/{id}:
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
router.put('/:id', serviceController.updateService);

/**
 * @swagger
 * /services/{id}:
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
 *     responses:
 *       200:
 *         description: Service deleted
 *       404:
 *         description: Service not found
 */
router.delete('/:id', serviceController.deleteService);

module.exports = router;
