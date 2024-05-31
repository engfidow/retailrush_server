// controllers/paymentsController.js
const Payments = require('../models/Payments');

exports.createPayment = async (req, res) => {
    try {
        const payment = new Payments(req.body);
        await payment.save();
        res.status(201).send(payment);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payments.find({}).populate('user', '_id email');
        

        res.status(200).send(payments);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getPaymentById = async (req, res) => {
    try {
        
        const payment = await Payments.findById(req.params.id).populate('user', '_id email');
        if (!payment) {
            return res.status(404).send();
        }
        res.status(200).send(payment);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updatePayment = async (req, res) => {
    try {
        const payment = await Payments.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('user');
        if (!payment) {
            return res.status(404).send();
        }
        res.status(200).send(payment);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deletePayment = async (req, res) => {
    try {
        const payment = await Payments.findByIdAndDelete(req.params.id);
        if (!payment) {
            return res.status(404).send();
        }
        res.status(200).send({ message: "Payment deleted successfully!" });
    } catch (error) {
        res.status(500).send(error);
    }
};
