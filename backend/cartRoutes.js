// backend/routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { getOrCreateCart, updateCartItems } = require('../utils/cartUtils');

// Middleware to extract the sessionId (used for cart identification)
const extractSessionId = (req, res, next) => {
    // The frontend should send the sessionId in a custom header (X-Session-ID)
    const sessionId = req.headers['x-session-id']; 
    if (!sessionId) {
        return res.status(400).json({ msg: 'Session ID is required for cart operations.' });
    }
    req.sessionId = sessionId;
    next();
};

// @route   GET /api/cart
// @desc    Get the current contents of the user's cart
// @access  Public
router.get('/', extractSessionId, async (req, res) => {
    try {
        const cart = await getOrCreateCart(req.sessionId);
        // The cart is already populated in getOrCreateCart
        res.json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error retrieving cart');
    }
});

// @route   POST /api/cart/add
// @desc    Add a product to the cart or update its quantity
// @access  Public
router.post('/add', extractSessionId, async (req, res) => {
    const { productId, quantity } = req.body;

    // Basic validation
    if (!productId || typeof quantity !== 'number' || quantity < 0) {
        return res.status(400).json({ msg: 'Invalid product ID or quantity.' });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found.' });
        }
        
        // 1. Find or create the cart
        const cart = await getOrCreateCart(req.sessionId);

        // 2. Update the items in the cart (handled by cartUtils)
        const updatedCart = await updateCartItems(cart, productId, quantity);

        // Send the updated cart data back to the frontend
        res.json(updatedCart);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error updating cart');
    }
});

module.exports = router;
