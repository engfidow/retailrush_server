// models/Order.js
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  phone: { type: Number, required: true },
  address: { type: String, required: true },
  orderItems: [orderItemSchema],
  Description: { type: String, required: true },
  paymentPhone: { type: Number, required: true },
  totalprice: { type: Number, required: true },
  deliverprice: { type: Number, required: true },
  status: { type: String, default: 'Pending' }
},{timestamps:true});

module.exports = mongoose.model('Order', orderSchema);
