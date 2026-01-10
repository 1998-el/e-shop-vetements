const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

// Mock data
const mockProducts = [
  {
    id: '1',
    name: 'LEGO Classic Creative Fun',
    description: 'Unleash your creativity with this classic LEGO set perfect for all ages.',
    price: 29.99,
    stock: 50,
    brand: 'LEGO',
    category: { id: '1', name: 'Building Toys' },
    images: [
      { id: '1', url: '/images/products/lego1.jpg', isPrimary: true },
      { id: '2', url: '/images/products/lego2.jpg', isPrimary: false }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Barbie Dreamhouse',
    description: 'The ultimate Barbie dreamhouse with multiple rooms and accessories.',
    price: 199.99,
    stock: 25,
    brand: 'Barbie',
    category: { id: '2', name: 'Dolls' },
    images: [
      { id: '3', url: '/images/products/barbie1.jpg', isPrimary: true },
      { id: '4', url: '/images/products/barbie2.jpg', isPrimary: false }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Mock deliveries
const mockDeliveries = [
  {
    id: '1',
    orderId: 'order-1',
    userId: 'user-1',
    trackingNumber: 'LK123456789',
    carrier: 'Chronopost',
    status: 'IN_TRANSIT',
    shippingAddress: {
      street: '123 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      country: 'France'
    },
    recipientName: 'Jean Dupont',
    estimatedDeliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Livrer uniquement en main propre',
    location: 'Centre de tri Paris',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    orderId: 'order-2',
    userId: 'user-1',
    trackingNumber: 'LK987654321',
    carrier: 'Colissimo',
    status: 'DELIVERED',
    shippingAddress: {
      street: '456 Avenue des Champs',
      city: 'Lyon',
      postalCode: '69000',
      country: 'France'
    },
    recipientName: 'Marie Martin',
    estimatedDeliveryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    actualDeliveryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Colis livré dans la boîte aux lettres',
    location: 'Lyon Centre',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// In-memory storage for carts
const guestCarts = new Map();
const users = new Map();

app.use(cors());
app.use(express.json());

// Helper function to generate session ID
const generateSessionId = () => `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// GET /cart/guest - Get or create guest cart
app.get('/cart/guest', (req, res) => {
  const sessionId = req.headers['x-session-id'];
  
  if (!sessionId) {
    return res.status(400).json({ error: 'X-Session-Id header is required' });
  }

  let cart = guestCarts.get(sessionId);
  
  if (!cart) {
    // Create new cart
    cart = {
      id: uuidv4(),
      sessionId,
      cartItems: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    guestCarts.set(sessionId, cart);
  }

  res.json(cart);
});

// POST /cart/guest/items - Add item to guest cart
app.post('/cart/guest/items', (req, res) => {
  const sessionId = req.headers['x-session-id'];
  const { productId, quantity } = req.body;
  
  if (!sessionId) {
    return res.status(400).json({ error: 'X-Session-Id header is required' });
  }

  const product = mockProducts.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  let cart = guestCarts.get(sessionId);
  if (!cart) {
    cart = {
      id: uuidv4(),
      sessionId,
      cartItems: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    guestCarts.set(sessionId, cart);
  }

  // Check if item already exists
  const existingItem = cart.cartItems.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    const newItem = {
      id: uuidv4(),
      productId,
      quantity,
      product
    };
    cart.cartItems.push(newItem);
  }

  cart.updatedAt = new Date().toISOString();

  const updatedItem = cart.cartItems.find(item => item.productId === productId);
  res.json(updatedItem);
});

// PUT /cart/guest/items/:itemId - Update item quantity in guest cart
app.put('/cart/guest/items/:itemId', (req, res) => {
  const sessionId = req.headers['x-session-id'];
  const { quantity } = req.body;
  const itemId = req.params.itemId;
  
  if (!sessionId) {
    return res.status(400).json({ error: 'X-Session-Id header is required' });
  }

  let cart = guestCarts.get(sessionId);
  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  const itemIndex = cart.cartItems.findIndex(item => item.id === itemId);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found in cart' });
  }

  if (quantity <= 0) {
    // Remove item if quantity is 0 or negative
    cart.cartItems.splice(itemIndex, 1);
  } else {
    // Update quantity
    cart.cartItems[itemIndex].quantity = quantity;
  }

  cart.updatedAt = new Date().toISOString();
  
  res.json(cart);
});

// DELETE /cart/guest/items/:itemId - Remove item from guest cart
app.delete('/cart/guest/items/:itemId', (req, res) => {
  const sessionId = req.headers['x-session-id'];
  const itemId = req.params.itemId;
  
  if (!sessionId) {
    return res.status(400).json({ error: 'X-Session-Id header is required' });
  }

  let cart = guestCarts.get(sessionId);
  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  const itemIndex = cart.cartItems.findIndex(item => item.id === itemId);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found in cart' });
  }

  // Remove the item
  cart.cartItems.splice(itemIndex, 1);
  cart.updatedAt = new Date().toISOString();
  
  res.json(cart);
});

// POST /cart/guest/convert-to-user - Convert anonymous cart to user cart
app.post('/cart/guest/convert-to-user', (req, res) => {
  const sessionId = req.headers['x-session-id'];
  const { email, firstName, lastName, phone } = req.body;
  
  if (!sessionId) {
    return res.status(400).json({ error: 'X-Session-Id header is required' });
  }

  const anonymousCart = guestCarts.get(sessionId);
  if (!anonymousCart || anonymousCart.cartItems.length === 0) {
    return res.status(404).json({ error: 'Anonymous cart not found or empty' });
  }

  // Create or find user
  let user = Array.from(users.values()).find(u => u.email === email);
  
  if (!user) {
    user = {
      id: uuidv4(),
      email,
      firstName,
      lastName,
      phone,
      role: 'USER',
      createdAt: new Date().toISOString()
    };
    users.set(user.id, user);
  } else {
    // Update user info
    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
  }

  // Create user cart (simplified - in real app would merge with existing cart)
  const userCart = {
    id: uuidv4(),
    userId: user.id,
    cartItems: [...anonymousCart.cartItems],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // Delete anonymous cart
  guestCarts.delete(sessionId);

  res.json(userCart);
});

// POST /cart/guest/checkout - Guest checkout
app.post('/cart/guest/checkout', (req, res) => {
  const { productId, quantity, customerInfo, shippingAddress, payment } = req.body;
  
  const product = mockProducts.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const totalAmount = product.price * quantity;

  // Create order
  const order = {
    id: uuidv4(),
    userId: `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    total: totalAmount,
    status: 'PENDING',
    guestInfo: {
      email: customerInfo.email,
      name: customerInfo.name,
      phone: customerInfo.phone,
      shippingAddress
    },
    items: [{
      productId,
      quantity,
      price: product.price,
      product
    }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // Create payment
  const payment_record = {
    id: uuidv4(),
    orderId: order.id,
    amount: totalAmount,
    currency: payment.currency,
    provider: payment.provider,
    paymentMethod: 'CREDIT_CARD',
    status: 'PENDING',
    description: `Guest purchase of ${product.name}`,
    metadata: {
      guestEmail: customerInfo.email,
      guestName: customerInfo.name,
      guestPhone: customerInfo.phone,
      shippingAddress
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    order,
    payment: payment_record,
    message: 'Guest checkout initiated successfully'
  });
});

// GET /products - Get all products
app.get('/products', (req, res) => {
  res.json({
    products: mockProducts,
    pagination: {
      page: 1,
      limit: 10,
      total: mockProducts.length,
      totalPages: 1
    }
  });
});

// GET /products/:id - Get product by ID
app.get('/products/:id', (req, res) => {
  const product = mockProducts.find(p => p.id === req.params.id);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
});

// GET /categories - Get all categories
app.get('/categories', (req, res) => {
  const categories = [
    { id: '1', name: 'Building Toys', description: 'LEGO and building blocks' },
    { id: '2', name: 'Dolls', description: 'Barbie and dolls' },
    { id: '3', name: 'Action Figures', description: 'Superheroes and action figures' }
  ];
  
  res.json(categories);
});

// ===== DELIVERY ENDPOINTS =====

// GET /deliveries - Get all deliveries with optional filters
app.get('/deliveries', (req, res) => {
  const { userId, status } = req.query;
  let filteredDeliveries = [...mockDeliveries];
  
  if (userId) {
    filteredDeliveries = filteredDeliveries.filter(d => d.userId === userId);
  }
  
  if (status) {
    filteredDeliveries = filteredDeliveries.filter(d => d.status === status);
  }
  
  res.json(filteredDeliveries);
});

// GET /deliveries/:id - Get delivery by ID
app.get('/deliveries/:id', (req, res) => {
  const delivery = mockDeliveries.find(d => d.id === req.params.id);
  
  if (!delivery) {
    return res.status(404).json({ error: 'Delivery not found' });
  }
  
  res.json(delivery);
});

// GET /deliveries/order/:orderId - Get delivery by order ID
app.get('/deliveries/order/:orderId', (req, res) => {
  const delivery = mockDeliveries.find(d => d.orderId === req.params.orderId);
  
  if (!delivery) {
    return res.status(404).json({ error: 'Delivery not found for this order' });
  }
  
  res.json(delivery);
});

// POST /deliveries - Create new delivery
app.post('/deliveries', (req, res) => {
  const {
    orderId,
    carrier,
    trackingNumber,
    shippingAddress,
    recipientName,
    estimatedDeliveryDate,
    notes
  } = req.body;
  
  if (!orderId || !carrier || !shippingAddress || !recipientName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const newDelivery = {
    id: uuidv4(),
    orderId,
    userId: 'user-1', // Mock user
    trackingNumber: trackingNumber || generateTrackingNumber(),
    carrier,
    status: 'PENDING',
    shippingAddress,
    recipientName,
    estimatedDeliveryDate,
    notes,
    location: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  mockDeliveries.push(newDelivery);
  res.status(201).json(newDelivery);
});

// PUT /deliveries/:id - Update delivery
app.put('/deliveries/:id', (req, res) => {
  const deliveryIndex = mockDeliveries.findIndex(d => d.id === req.params.id);
  
  if (deliveryIndex === -1) {
    return res.status(404).json({ error: 'Delivery not found' });
  }
  
  const updatedDelivery = {
    ...mockDeliveries[deliveryIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  mockDeliveries[deliveryIndex] = updatedDelivery;
  res.json(updatedDelivery);
});

// PUT /deliveries/:id/status - Update delivery status
app.put('/deliveries/:id/status', (req, res) => {
  const deliveryIndex = mockDeliveries.findIndex(d => d.id === req.params.id);
  
  if (deliveryIndex === -1) {
    return res.status(404).json({ error: 'Delivery not found' });
  }
  
  const { status, notes, location, actualDeliveryDate } = req.body;
  
  const updatedDelivery = {
    ...mockDeliveries[deliveryIndex],
    status,
    notes,
    location,
    updatedAt: new Date().toISOString()
  };
  
  if (status === 'DELIVERED' && actualDeliveryDate) {
    updatedDelivery.actualDeliveryDate = actualDeliveryDate;
  }
  
  mockDeliveries[deliveryIndex] = updatedDelivery;
  res.json(updatedDelivery);
});

// GET /deliveries/tracking/:trackingNumber - Track package
app.get('/deliveries/tracking/:trackingNumber', (req, res) => {
  const delivery = mockDeliveries.find(d => d.trackingNumber === req.params.trackingNumber);
  
  if (!delivery) {
    return res.status(404).json({ error: 'Package not found' });
  }
  
  // Generate tracking info with updates
  const trackingInfo = {
    trackingNumber: delivery.trackingNumber,
    status: delivery.status,
    carrier: delivery.carrier,
    estimatedDeliveryDate: delivery.estimatedDeliveryDate,
    actualDeliveryDate: delivery.actualDeliveryDate,
    location: delivery.location,
    recipientName: delivery.recipientName,
    shippingAddress: delivery.shippingAddress,
    order: {
      id: delivery.orderId,
      total: 150.00, // Mock total
      items: 2 // Mock items count
    },
    updates: [
      {
        status: 'PENDING',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        location: null,
        notes: 'Commande confirmée'
      },
      {
        status: 'PROCESSING',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Entrepôt principal',
        notes: 'Commande en préparation'
      },
      {
        status: 'SHIPPED',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Centre de tri',
        notes: 'Colis expédié'
      },
      {
        status: delivery.status,
        timestamp: delivery.updatedAt,
        location: delivery.location,
        notes: delivery.notes
      }
    ]
  };
  
  res.json(trackingInfo);
});

// Helper function to generate tracking number
function generateTrackingNumber() {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `LK${timestamp}${random}`;
}

app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('CART ENDPOINTS:');
  console.log('GET  /cart/guest');
  console.log('POST /cart/guest/items');
  console.log('PUT  /cart/guest/items/:itemId');
  console.log('DELETE /cart/guest/items/:itemId');
  console.log('POST /cart/guest/convert-to-user');
  console.log('POST /cart/guest/checkout');
  console.log('');
  console.log('PRODUCT ENDPOINTS:');
  console.log('GET  /products');
  console.log('GET  /products/:id');
  console.log('GET  /categories');
  console.log('');
  console.log('DELIVERY ENDPOINTS:');
  console.log('GET    /deliveries');
  console.log('GET    /deliveries/:id');
  console.log('GET    /deliveries/order/:orderId');
  console.log('POST   /deliveries');
  console.log('PUT    /deliveries/:id');
  console.log('PUT    /deliveries/:id/status');
  console.log('GET    /deliveries/tracking/:trackingNumber');
});