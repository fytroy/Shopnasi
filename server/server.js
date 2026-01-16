const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { db } = require('./data/db'); // Initializes DB on import

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Basic health check
app.get('/', (req, res) => {
    res.json({ message: 'Shopnasi Headless API is running', status: 'active' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
