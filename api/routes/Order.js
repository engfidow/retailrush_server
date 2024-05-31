// routes/orderRouter.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/Order');

router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getAllOrders);
router.get('/orders/:id', orderController.getOrderById);
router.put('/orders/:id', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);

router.get('/orders/user/:userId', orderController.getOrdersByUserId); 

module.exports = router;
