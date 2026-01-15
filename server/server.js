const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock database
let items = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 129.99,
    category: 'Electronics',
    rating: 4.5,
    inStock: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and smartphone integration.',
    price: 249.99,
    category: 'Electronics',
    rating: 4.7,
    inStock: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt available in multiple colors.',
    price: 29.99,
    category: 'Clothing',
    rating: 4.3,
    inStock: true,
    createdAt: new Date().toISOString()
  }
];

// Routes
app.get('/api/items', (req, res) => {
  res.json({
    success: true,
    data: items,
    total: items.length
  });
});

app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(item => item.id === id);
  
  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Item not found'
    });
  }
  
  res.json({
    success: true,
    data: item
  });
});

app.post('/api/items', (req, res) => {
  const { name, description, price, category, features, inStock } = req.body;
  
  // Validation
  if (!name || !description || !price || !category) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }
  
  const newItem = {
    id: items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1,
    name,
    description,
    price: parseFloat(price),
    category,
    features: features || [],
    inStock: inStock !== undefined ? inStock : true,
    rating: 0,
    reviewCount: 0,
    createdAt: new Date().toISOString()
  };
  
  items.push(newItem);
  
  res.status(201).json({
    success: true,
    data: newItem,
    message: 'Item created successfully'
  });
});

app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Item not found'
    });
  }
  
  const updatedItem = {
    ...items[itemIndex],
    ...req.body,
    id: id, // Ensure ID doesn't change
    updatedAt: new Date().toISOString()
  };
  
  items[itemIndex] = updatedItem;
  
  res.json({
    success: true,
    data: updatedItem,
    message: 'Item updated successfully'
  });
});

app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Item not found'
    });
  }
  
  items.splice(itemIndex, 1);
  
  res.json({
    success: true,
    message: 'Item deleted successfully'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});

module.exports = app;