// controllers/orderController.js
const Order = require('../models/Order');
const { payByWaafiPay } = require("../paymentEvc");
exports.createOrder = async (req, res) => {
    try {
       if (req.body.paymentName === "CASH") {
        const order = new Order(req.body);
        await order.save();
        res.status(201).send(order);
       }else{
        const waafiResponse = await payByWaafiPay({
            phone: req.body.paymentPhone,
            amount: req.body.totalprice,
            merchantUid: process.env.merchantUid,
            apiUserId: process.env.apiUserId,
            apiKey: process.env.apiKey,
          });

          if(waafiResponse.status){
            const order = new Order(req.body);
        await order.save();
        res.status(201).send(order);
          }else{
            // Handling payment failure
          return res.status(400).send({
            status: "failed",
            message: `${waafiResponse.error}` ?? "Payment Failed Try Again",
          });
          }
       }
       
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
                                 .populate('user', 'name email')  // Adding user details
                                 .populate('orderItems.product', 'name price images');
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
                                 .populate('user', 'name email')
                                 .populate('orderItems.product', 'name price');
        if (!order) {
            return res.status(404).send();
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!order) {
            return res.status(404).send();
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).send();
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send(error);
    }
};
exports.getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming the user ID is passed as a URL parameter
        const orders = await Order.find({ user: userId })
                                  .populate('user', 'name email') // Optional: Adjust based on needed user details
                                  .populate('orderItems.product', 'name price images');
        if (orders.length === 0) {
            return res.status(404).send({ message: 'No orders found for this user.' });
        }
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
};
