'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    if (wishlist.length > 0) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  // Add to cart
  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      // Update quantity if item already exists
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
      toast.success('Cart updated!');
    } else {
      // Add new item
      setCart(prevCart => [...prevCart, { ...product, quantity }]);
      toast.success('Added to cart!');
    }
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    toast.success('Removed from cart!');
  };

  // Update cart item quantity
  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
    toast.success('Cart cleared!');
  };

  // Add to wishlist
  const addToWishlist = (product) => {
    const exists = wishlist.find(item => item.id === product.id);
    
    if (exists) {
      toast.error('Already in wishlist!');
      return;
    }
    
    setWishlist(prevWishlist => [...prevWishlist, product]);
    toast.success('Added to wishlist! ❤️');
  };

  // Remove from wishlist
  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
    toast.success('Removed from wishlist!');
  };

  // Check if item is in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Get cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get cart count
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getCartTotal,
    getCartCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
