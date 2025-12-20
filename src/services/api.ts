import axios from 'axios';
import type {
  Product,
  ProductFilterDto,
  PaginatedResponse,
  Category,
  Cart,
  CartItem,
  GuestCartItemDto,
  GuestCheckoutDto,
  GuestCheckoutResponse,
  ConvertAnonymousCartDto
} from '../types';

// Configuration de l'instance axios
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Service API pour les produits
export const productsApi = {
  // Récupérer tous les produits avec filtres
  getAll: async (filters: ProductFilterDto = {}): Promise<PaginatedResponse<Product>> => {
    try {
      const params = new URLSearchParams();
      
      // Ajouter les filtres à la query string
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });

      const response = await api.get(`/api/products?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
      throw error;
    }
  },

  // Récupérer un produit par ID
  getById: async (id: string): Promise<Product> => {
    try {
      const response = await api.get(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du produit ${id}:`, error);
      throw error;
    }
  },

  // Créer un nouveau produit (admin uniquement)
  create: async (productData: any): Promise<Product> => {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du produit:', error);
      throw error;
    }
  },

  // Mettre à jour un produit (admin uniquement)
  update: async (id: string, productData: any): Promise<Product> => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du produit ${id}:`, error);
      throw error;
    }
  },

  // Supprimer un produit (admin uniquement)
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      console.error(`Erreur lors de la suppression du produit ${id}:`, error);
      throw error;
    }
  },
};

// Service API pour les catégories
export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    try {
      const response = await api.get('/api/categories');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      throw error;
    }
  },

  getById: async (id: string): Promise<Category> => {
    try {
      const response = await api.get(`/api/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la catégorie ${id}:`, error);
      throw error;
    }
  },
};

// Service API pour le panier (guest cart)
export const cartApi = {
  // Helper function to generate session ID
  generateSessionId: (): string => {
    return `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },

  // Get or create session ID
  getSessionId: (): string => {
    let sessionId = localStorage.getItem('guestSessionId');
    if (!sessionId) {
      sessionId = cartApi.generateSessionId();
      localStorage.setItem('guestSessionId', sessionId);
    }
    return sessionId;
  },

  // Récupérer le panier guest
  getGuestCart: async (sessionId?: string): Promise<Cart> => {
    try {
      const actualSessionId = sessionId || cartApi.getSessionId();
      const response = await api.get('/cart/guest', {
        headers: {
          'X-Session-Id': actualSessionId,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du panier:', error);
      throw error;
    }
  },

  // Ajouter un article au panier guest
  addToGuestCart: async (sessionId: string, guestCartItemDto: GuestCartItemDto): Promise<CartItem> => {
    try {
      const response = await api.post('/cart/guest/items', guestCartItemDto, {
        headers: {
          'X-Session-Id': sessionId,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
      throw error;
    }
  },

  // Convertir le panier anonyme en panier utilisateur
  convertAnonymousCartToUser: async (
    sessionId: string,
    deliveryInfo: ConvertAnonymousCartDto
  ): Promise<Cart> => {
    try {
      const response = await api.post('/cart/guest/convert-to-user', deliveryInfo, {
        headers: {
          'X-Session-Id': sessionId,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la conversion du panier:', error);
      throw error;
    }
  },

  // Checkout guest
  guestCheckout: async (guestCheckoutDto: GuestCheckoutDto): Promise<GuestCheckoutResponse> => {
    try {
      const response = await api.post('/cart/guest/checkout', guestCheckoutDto);
      return response.data;
    } catch (error) {
      console.error('Erreur lors du checkout guest:', error);
      throw error;
    }
  },
};

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Rediriger vers la page de connexion si non authentifié
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;