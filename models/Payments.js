// models/Payments.js
const mongoose = require('mongoose');

const PaymentsSchema = new mongoose.Schema({
  name: { type: String, required: true , default: "EVC"},
  phone: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }  // User reference
},{timestamps:true});

module.exports = mongoose.model('Payments', PaymentsSchema);
