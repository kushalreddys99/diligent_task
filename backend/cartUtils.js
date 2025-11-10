// backend/utils/cartUtils.js

const Cart = require('../models/Cart');

// Function to find an existing cart or create a new one
const getOrCreateCart = async (sessionId) => {
    let cart = await Cart.findOne({ sessionId }).populate('items.productId');

    if (!cart) {
        // Create a new cart if none exists for the session ID
        cart = new Cart({ sessionId, items: [] });
        await cart.save();
    }
    return cart;
};

// Function to update the items array within a cart
const updateCartItems = async (cart, productId, quantity) => {
    const itemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
        // Item exists: Update quantity
        cart.items[itemIndex].quantity = quantity;

        // Remove item if quantity is zero or less
        if (cart.items[itemIndex].quantity <= 0) {
            cart.items.splice(itemIndex, 1);
        }
    } else if (quantity > 0) {
        // Item does not exist and quantity is positive: Add new item
        cart.items.push({ productId, quantity });
    }
    
    // Save and return the updated cart, populating product details for the response
    await cart.save();
    await cart.populate('items.productId');
    
    return cart;
};

module.exports = {
    getOrCreateCart,
    updateCartItems
};
