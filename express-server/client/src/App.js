// client/src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch products from the server
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    // Add item to the cart
    const response = await fetch('http://localhost:5000/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity: 1 }),
    });

    const newItem = await response.json();
    setCart([...cart, newItem]);
  };

  const checkout = async () => {
    // Simulate checkout process
    const response = await fetch('http://localhost:5000/api/checkout', {
      method: 'POST',
    });

    const result = await response.json();
    console.log(result); // Log the result of the checkout process

    // Clear the cart after successful checkout
    setCart([]);
  };

  return (
    <div className="App">
      <h1>E-commerce Website</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="cart">
        <h2>Shopping Cart</h2>
        <ul>
          {cart.map((item) => (
            <li key={item._id}>
              {item.quantity}x {item.productId}
            </li>
          ))}
        </ul>
        {cart.length > 0 && <button onClick={checkout}>Proceed to Checkout</button>}
      </div>
    </div>
  );
}

export default App;
