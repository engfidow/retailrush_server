const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  selprice: { type: Number, required: true },
  selpriceDate: { type: Date, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  isTrending: { type: Boolean, default: true },
  unit: { type: Number, required: true },
  rating: { type: Number, required: true, default: 3.0 },
  images: [{ type: String, required: true }],
  discountPercentage: { type: Number, required: true, default: 0 }
}, { timestamps: true });

// Add text index for searching
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
