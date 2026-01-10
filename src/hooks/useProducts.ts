import { useState, useEffect, useCallback } from 'react';
import { productsApi, categoriesApi } from '../services/api';
import type { ProductFilterDto, UIProduct, UICategory } from '../types';
import { mapApiProductToUI } from '../types';

interface UseProductsState {
  products: UIProduct[];
  categories: UICategory[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
}

interface UseProductsFilters extends ProductFilterDto {
  // Additional UI-specific filters
  brand?: string;
  age?: string;
}

export const useProducts = (initialFilters: UseProductsFilters = {}) => {
  const [state, setState] = useState<UseProductsState>({
    products: [],
    categories: [],
    loading: false,
    error: null,
    pagination: null,
  });

  const [filters, setFilters] = useState<UseProductsFilters>({
    page: 1,
    limit: 20,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    ...initialFilters,
  });

  // Convert UI filters to API filters
  const convertFilters = useCallback((uiFilters: UseProductsFilters) => {
    const apiFilters: ProductFilterDto = {
      ...uiFilters,
    };

    // Handle brand filtering (if backend supports it)
    if (uiFilters.brand) {
      // You might need to add brand support to the backend
      // For now, we'll use search as a fallback
      apiFilters.search = uiFilters.brand;
    }

    // Handle age filtering (custom field)
    if (uiFilters.age) {
      // You might need to add age support to the backend
      // For now, we'll use search as a fallback
      apiFilters.search = uiFilters.search 
        ? `${uiFilters.search} ${uiFilters.age}`
        : uiFilters.age;
    }

    return apiFilters;
  }, []);

  // Fetch products
  const fetchProducts = useCallback(async (newFilters?: UseProductsFilters) => {
    const currentFilters = newFilters || filters;
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const apiFilters = convertFilters(currentFilters);
      

      
      const response = await productsApi.getAll(apiFilters);
      

      
      const mappedProducts = response.products.map((product, index) => {
        // Log détaillé pour les images de chaque produit
        const imageInfo = {
          productId: product.id,
          productName: product.name,
          imagesCount: product.images?.length || 0,
          primaryImage: product.images?.[0] || null,
          hasImages: !!(product.images && product.images.length > 0)
        };
        

        
        return mapApiProductToUI(product);
      });
      
      // Log de synthèse après traitement
      const imageStats = {
        totalProducts: mappedProducts.length,
        productsWithImages: mappedProducts.filter(p => p.images && p.images.length > 0).length,
        productsWithoutImages: mappedProducts.filter(p => !p.images || p.images.length === 0).length,
        averageImagesPerProduct: mappedProducts.length > 0 
          ? (mappedProducts.filter(p => p.images).reduce((sum, p) => sum + (p.images?.length || 0), 0) / mappedProducts.length).toFixed(2)
          : 0
      };
      

      
      setState(prev => ({
        ...prev,
        products: mappedProducts,
        pagination: response.pagination,
        loading: false,
      }));
      

      
    } catch (error) {

      setState(prev => ({
        ...prev,
        error: 'Impossible de charger les produits. Veuillez réessayer.',
        loading: false,
      }));
    }
  }, [filters, convertFilters]);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const categories = await categoriesApi.getAll();
      setState(prev => ({
        ...prev,
        categories: categories.map(cat => ({
          ...cat,
          image: undefined,
          productCount: undefined,
        })),
      }));
    } catch (error) {

      // Categories are not critical, so we don't set an error state
    }
  }, []);

  // Update filters and refetch
  const updateFilters = useCallback((newFilters: Partial<UseProductsFilters>) => {
    const updatedFilters = { ...filters, ...newFilters, page: 1 }; // Reset to page 1 when filters change
    setFilters(updatedFilters);
    fetchProducts(updatedFilters);
  }, [filters, fetchProducts]);

  // Load more products (pagination)
  const loadMore = useCallback(() => {
    if (state.pagination && state.pagination.page < state.pagination.totalPages) {
      const nextPage = state.pagination.page + 1;
      const newFilters = { ...filters, page: nextPage };
      setFilters(newFilters);
      fetchProducts(newFilters);
    }
  }, [state.pagination, filters, fetchProducts]);

  // Refresh products
  const refresh = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Reset filters
  const resetFilters = useCallback(() => {
    const defaultFilters: UseProductsFilters = {
      page: 1,
      limit: 20,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };
    setFilters(defaultFilters);
    fetchProducts(defaultFilters);
  }, [fetchProducts]);

  // Get product by ID
  const getProductById = useCallback(async (id: string): Promise<UIProduct | null> => {
    try {

      
      const apiProduct = await productsApi.getById(id);
      

      
      const mappedProduct = mapApiProductToUI(apiProduct);
      

      
      return mappedProduct;
    } catch (error) {

      return null;
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []); // Empty dependency array for initial load

  // Refresh when filters change (except for pagination changes)
  useEffect(() => {
    // Only refetch if it's not a pagination change and not the initial load
    if (filters.page === 1 && state.products.length > 0) {
      fetchProducts();
    }
  }, [
    filters.search,
    filters.categoryId,
    filters.categoryName,
    filters.minPrice,
    filters.maxPrice,
    filters.inStock,
    filters.sortBy,
    filters.sortOrder,
    state.products.length // Track if we have products loaded
  ]);

  return {
    // State
    products: state.products,
    categories: state.categories,
    loading: state.loading,
    error: state.error,
    pagination: state.pagination,
    filters,

    // Actions
    updateFilters,
    loadMore,
    refresh,
    resetFilters,
    getProductById,

    // Computed values
    hasMore: state.pagination ? state.pagination.page < state.pagination.totalPages : false,
    isLoadingMore: state.loading && state.products.length > 0,
  };
};

// Hook for single product
export const useProduct = (id: string) => {
  const [product, setProduct] = useState<UIProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);

    try {
      const apiProduct = await productsApi.getById(id);
      setProduct(mapApiProductToUI(apiProduct));
    } catch (error) {

      setError('Produit non trouvé');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { product, loading, error, refetch: fetchProduct };
};

// Helper function to get available filter options
export const useProductFilters = (products: UIProduct[]) => {
  const categories = [...new Set(products.map(p => p.categoryName))].sort();
  const brands = [...new Set(products.map(p => p.brand).filter(Boolean))].sort();
  const ages = [...new Set(products.map(p => p.age).filter(Boolean))].sort();
  
  const priceRange = products.length > 0 ? {
    min: Math.min(...products.map(p => p.price)),
    max: Math.max(...products.map(p => p.price)),
  } : { min: 0, max: 1000 };

  return {
    categories,
    brands,
    ages,
    priceRange,
  };
};