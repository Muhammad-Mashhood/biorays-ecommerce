const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// Post routes for different email functions
router.post('/contact', emailController.sendContactEmail);
router.post('/subscribe', emailController.sendSubscriptionEmail);
router.post('/reset-password', emailController.sendPasswordResetEmail);

module.exports = router;