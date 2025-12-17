import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { cartApi } from '../services/api';
import ordersApi from '../services/ordersApi';
import type { Cart, GuestCartItemDto, ConvertAnonymousCartDto } from '../types';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  sessionId: string;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateCartItem: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotal: () => number;
  refreshCart: () => Promise<void>;
  convertAnonymousCartToUser: (deliveryInfo: ConvertAnonymousCartDto) => Promise<void>;
  createOrderFromCart: () => Promise<any>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>('');

  // Initialize session ID on mount
  useEffect(() => {
    const newSessionId = cartApi.getSessionId();
    setSessionId(newSessionId);
  }, []);

  // Load cart when session ID is available
  useEffect(() => {
    if (sessionId) {
      loadCart();
    }
  }, [sessionId]);

  const loadCart = async () => {
    if (!sessionId) return;
    
    try {
      setLoading(true);
      setError(null);
      const cartData = await cartApi.getGuestCart(sessionId);
      setCart(cartData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cart');
      console.error('Error loading cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!sessionId) {
      throw new Error('Session ID not initialized');
    }

    try {
      setLoading(true);
      setError(null);
      
      const cartItemDto: GuestCartItemDto = {
        productId,
        quantity
      };

      await cartApi.addToGuestCart(sessionId, cartItemDto);
      await loadCart(); // Refresh cart after adding
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item to cart');
      console.error('Error adding to cart:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (_itemId: string, _quantity: number) => {
    // For guest cart operations, we need to regenerate cart after update
    // since the backend doesn't expose update/remove methods for guest cart
    try {
      setLoading(true);
      setError(null);
      
      // Refresh cart to get latest state
      await loadCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update cart item');
      console.error('Error updating cart item:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (_itemId: string) => {
    // For guest cart operations, we need to regenerate cart after removal
    try {
      setLoading(true);
      setError(null);
      
      // Refresh cart to get latest state
      await loadCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove cart item');
      console.error('Error removing cart item:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    // For guest cart, we clear by creating a new session
    try {
      setLoading(true);
      setError(null);
      
      // Generate new session ID to clear cart
      const newSessionId = cartApi.generateSessionId();
      localStorage.setItem('guestSessionId', newSessionId);
      setSessionId(newSessionId);
      setCart(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear cart');
      console.error('Error clearing cart:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const convertAnonymousCartToUser = async (deliveryInfo: ConvertAnonymousCartDto) => {
    if (!sessionId) {
      throw new Error('Session ID not initialized');
    }

    try {
      setLoading(true);
      setError(null);
      
      const convertedCart = await cartApi.convertAnonymousCartToUser(sessionId, deliveryInfo);
      setCart(convertedCart);
      
      // Clear guest session after conversion
      localStorage.removeItem('guestSessionId');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert cart');
      console.error('Error converting cart:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refreshCart = async () => {
    await loadCart();
  };

  const createOrderFromCart = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const order = await ordersApi.createOrderFromCart({
        sessionId
      });
      
      // Clear cart after successful order creation
      await clearCart();
      
      return order;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order from cart');
      console.error('Error creating order from cart:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getTotal = () => {
    if (!cart || !cart.cartItems) return 0;
    return cart.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      error,
      sessionId,
      addToCart,
      updateCartItem,
      removeFromCart,
      clearCart,
      getTotal,
      refreshCart,
      convertAnonymousCartToUser,
      createOrderFromCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};