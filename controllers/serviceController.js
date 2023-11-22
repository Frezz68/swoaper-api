const Service = require("./Service"); // Assuming Service model is in the same directory

// List all services
exports.listServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Get a service by ID
exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).send("Service not found");
        }
        res.json(service);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Create a new service
exports.createService = async (req, res) => {
    try {
        const newService = new Service(req.body);
        await newService.save();
        res.status(201).json(newService);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Update a service
exports.updateService = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!service) {
            return res.status(404).send("Service not found");
        }
        res.json(service);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Delete a service
exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).send("Service not found");
        }
        res.send({ message: "Service successfully deleted" });
    } catch (err) {
        res.status(500).send(err.message);
    }
};
