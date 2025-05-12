const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

// Create a new order (no auth required for guest checkout)
router.post('/', orderController.createOrder);

// Get order by id for guest user (no auth required)
router.get('/guest/:id', orderController.getGuestOrderById);

// Get all orders (admin only) 
router.get('/', protect, adminOnly, orderController.getOrders);

// Get user's orders
router.get('/myorders', protect, orderController.getUserOrders);

// Get order by ID (for logged-in users)
router.get('/:id', protect, orderController.getOrderById);

// Update order status (admin only)
router.put('/:id/status', protect, adminOnly, orderController.updateOrderStatus);

// Update order to paid
router.put('/:id/pay', protect, orderController.updateOrderToPaid);

module.exports = router;