// routes/paymentsRouter.js
const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/Payments');

router.post('/payments', paymentsController.createPayment);
router.get('/payments', paymentsController.getAllPayments);
router.get('/payments/:id', paymentsController.getPaymentById);
router.put('/payments/:id', paymentsController.updatePayment);
router.delete('/payments/:id', paymentsController.deletePayment);

module.exports = router;
