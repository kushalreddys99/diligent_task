// src/context/CartContext.js

import React, { createContext, useReducer, useContext } from 'react';
import { cartReducer, cartInitialState } from './CartReducer';

const CartContext = createContext(cartInitialState);
const BACKEND_URL = 'http://localhost:5000/api/cart'; // Your backend cart routes

// Helper function to handle cart persistence (e.g., storing a session ID)
// For simplicity, we'll use Local Storage for the session ID here.
const getSessionId = () => localStorage.getItem('sessionId');
const setSessionId = (id) => localStorage.setItem('sessionId', id);

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState);

    // ----------------------------------------------------
    // API FUNCTIONS
    // ----------------------------------------------------

    // 1. Fetch the cart contents from the backend
    const fetchCart = async () => {
        dispatch({ type: 'FETCH_CART_START' });
        const sessionId = getSessionId();

        if (!sessionId) {
            // No session, cart is empty
            dispatch({ type: 'FETCH_CART_SUCCESS', payload: [] });
            return;
        }

        try {
            const response = await fetch(BACKEND_URL, {
                headers: { 'X-Session-ID': sessionId } // Send session ID for cart retrieval
            });
            
            if (!response.ok) throw new Error('Could not fetch cart.');

            const data = await response.json();
            dispatch({ type: 'FETCH_CART_SUCCESS', payload: data.items || [] });

        } catch (error) {
            dispatch({ type: 'CART_OPERATION_FAILURE', payload: error.message });
        }
    };

    // 2. Add or update an item in the cart
    const updateCartItem = async (productId, quantity) => {
        dispatch({ type: 'FETCH_CART_START' });
        let sessionId = getSessionId();
        
        // If no session ID exists, generate one for the first cart operation
        if (!sessionId) {
            sessionId = 'temp-session-' + Date.now(); // Basic temp ID
            setSessionId(sessionId);
        }

        try {
            const response = await fetch(`${BACKEND_URL}/add`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'X-Session-ID': sessionId // Send session ID
                },
                body: JSON.stringify({ productId, quantity })
            });

            if (!response.ok) throw new Error('Failed to update cart item.');

            const data = await response.json();
            dispatch({ type: 'UPDATE_CART_SUCCESS', payload: data.items });

        } catch (error) {
            dispatch({ type: 'CART_OPERATION_FAILURE', payload: error.message });
        }
    };
    
    // Add other cart functions here: removeItemFromCart, clearCart, etc.

    const contextValue = {
        ...state,
        fetchCart,
        updateCartItem,
        // Helper to get total item count for Navbar display
        getCartCount: state.cartItems.reduce((acc, item) => acc + item.quantity, 0),
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

// Hook for using cart context easily in components
export const useCart = () => useContext(CartContext);
