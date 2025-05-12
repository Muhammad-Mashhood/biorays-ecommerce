const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables FIRST - before other imports
dotenv.config({ path: path.join(__dirname, '.env') });

// Debug to verify if variables loaded
console.log('Email config loaded:', {
  EMAIL_USER: process.env.EMAIL_USER ? 'Present' : 'Missing',
  EMAIL_PASS: process.env.EMAIL_PASS ? 'Present' : 'Missing',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ? 'Present' : 'Missing'
});

// Only now import modules that need environment variables
const connectDB = require('./config/db');
const emailRoutes = require('./routes/emailRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add this after other middleware but before routes
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Routes
app.use('/api/email', emailRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Also add a catch-all route for image errors
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (req.path.startsWith('/images/') && (err.status === 404 || err.status === 500)) {
    // If image is not found, return a placeholder
    return res.sendFile(path.join(__dirname, '../public/images/product-placeholder.png'));
  }
  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});