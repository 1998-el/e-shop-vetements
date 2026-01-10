import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data - same as mock-server.js
const mockProducts = [
  {
    id: '1',
    name: 'Blazer Enfant Noir',
    description: 'Blazer élégant pour enfants',
    price: 49.99,
    category: 'Vêtements',
    categoryName: 'Vêtements',
    brand: 'Kids Fashion',
    image: '/images/products/blazer.jpg',
    images: ['/images/products/blazer.jpg'],
    inStock: true,
    stock: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    age: '8-12 ans',
    sizes: ['8 ans', '10 ans', '12 ans'],
    colors: ['Noir', 'Bleu marine']
  },
  {
    id: '2',
    name: 'Robe Fille Rose',
    description: 'Robe mignonne pour filles',
    price: 34.99,
    category: 'Vêtements',
    categoryName: 'Vêtements',
    brand: 'Sweet Dreams',
    image: '/images/products/dress.jpg',
    images: ['/images/products/dress.jpg'],
    inStock: true,
    stock: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    age: '4-8 ans',
    sizes: ['4 ans', '6 ans', '8 ans'],
    colors: ['Rose', 'Blanc']
  },
  {
    id: '3',
    name: 'Basket Blanche',
    description: 'Basket confortable pour enfants',
    price: 59.99,
    category: 'Chaussures',
    categoryName: 'Chaussures',
    brand: 'SportKids',
    image: '/images/products/sneakers.jpg',
    images: ['/images/products/sneakers.jpg'],
    inStock: true,
    stock: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    age: '6-14 ans',
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Blanc', 'Noir']
  },
  {
    id: '4',
    name: 'Lunettes de Soleil',
    description: 'Lunettes protectrices UV pour enfants',
    price: 19.99,
    category: 'Accessoires',
    categoryName: 'Accessoires',
    brand: 'SunCare',
    image: '/images/products/glasses.jpg',
    images: ['/images/products/glasses.jpg'],
    inStock: true,
    stock: 25,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    age: '3-12 ans',
    sizes: ['S', 'M', 'L'],
    colors: ['Rouge', 'Bleu', 'Rose']
  },
  {
    id: '5',
    name: 'Montre Enfant',
    description: 'Montre digitale resistente à l\'eau',
    price: 39.99,
    category: 'Accessoires',
    categoryName: 'Accessoires',
    brand: 'TimeKids',
    image: '/images/products/montre.jpg',
    images: ['/images/products/montre.jpg'],
    inStock: true,
    stock: 18,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    age: '6-16 ans',
    sizes: ['Standard'],
    colors: ['Bleu', 'Rose', 'Noir']
  },
  {
    id: '6',
    name: 'Sac à Dos',
    description: 'Sac à dos scolaire pour enfants',
    price: 29.99,
    category: 'Accessoires',
    categoryName: 'Accessoires',
    brand: 'SchoolBag',
    image: '/images/products/bag.jpg',
    images: ['/images/products/bag.jpg'],
    inStock: true,
    stock: 20,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    age: '5-12 ans',
    sizes: ['Petit', 'Moyen', 'Grand'],
    colors: ['Bleu', 'Rouge', 'Vert']
  }
];

const mockCategories = [
  {
    id: '1',
    name: 'Vêtements',
    description: 'Tous les vêtements pour enfants'
  },
  {
    id: '2',
    name: 'Chaussures',
    description: 'Chaussures pour enfants'
  },
  {
    id: '3',
    name: 'Accessoires',
    description: 'Accessoires et compléments'
  }
];

// API Routes
app.get('/api/products', (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      categoryName,
      minPrice,
      maxPrice,
      search,
      inStock
    } = req.query;

    let filteredProducts = [...mockProducts];

    // Apply filters
    if (categoryName) {
      filteredProducts = filteredProducts.filter(product => 
        product.categoryName === categoryName
      );
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= parseFloat(minPrice)
      );
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.price <= parseFloat(maxPrice)
      );
    }

    if (search) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (inStock !== undefined) {
      filteredProducts = filteredProducts.filter(product =>
        inStock === 'true' ? product.inStock : !product.inStock
      );
    }

    // Sort products
    filteredProducts.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'price') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      } else if (sortBy === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortOrder === 'desc') {
        return bValue > aValue ? 1 : -1;
      } else {
        return aValue > bValue ? 1 : -1;
      }
    });

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;

    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    res.json({
      products: paginatedProducts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / limitNum)
      }
    });
  } catch (error) {

    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/products/:id', (req, res) => {
  try {
    const { id } = req.params;
    const product = mockProducts.find(p => p.id === id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {

    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/categories', (req, res) => {
  try {
    res.json(mockCategories);
  } catch (error) {

    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/categories/:id', (req, res) => {
  try {
    const { id } = req.params;
    const category = mockCategories.find(c => c.id === id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(category);
  } catch (error) {

    res.status(500).json({ message: 'Internal server error' });
  }
});

// Static files
app.use(express.static(path.join(__dirname, 'dist')));

// SPA Routing - Must be after API routes but before 404 handler
app.get('*', (req, res) => {
  // Don't redirect API calls
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ message: 'API endpoint not found' });
  }
  
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Application not built. Please run npm run build first.');
  }
});

// Start server
app.listen(PORT, () => {

});
