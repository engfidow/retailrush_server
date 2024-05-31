// routes/productRouter.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/Product');

// Route for searching products
router.get('/products/search', productController.getSearch);

// Other product routes
router.post('/products', productController.upload, productController.createProduct);
router.put('/products/:id', productController.upload, productController.updateProduct);
router.get('/productsr', productController.getAllProducts);
router.get('/products/:id', productController.getProduct);
router.delete('/products/:id', productController.deleteProduct);

// Routes for new filters
router.get('/productsr/newests', productController.getNewestProducts);
router.get('/productsr/populars', productController.getPopularProducts);
router.get('/productsr/trendings', productController.getTrendingProducts);



// Route for getting products by category
router.get('/products/category/:categoryId', productController.getProductsByCategory);




module.exports = router;
