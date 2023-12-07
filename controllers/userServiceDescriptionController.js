const UserServiceDescription = require("../models/userServiceDescription");

exports.getUserServiceDescriptionById = async (req, res) => {
    try {
        const userServiceDescription = await UserServiceDescription.findById(req.params.id);
        if (!userServiceDescription) {
            return res.status(404).send("User service description not found");
        }
        res.json(userServiceDescription);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.listUserServiceDescriptions = async (req, res) => {
    try {
        const userServiceDescriptions = await UserServiceDescription.find();
        res.json(userServiceDescriptions);
    } catch (err) {
        res.status(500).json({
            error: "Erreur lors de la récupération des descriptions",
        });
    }
}

exports.createUserServiceDescription = async (req, res) => {
    try {
        const newUserServiceDescription = new UserServiceDescription(req.body);
        await newUserServiceDescription.save();
        res.status(201).json(newUserServiceDescription);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

exports.updateUserServiceDescription = async (req, res) => {
    try {
        const userServiceDescription = await UserServiceDescription.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!userServiceDescription) {
            return res.status(404).send("User service description not found");
        }
        res.json(userServiceDescription);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

exports.deleteUserServiceDescription = async (req, res) => {
    try {
        const userServiceDescription = await UserServiceDescription.findByIdAndDelete(req.params.id);
        if (!userServiceDescription) {
            return res.status(404).send("User service description not found");
        }
        res.send({ message: "User service description successfully deleted" });
    } catch (err) {
        res.status(500).send(err.message);
    }
}