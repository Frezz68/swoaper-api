const mongoose = require("mongoose");

const userServiceDescriptionSchema = new mongoose.Schema({
    description: String,
    urlImg: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "service",
    },
});

const UserServiceDescription = mongoose.model("UserServiceDescription", userServiceDescriptionSchema);

module.exports = UserServiceDescription;
