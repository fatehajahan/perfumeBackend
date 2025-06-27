const orderSchema = require("../models/orderSchema");
const { ObjectId } = require("mongodb")


async function orderCtrl(req, res) {
    const trans_id = new ObjectId().toString()
    try {
        const {
            firstname,
            lastname,
            address,
            town,
            country,
            postcode,
            phone,
            notes,
            price,
            email,
        } = req.body;
        
        
        const orderData = new orderSchema({
            firstname,
            lastname,
            address,
            town,
            country,
            postcode,
            phone,
            notes,
            price,
            email,
            transactionId: trans_id
        })
        await orderData.save()

        res.status(201).json({
            message: "order added successfully done",
            status: "success",
            data: orderData
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", status: "failed" });
    }
}

async function getAllOrderCtrl(req, res) {
    try {
        const allOrders = await orderSchema.find({});
        if (!allOrders.length) {
            return res.status(404).json({ error: "No orders found", status: "failed" });
        }
        res.status(200).json({
            message: "Fetched all orders",
            status: "success",
            data: allOrders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", status: "failed" });
    }
}   

module.exports = { orderCtrl, getAllOrderCtrl }