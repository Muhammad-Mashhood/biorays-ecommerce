import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  totalPrice: 0,
  totalItems: 0,
};

// Create context
const CartContext = createContext(initialState);

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const item = action.payload;
      const existingItem = state.cartItems.find(x => x._id === item._id);
      
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x => 
            x._id === existingItem._id ? { ...x, quantity: x.quantity + 1 } : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...item, quantity: 1 }],
        };
      }
      
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x._id !== action.payload),
      };
      
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(x => 
          x._id === action.payload.id 
            ? { ...x, quantity: action.payload.quantity } 
            : x
        ),
      };
      
    case 'CALCULATE_TOTALS':
      const { totalItems, totalPrice } = state.cartItems.reduce(
        (acc, item) => {
          const itemPrice = item.onSale ? item.salePrice : item.price;
          acc.totalItems += item.quantity;
          acc.totalPrice += itemPrice * item.quantity;
          return acc;
        },
        { totalItems: 0, totalPrice: 0 }
      );
      
      return {
        ...state,
        totalItems,
        totalPrice,
      };
      
    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
        totalItems: 0,
        totalPrice: 0,
      };
      
    default:
      return state;
  }
};

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Calculate totals whenever cart items change
  useEffect(() => {
    dispatch({ type: 'CALCULATE_TOTALS' });
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  }, [state.cartItems]);
  
  // Add to cart
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };
  
  // Remove from cart
  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };
  
  // Update quantity
  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };
  
  // Clear cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);