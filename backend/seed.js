const mongoose = require('mongoose');
const Product = require('./models/Product');
const dotenv = require('dotenv');

dotenv.config();

const products = [
    {
        name: "Wireless Bluetooth Headphones",
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life",
        price: 79.99,
        category: "Electronics",
        countInStock: 15,
        image: "/image/Headphone.jpg"
    },
    {
        name: "Smart Fitness Watch",
        description: "Feature-rich smartwatch with heart rate monitoring, GPS, and waterproof design",
        price: 199.99,
        category: "Electronics",
        countInStock: 10,
        image: "/image/Fitness.jpg"
    },
    {
        name: "Laptop Backpack",
        description: "Durable laptop backpack with USB charging port and multiple compartments",
        price: 49.99,
        category: "Accessories",
        countInStock: 25,
        image: "/image/Backpack.jpg"
    },
    {
        name: "Mechanical Keyboard",
        description: "RGB mechanical keyboard with blue switches and programmable keys",
        price: 89.99,
        category: "Electronics",
        countInStock: 8,
        image: "/image/Keyboard.jpg"
    },
    {
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with precision tracking and long battery life",
        price: 29.99,
        category: "Electronics",
        countInStock: 20,
        image: "/image/Mouse.jpg"
    },
    {
        name: "Phone Case",
        description: "Protective phone case with shock absorption and sleek design",
        price: 19.99,
        category: "Accessories",
        countInStock: 50,
        image: "/image/Case.jpg"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('📦 Connected to MongoDB');
        
        await Product.deleteMany({});
        console.log('🧹 Cleared existing products');
        
        await Product.insertMany(products);
        console.log('✅ Sample products added successfully!');
        
        process.exit();
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();