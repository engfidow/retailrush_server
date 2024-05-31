// controllers/productController.js
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/products/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

exports.upload = upload.array('images', 6); // Middleware for uploading multiple images

exports.createProduct = async (req, res) => {
    try {
        // Get paths of uploaded files
        let imagePaths = req.files.map(file => file.path);
        // Add the image paths to the product data
        const productData = {
            ...req.body,
            images: imagePaths
        };
        const product = new Product(productData);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).populate('category', 'name');
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'name');
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getSearch = async (req, res) => {
    try {
        const { search, category } = req.query;
        let query = {};

        // If a search term is provided, search in the name and description fields
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // If a category is provided, filter by category
        if (category) {
            query.category = category;
        }

        const products = await Product.find(query).populate('category', 'name');
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error);
    }
};




// controllers/productController.js

exports.getNewestProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 }).limit(10).populate('category', 'name');
        res.status(200).send(products);
    } catch (error) {
        console.error('Error fetching newest products:', error);
        res.status(500).send({ error: 'An error occurred while fetching newest products.' });
    }
};

exports.getPopularProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ rating: -1 }).limit(10).populate('category', 'name');
        res.status(200).send(products);
    } catch (error) {
        console.error('Error fetching popular products:', error);
        res.status(500).send({ error: 'An error occurred while fetching popular products.' });
    }
};

exports.getTrendingProducts = async (req, res) => {
    try {
        const products = await Product.find({ isTrending: true }).limit(10).populate('category', 'name');
        res.status(200).send(products);
    } catch (error) {
        console.error('Error fetching trending products:', error);
        res.status(500).send({ error: 'An error occurred while fetching trending products.' });
    }
};


exports.getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const products = await Product.find({ category: categoryId }).populate('category', 'name');
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error);
    }
};



exports.getSimilarProducts = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.categoryId }).limit(10).populate('category', 'name');
        res.status(200).send(products);
    } catch (error) {
        console.error('Error fetching trending products:', error);
        res.status(500).send({ error: 'An error occurred while fetching trending products.' });
    }
};