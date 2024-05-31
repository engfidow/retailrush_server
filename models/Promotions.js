// models/Promotions.js
const mongoose = require('mongoose');

const PromotionsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  discountPercentage: { type: Number, required: true, default: 0 },
  isTrending: { type: Boolean, default: true },
  image: {type: String, required: true, }

},{timestamps:true});

module.exports = mongoose.model('Promotions', PromotionsSchema);
