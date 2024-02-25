// routes/cartRoutes.js
const express = require('express');

const router = express.Router();

// Example: In-memory shopping cart
let shoppingCart = [];

// Get shopping cart
router.get('/cart', (req, res) => {
  res.json(shoppingCart);
});

// Add item to cart
router.post('/cart/add', (req, res) => {
  const { productId, quantity } = req.body;
  const item = { productId, quantity };
  shoppingCart.push(item);
  res.json(item);
});

module.exports = router;
