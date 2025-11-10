import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    // Note: The addToCart function would come from the CartContext
    // const { addToCart } = useCart(); 

    const handleAddToCart = () => {
        // Implement logic to call addToCart(product._id, 1) to hit the backend API
        console.log(`Attempted to add ${product.name} to cart. ID: ${product._id}`);
    };

    return (
        <div className="product-card">
            <Link to={`/product/${product._id}`}>
                {/*  */}
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
            </Link>
            <p className="price">${product.price.toFixed(2)}</p>
            <p>Stock: {product.stockQuantity}</p>
            <button 
                onClick={handleAddToCart} 
                disabled={product.stockQuantity === 0}
            >
                {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
        </div>
    );
};

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Ensure this URL matches your backend's API endpoint
                const response = await fetch('http://localhost:5000/api/products'); 
                if (!response.ok) throw new Error('Network response was not ok');
                
                const data = await response.json();
                setProducts(data);
            } catch (e) {
                console.error("Fetch error:", e);
                setError('Failed to load products.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <h2 className="loading">Loading Products...</h2>;
    if (error) return <h2 className="error">{error}</h2>;

    return (
        <div className="product-list-page">
            <h2>Featured Products</h2>
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
