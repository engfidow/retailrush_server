// routes/promotionsRouter.js
const express = require('express');
const router = express.Router();
const promotionsController = require('../controllers/Promotions');

// Include the Multer middleware for routes that need to handle image uploads
router.post('/promotions', promotionsController.uploadSingle, promotionsController.createPromotion);
router.put('/promotions/:id', promotionsController.uploadSingle, promotionsController.updatePromotion);

router.get('/promotions', promotionsController.getAllPromotions);
router.get('/promotions/:id', promotionsController.getPromotionById);
router.delete('/promotions/:id', promotionsController.deletePromotion);



module.exports = router;
