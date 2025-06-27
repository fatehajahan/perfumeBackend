const mongoose = require("mongoose")
const { Schema } = mongoose

const orderSchema = new Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String
    },
    address: {
        type: String,
    },
    town: {
        type: String,
    },
    country: {
        type: String,
    },
    postcode: {
        type: String,
    },
    phone: {
        type: String,
    },
    notes: {
        type: String,
    },
    price: {
        type: String,
    },
    email: {
        type: String
    },
    transactionId: {
        type: String,
    }
});


module.exports = mongoose.model("OrderList", orderSchema)