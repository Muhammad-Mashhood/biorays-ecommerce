const Product = require('../models/Product');
const mongoose = require('mongoose');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, count: products.length, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Error fetching products', error: error.message });
  }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if the id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      // For demo products with simple string IDs, check our sample data
      // This is a fallback for product IDs that aren't in MongoDB format
      const demoProducts = [
        {
          _id: '1',
          name: "Blood Bank Refrigerator",
          price: 38500,
          image: "/images/DLC.webp",
          category: "Lab Equipment",
          description: "Quality blood bank refrigerator for medical use",
          countInStock: 5,
          onSale: false
        },
        {
          _id: '2',
          name: "Agglutination Viewer",
          price: 22000,
          image: "/images/Agglutination-viewer-Biolite-for-slide.webp",
          category: "Lab Instruments",
          description: "Biolite slide agglutination viewer for laboratory analysis",
          countInStock: 8,
          onSale: false
        },
        {
          _id: '3',
          name: "Laboratory Centrifuge",
          price: 45000,
          image: "/images/Centrifuge.webp",
          category: "Lab Equipment",
          description: "High-speed laboratory centrifuge for sample preparation",
          countInStock: 3,
          onSale: false
        },
        {
          _id: '4',
          name: "Tube Stripper",
          price: 12500,
          image: "/images/TubeStripperfortubesealing.webp",
          category: "Lab Accessories",
          description: "Tube stripper for efficient tube sealing",
          countInStock: 12,
          onSale: false
        }
      ];
      
      const product = demoProducts.find(p => p._id === id);
      
      if (product) {
        return res.status(200).json({ success: true, product });
      } else {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
    }
    
    // Continue with normal MongoDB lookup for valid ObjectIds
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, message: 'Error fetching product', error: error.message });
  }
};

// Create new product (Admin only)
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ success: false, message: 'Error creating product', error: error.message });
  }
};

// Update product (Admin only)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ success: false, message: 'Error updating product', error: error.message });
  }
};

// Delete product (Admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Error deleting product', error: error.message });
  }
};