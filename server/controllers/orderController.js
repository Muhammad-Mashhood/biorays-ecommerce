const Order = require('../models/Order');
const Product = require('../models/Product');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

// Create transporter for sending order confirmation emails
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { 
      orderItems, 
      shippingAddress, 
      paymentMethod, 
      email,
      totalPrice 
    } = req.body;

    // Transform the orderItems to allow string IDs for demo products
    const transformedOrderItems = orderItems.map(item => {
      return {
        name: item.name,
        quantity: item.quantity,
        image: item.image,
        price: item.price,
        salePrice: item.salePrice || 0,
        onSale: item.onSale || false,
        // Store the product ID as is - it could be a string ID for demo products
        product: item._id,
        _id: item._id
      };
    });

    // Create order object with the transformed items
    const order = new Order({
      orderItems: transformedOrderItems,
      shippingAddress,
      paymentMethod,
      email,
      totalPrice,
      user: req.user ? req.user._id : null
    });

    // Save the order with strict: false to bypass schema validation for this operation
    const createdOrder = await order.save({ validateBeforeSave: false });
    
    // Send order confirmation email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: `BIORAYS: Your Order #${createdOrder._id} Confirmation`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #00A19C;">Thank You for Your Order!</h1>
            <p>Dear ${shippingAddress.fullName},</p>
            <p>We've received your order and we're working on it now. Here's a summary:</p>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Order #${createdOrder._id}</h3>
              <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
              <p><strong>Payment Method:</strong> ${
                paymentMethod === 'cod' ? 'Cash on Delivery' : 
                paymentMethod === 'bank' ? 'Bank Transfer' : 'EasyPaisa/JazzCash'
              }</p>
              <p><strong>Total:</strong> Rs. ${totalPrice.toLocaleString()}</p>
            </div>
            
            <h3>Order Items:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background-color: #f8f9fa;">
                <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Item</th>
                <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Qty</th>
                <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Price</th>
              </tr>
              ${orderItems.map(item => `
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
                  <td style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
                  <td style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Rs. ${
                    (item.onSale ? item.salePrice : item.price).toLocaleString()
                  }</td>
                </tr>
              `).join('')}
              <tr style="font-weight: bold;">
                <td colspan="2" style="text-align: right; padding: 8px;">Total:</td>
                <td style="text-align: right; padding: 8px;">Rs. ${totalPrice.toLocaleString()}</td>
              </tr>
            </table>
            
            <h3>Shipping Address:</h3>
            <p>
              ${shippingAddress.fullName}<br>
              ${shippingAddress.address}<br>
              ${shippingAddress.city}, ${shippingAddress.province} ${shippingAddress.postalCode}<br>
              Phone: ${shippingAddress.phone}
            </p>
            
            <p>We'll notify you when your order has been shipped.</p>
            <p>Thank you for shopping with BIORAYS!</p>
          </div>
        `
      });
      console.log('Order confirmation email sent successfully');
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
      // Continue with order creation even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: createdOrder
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create order', 
      error: error.message 
    });
  }
};

// Get orders (admin)
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort('-createdAt');
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error('Fetch orders error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch orders', 
      error: error.message 
    });
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error('Fetch user orders error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch orders', 
      error: error.message 
    });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    // Check if user has permission to view this order
    if (!req.user.isAdmin && order.user && order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error('Fetch order error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch order', 
      error: error.message 
    });
  }
};

// Get order by ID for guest user (no auth required)
exports.getGuestOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error('Fetch guest order error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch order', 
      error: error.message 
    });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    order.status = status;
    
    if (status === 'Delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }
    
    const updatedOrder = await order.save();
    
    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update order', 
      error: error.message 
    });
  }
};

// Mark order as paid
exports.updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      updateTime: req.body.updateTime,
      emailAddress: req.body.emailAddress
    };
    
    const updatedOrder = await order.save();
    
    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error('Update order payment error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update payment status', 
      error: error.message 
    });
  }
};