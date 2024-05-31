// routes/userRouter.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/User');

// Include multer middleware for routes that handle image uploads
router.post('/users/signup', userController.upload, userController.createUser);
router.post('/users/login', userController.loginUser);
router.get('/users', userController.protect, userController.getAllUsers);


router.put('/users/:id', userController.upload, userController.updateUser);

router.post('/users/update', userController.upload, userController.updateUserPassword);

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.delete('/users/:id', userController.deleteUser);
router.get('/users/email/:email', userController.getUserByEmail);

//route for changing password
router.post('/users/change-password', userController.changePassword);

router.post('/users/send-verification-code', userController.sendVerificationCode);
router.post('/users/verify-code-update-password', userController.verifyCodeAndUpdatePassword);



module.exports = router;
