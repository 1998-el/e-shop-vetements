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
  updatingItems: Set<string>;
  addingItems: boolean;
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
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());
  const [addingItems, setAddingItems] = useState(false);

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

    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!sessionId) {
      throw new Error('Session ID not initialized');
    }

    setAddingItems(true);
    setError(null);

    try {
      const cartItemDto: GuestCartItemDto = {
        productId,
        quantity
      };

      // Send to server in background
      await cartApi.addToGuestCart(sessionId, cartItemDto);
      
      // Refresh cart to get real data only after successful add
      await loadCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item to cart');

      throw err;
    } finally {
      setAddingItems(false);
    }
  };

  const updateCartItem = async (itemId: string, quantity: number) => {
    if (!sessionId || !cart) {
      throw new Error('Session ID or cart not initialized');
    }

    // Store the target state for optimistic update
    const targetCart = {
      ...cart,
      cartItems: quantity <= 0 
        ? cart.cartItems.filter(item => item.id !== itemId)
        : cart.cartItems.map(item => 
            item.id === itemId 
              ? { ...item, quantity }
              : item
          ),
      totalItems: quantity <= 0 
        ? cart.cartItems.filter(item => item.id !== itemId).reduce((total, item) => total + item.quantity, 0)
        : cart.cartItems.map(item => 
            item.id === itemId 
              ? { ...item, quantity }
              : item
          ).reduce((total, item) => total + item.quantity, 0)
    };

    // Immediately update UI optimistically
    setCart(targetCart);
    setUpdatingItems(prev => new Set([...prev, itemId]));
    setError(null);

    try {
      // Send to server in background
      await cartApi.updateGuestCartItem(sessionId, itemId, quantity);
      
      // If successful, just remove from updating items - cart already has correct state
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update cart item');

      
      // On error, restore original cart state
      setCart(cart);
      throw err;
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set([...prev]);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (!sessionId || !cart) {
      throw new Error('Session ID or cart not initialized');
    }

    // Store current cart for potential rollback
    const currentCart = cart;

    // Optimistically remove item from UI
    const targetCart = {
      ...cart,
      cartItems: cart.cartItems.filter(item => item.id !== itemId),
      totalItems: cart.cartItems.filter(item => item.id !== itemId).reduce((total, item) => total + item.quantity, 0)
    };

    // Immediately update UI optimistically
    setCart(targetCart);
    setUpdatingItems(prev => new Set([...prev, itemId]));
    setError(null);

    try {
      // Send to server in background
      await cartApi.removeFromGuestCart(sessionId, itemId);
      
      // If successful, just remove from updating items - cart already has correct state
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove cart item');

      
      // On error, restore original cart state
      setCart(currentCart);
      throw err;
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set([...prev]);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const newSessionId = cartApi.generateSessionId();
      localStorage.setItem('guestSessionId', newSessionId);
      setSessionId(newSessionId);
      setCart(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear cart');

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
      
      localStorage.removeItem('guestSessionId');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert cart');

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
      
      await clearCart();
      
      return order;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order from cart');

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
      updatingItems,
      addingItems,
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