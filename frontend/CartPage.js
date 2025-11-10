import React, { useEffect } from 'react';
// import { useCart } from '../context/CartContext'; // Assumes you create this context

const CartItem = ({ item }) => {
    // const { updateQuantity, removeItem } = useCart();
    // Implementation of buttons to adjust quantity and remove item
    return (
        <div className="cart-item">
            <h4>{item.productName}</h4>
            <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
            <div className="item-controls">
                <span>Quantity: {item.quantity}</span>
                <button> - </button>
                <button> + </button>
                <button className="remove-btn">Remove</button>
            </div>
        </div>
    );
};

const CartPage = () => {
    // const { cartItems, loadingCart, fetchCart } = useCart();
    
    // Fetch cart data when the page loads
    // useEffect(() => {
    //     fetchCart();
    // }, [fetchCart]);

    const cartItems = []; // Placeholder, replace with items from context/state
    const loadingCart = false;
    const total = 0; // Placeholder calculation

    if (loadingCart) return <h2 className="loading">Loading Cart...</h2>;

    return (
        <div className="cart-page">
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty. <Link to="/">Start shopping!</Link></p>
            ) : (
                <div className="cart-content">
                    <div className="cart-items-list">
                        {cartItems.map(item => (
                            <CartItem key={item.productId} item={item} />
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h3>Order Summary</h3>
                        <p>Subtotal: ${total.toFixed(2)}</p>
                        <button className="checkout-btn">Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
