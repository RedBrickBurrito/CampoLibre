import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the interface for the state
interface AppState {
    cart: Product[];
}

// Define the interface for the product
interface Product {
  id: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  categoryId: string;
  price: number;
  description?: string;
  expirationDate?: Date;
  quantity?: number;
}

// Define the initial state
const initialState: AppState = {
  cart: []
};

// Create a slice using createSlice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<Product[]>) {
      state.cart = action.payload;
    },
    addToCart(state, action: PayloadAction<Product>) {
      state.cart.push(action.payload);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    clearCart(state) {
      state.cart = [];
    },
    decrementQuantity(state, action: PayloadAction<string>) {
        const itemId = action.payload;
        const item = state.cart.find((item) => item.id === itemId);
  
        if (item && item.quantity && item.quantity > 1) {
          item.quantity--;
        }
    },
    incrementQuantity(state, action: PayloadAction<string>) {
        const itemId = action.payload;
        const item = state.cart.find((item) => item.id === itemId);
  
        if (item && item.quantity && item.quantity > 0) {
          item.quantity++;
        }
    },
  }
});

// Extract the actions and reducer from the slice
export const { setCartItems, addToCart, removeFromCart, clearCart, decrementQuantity, incrementQuantity} = cartSlice.actions;
export type {AppState};
export default configureStore({ reducer: cartSlice.reducer });
