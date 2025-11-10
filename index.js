// Example modification in src/index.js (or wherever you render the App)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext'; // <-- Import the Provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/* Wrap your entire application with the provider */}
        <CartProvider>
            <App /> 
        </CartProvider>
    </React.StrictMode>
);
