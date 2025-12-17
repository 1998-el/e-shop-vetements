# API Integration Documentation

## Overview

This document explains how the frontend has been integrated with the backend API to replace the mock data system with real data from the NestJS backend.

## Changes Made

### 1. New Files Created

- **`src/services/api.ts`**: API service layer with axios configuration and endpoints
- **`src/types/index.ts`**: Type definitions that map API responses to UI expectations
- **`src/hooks/useProducts.ts`**: Custom React hooks for managing product data and state
- **`.env.local`**: Environment configuration for API URL

### 2. Updated Files

- **`src/pages/Products.tsx`**: Now uses API instead of mock data with filtering and pagination
- **`src/pages/ProductDetail.tsx`**: Fetches individual product data from API
- **`src/components/home/ProductCard.tsx`**: Updated to work with new UIProduct type
- **`src/components/home/ProductGrid.tsx`**: Uses API to display featured products on homepage

### 3. Key Features Implemented

#### API Service Layer (`src/services/api.ts`)
- Axios configuration with base URL from environment variables
- Interceptors for authentication tokens and error handling
- Type-safe API methods for products and categories
- Support for filtering, pagination, and sorting

#### Custom Hooks (`src/hooks/useProducts.ts`)
- `useProducts`: Manages product list with filtering and pagination
- `useProduct`: Fetches single product by ID
- `useProductFilters`: Extracts available filter options from products
- Automatic loading states and error handling
- Debounced filter updates to prevent excessive API calls

#### Type System (`src/types/index.ts`)
- `UIProduct`: Maps backend Product to frontend expectations
- Type mapping functions to convert API responses
- Backward compatibility with existing components

## Usage

### Environment Setup

1. Copy `.env.local` and update the API URL:
```bash
cp .env.local .env.local.backup
# Edit .env.local and set your backend URL
VITE_API_URL=http://localhost:3000
```

### Using the API Hooks

#### Basic Product Listing
```typescript
import { useProducts } from '../hooks/useProducts';

function MyComponent() {
  const { 
    products, 
    loading, 
    error, 
    pagination,
    updateFilters,
    refresh 
  } = useProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

#### Product Detail
```typescript
import { useProduct } from '../hooks/useProducts';

function ProductDetail({ productId }: { productId: string }) {
  const { product, loading, error } = useProduct(productId);

  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: €{product.price}</p>
    </div>
  );
}
```

#### Filtering
```typescript
const { updateFilters } = useProducts();

// Filter by category
updateFilters({ categoryName: 'Electronics' });

// Filter by price range
updateFilters({ minPrice: 10, maxPrice: 100 });

// Search products
updateFilters({ search: 'laptop' });

// Combined filters
updateFilters({ 
  categoryName: 'Electronics',
  minPrice: 50,
  maxPrice: 500,
  brand: 'Apple'
});
```

## API Endpoints Used

### Products
- `GET /products` - List products with filtering and pagination
- `GET /products/:id` - Get single product details

### Categories
- `GET /categories` - List all categories

## Filter Parameters

The API supports the following filter parameters:

- `search`: Text search in product names and descriptions
- `categoryId`: Filter by category ID
- `categoryName`: Filter by category name
- `minPrice`: Minimum price filter
- `maxPrice`: Maximum price filter
- `inStock`: Filter by stock availability
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `sortBy`: Sort field (default: 'createdAt')
- `sortOrder`: Sort direction ('asc' or 'desc', default: 'desc')

## Error Handling

The integration includes comprehensive error handling:

- Network errors are caught and displayed to users
- Authentication errors redirect to login page
- Loading states are shown during API calls
- Retry mechanisms are available for failed requests

## Performance Optimizations

- Debounced filter updates (300ms delay)
- Pagination to limit data transfer
- Image lazy loading with fallback images
- Memoized component renders to prevent unnecessary re-renders

## Backend Requirements

Make sure your backend implements the following endpoints:

1. **GET /products** with query parameters for filtering
2. **GET /products/:id** for single product details
3. **GET /categories** for category listing
4. Proper CORS configuration for frontend access
5. JSON response format matching the expected structure

## Testing

To test the integration:

1. Start your backend server on the configured port
2. Start the frontend development server
3. Navigate to the products page
4. Verify that products load from the API
5. Test filtering and pagination
6. Check product detail pages

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your backend allows requests from your frontend domain
2. **API URL**: Verify the `VITE_API_URL` in your `.env.local` file
3. **Network Issues**: Check that your backend is running and accessible
4. **Type Errors**: Ensure your backend returns data in the expected format

### Debug Mode

Add `?debug=true` to URLs to see additional console logging of API requests and responses.

## Future Enhancements

- Add caching for frequently accessed data
- Implement optimistic updates for better UX
- Add WebSocket support for real-time inventory updates
- Enhance error recovery and retry mechanisms