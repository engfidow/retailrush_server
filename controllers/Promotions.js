// controllers/promotionsController.js
const Promotions = require('../models/Promotions');
const multer = require('multer');
const path = require('path');
// Configure multer for file storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/promotion/');  // Ensure this directory exists or is automatically created
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Middleware to handle single image upload
exports.uploadSingle = upload.single('image');

exports.createPromotion = async (req, res) => {
    try {
        const promotionData = {
            ...req.body,
            image: req.file ? req.file.path : ''  // Save the path of the uploaded image
        };
        const promotion = new Promotions(promotionData);
        await promotion.save();
        res.status(201).send(promotion);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.updatePromotion = async (req, res) => {
    try {
        const promotionUpdateData = {
            ...req.body,
        };
        if (req.file) {
            promotionUpdateData.image = req.file.path;  // Update with new image path if a new image was uploaded
        }
        const promotion = await Promotions.findByIdAndUpdate(req.params.id, promotionUpdateData, { new: true, runValidators: true });
        if (!promotion) {
            return res.status(404).send();
        }
        res.status(200).send(promotion);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllPromotions = async (req, res) => {
    try {
        const promotions = await Promotions.find({});
        res.status(200).send(promotions);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getPromotionById = async (req, res) => {
    try {
        const promotion = await Promotions.findById(req.params.id);
        if (!promotion) {
            return res.status(404).send();
        }
        res.status(200).send(promotion);
    } catch (error) {
        res.status(500).send(error);
    }
};



exports.deletePromotion = async (req, res) => {
    try {
        const promotion = await Promotions.findByIdAndDelete(req.params.id);
        if (!promotion) {
            return res.status(404).send();
        }
        res.status(200).send({ message: "Promotion deleted successfully!" });
    } catch (error) {
        res.status(500).send(error);
    }
};
