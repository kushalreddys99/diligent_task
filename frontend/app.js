import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import CartPage from './components/CartPage';
import './App.css'; // For basic styling

// Simple Navigation Bar component
const Navbar = () => (
    <nav className="navbar">
        <h1>🛒 E-Commerce Shop</h1>
        <div className="nav-links">
            <Link to="/">Products</Link>
            <Link to="/cart">Cart (0)</Link> {/* Cart count will be updated via Context */}
        </div>
    </nav>
);

const App = () => {
    // We would wrap this in a <CartProvider> when the Context is implemented
    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    {/* Route for the Product List page (Home Page) */}
                    <Route path="/" element={<ProductList />} />
                    
                    {/* Route for individual Product Details */}
                    {/* Note: The ProductDetails component needs to fetch data based on the :id */}
                    <Route path="/product/:id" element={<ProductDetails />} />
                    
                    {/* Route for the Shopping Cart page */}
                    <Route path="/cart" element={<CartPage />} />
                    
                    {/* Fallback/404 Route */}
                    <Route path="*" element={<h1>404: Page Not Found</h1>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
