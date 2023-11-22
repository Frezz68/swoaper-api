const mongoose = require("mongoose");

const filterSchema = new mongoose.Schema({
    filterSize: [String], // Vous pouvez utiliser String ou un type de données approprié pour vos besoins
    mark: [String], // Vous pouvez utiliser String ou un type de données approprié pour vos besoins
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
});

const Filter = mongoose.model("Filter", filterSchema);

module.exports = Filter;
