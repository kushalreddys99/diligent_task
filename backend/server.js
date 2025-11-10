// backend/server.js (Update this file)

// ... existing code ...

// Import Routes
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes'); // <-- NEW: Import cart routes

// Use Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes); // <-- NEW: Use cart routes

app.get('/', (req, res) => {
// ... existing code ...
