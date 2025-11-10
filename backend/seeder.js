// backend/seeder.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product'); 

dotenv.config();

const MONGO_URI = process.env.MONGO_URI; 

const sampleProducts = [
    {
        name: 'Wireless Mechanical Keyboard',
        price: 99.99,
        description: 'A tactile, clicky mechanical keyboard with RGB lighting and long battery life.',
        imageUrl: 'https://example.com/images/keyboard.jpg',
        stockQuantity: 15
    },
    {
        name: '4K Ultra HD Monitor',
        price: 349.50,
        description: '27-inch monitor with stunning color accuracy and high refresh rate for professionals and gamers.',
        imageUrl: 'https://example.com/images/monitor.jpg',
        stockQuantity: 8
    },
    {
        name: 'Noise Cancelling Headphones',
        price: 149.00,
        description: 'Over-ear headphones with industry-leading noise cancellation.',
        imageUrl: 'https://example.com/images/headphones.jpg',
        stockQuantity: 25
    },
    // Add more sample products here
];

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Atlas Connected for Seeding');
    } catch (error) {
        console.error(`Error connecting to DB: ${error.message}`);
        process.exit(1);
    }
};

const importData = async () => {
    await connectDB();
    try {
        // Clear existing data (optional, but good practice for seeding)
        await Product.deleteMany(); 
        
        // Insert new data
        await Product.insertMany(sampleProducts);

        console.log('Data Imported Successfully!');
        process.exit();

    } catch (error) {
        console.error(`Error with data import: ${error.message}`);
        process.exit(1);
    }
};

// Execute the function
importData();
