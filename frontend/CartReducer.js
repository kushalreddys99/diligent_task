// src/context/CartReducer.js

export const cartInitialState = {
    cartItems: [],
    loading: false,
    error: null,
};

// Reducer function to handle state updates
export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_CART_START':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'FETCH_CART_SUCCESS':
            return {
                ...state,
                loading: false,
                cartItems: action.payload // payload is the array of cart items from the backend
            };
        case 'CART_OPERATION_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload // payload is the error message
            };
        case 'UPDATE_CART_SUCCESS':
            return {
                ...state,
                loading: false,
                // Assuming payload contains the updated full cart from the backend response
                cartItems: action.payload 
            };
        default:
            return state;
    }
};
