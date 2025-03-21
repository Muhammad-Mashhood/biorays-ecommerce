import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import FeaturedCollection from './components/FeaturedCollection';
import ContactForm from './components/ContactForm';
import Subscribe from './components/Subscribe';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={
            <main>
              <Hero />
              <FeaturedProducts />
              <FeaturedCollection />
              <ContactForm />
              <Subscribe />
            </main>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
