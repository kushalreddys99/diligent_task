import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`);
                if (!response.ok) throw new Error('Product not found or network error.');
                
                const data = await response.json();
                setProduct(data);
            } catch (e) {
                console.error("Fetch error:", e);
                setError('Failed to load product details.');
            } finally {
                setLoading(false);
            }
        };
        fetchProductDetails();
    }, [id]);

    const handleAddToCart = () => {
        // Implement logic using CartContext to post to backend: 
        // addToCart(product._id, quantity);
        console.log(`Adding ${quantity} units of ${product.name} to cart.`);
    };

    if (loading) return <h2 className="loading">Loading Product Details...</h2>;
    if (error) return <h2 className="error">{error}</h2>;
    if (!product) return <h2 className="error">Product not found.</h2>;

    return (
        <div className="product-details-page">
            <div className="details-image">
                <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="details-info">
                <h1>{product.name}</h1>
                <p className="price-large">${product.price.toFixed(2)}</p>
                <p>{product.description}</p>
                <p className={product.stockQuantity > 0 ? 'in-stock' : 'out-stock'}>
                    Stock: **{product.stockQuantity}**
                </p>
                
                <div className="cart-controls">
                    <input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        min="1" 
                        max={product.stockQuantity}
                        disabled={product.stockQuantity === 0}
                    />
                    <button 
                        onClick={handleAddToCart}
                        disabled={product.stockQuantity === 0 || quantity > product.stockQuantity || quantity < 1}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
