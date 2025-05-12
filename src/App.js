import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import FeaturedCollection from './components/FeaturedCollection';
import Subscribe from './components/Subscribe';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import ContactPage from './pages/ContactPage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import ProductDetail from './pages/ProductDetail';
import AdminProductManagement from './pages/admin/ProductManagement';
import OrderConfirmation from './pages/OrderConfirmation';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/admin/products" element={<AdminProductManagement />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
            <Route path="/" element={
              <main>
                <Hero />
                <FeaturedProducts />
                <FeaturedCollection />
                <Subscribe />
              </main>
            } />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
