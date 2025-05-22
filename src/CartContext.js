import React, { createContext, useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const updateCartCount = async () => {
    const user = auth().currentUser;

    if (user) {
      const snapshot = await firestore()
        .collection('Orders')
        .where('userId', '==', user.uid)
        .get();
      const cartItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCart(cartItems);
    } else {
      const stored = await AsyncStorage.getItem('localCart');
      const parsed = stored ? JSON.parse(stored) : [];
      setCart(parsed);
    }
  };

  // Optional: Automatically update cart on mount
  useEffect(() => {
    updateCartCount();
  }, []);

  const cartCount = cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartCount, cartCount }}>
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
