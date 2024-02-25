// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Product model and routes
const productRoutes = require('./routes/productRoutes');
app.use('/api', productRoutes);

// Shopping Cart routes
const cartRoutes = require('./routes/cartRoutes');
app.use('/api', cartRoutes);

// Checkout route
const checkoutRoutes = require('./routes/checkoutRoutes');
app.use('/api', checkoutRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
