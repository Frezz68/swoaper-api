const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    nameService: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    about: String,
    notices: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Notice",
        },
    ],
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
    },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
