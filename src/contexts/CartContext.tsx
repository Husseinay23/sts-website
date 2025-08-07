import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '../types';

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  total: number;
}

type CartAction = 
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number; selectedColor?: string } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' };

const initialState: CartState = {
  items: [],
  isOpen: false,
  total: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity, selectedColor } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === product.id && item.selectedColor === selectedColor
      );

      let newItems;
      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.items, {
          id: `${product.id}-${selectedColor || 'default'}`,
          product,
          quantity,
          selectedColor,
        }];
      }

      const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      return { ...state, items: newItems, total };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      return { ...state, items: newItems, total };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const newItems = quantity > 0 
        ? state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        : state.items.filter(item => item.id !== id);
      
      const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      return { ...state, items: newItems, total };
    }

    case 'CLEAR_CART':
      return { ...state, items: [], total: 0 };

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };

    case 'OPEN_CART':
      return { ...state, isOpen: true };

    case 'CLOSE_CART':
      return { ...state, isOpen: false };

    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addItem: (product: Product, quantity: number, selectedColor?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...initial, items: parsed.items || [], total: parsed.total || 0 };
      } catch {
        return initial;
      }
    }
    return initial;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify({ items: state.items, total: state.total }));
  }, [state.items, state.total]);

  const addItem = (product: Product, quantity: number, selectedColor?: string) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, selectedColor } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};