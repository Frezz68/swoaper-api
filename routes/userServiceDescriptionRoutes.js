const express = require("express");
const router = express.Router();
const userServiceDescriptionController = require("../controllers/userServiceDescriptionController");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");


router.get("/userServiceDescriptions", requireAuth, userServiceDescriptionController.listUserServiceDescriptions);


router.get("/userServiceDescriptions/:id",requireAdmin, userServiceDescriptionController.getUserServiceDescriptionById);


router.post("/userServiceDescriptions/create",requireAuth, userServiceDescriptionController.createUserServiceDescription);


router.put("/userServiceDescriptions/update/:id",requireAuth, userServiceDescriptionController.updateUserServiceDescription);


router.delete("/userServiceDescriptions/delete/:id",requireAuth, userServiceDescriptionController.deleteUserServiceDescription);

module.exports = router;