import {
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  CLEAR_CART,
  LOAD_CART
} from './actions'; // Sepete özel action'lar buradan

import { ADD_TO_CART } from '../products/actions'; // ADD_TO_CART buradan import edilecek!

// ... (reducer'ın geri kalanı) ...

const initialState = {
  items: [], // Sepetteki ürünler
};
const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem('cart', JSON.stringify(cartItems));
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
      case LOAD_CART:
          return { ...state, items: action.payload };
      case ADD_TO_CART: // products/actions.js'den gelen
          const existingItem = state.items.find(item => item.id === action.payload.id);
          if (existingItem) {
              const updatedItems = state.items.map(item =>
                  item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
              );
               saveCartToLocalStorage(updatedItems); // Güncellenmiş sepeti kaydet
              return { ...state, items: updatedItems };
          } else {
              const newItems = [...state.items, { ...action.payload, quantity: 1 }];
              saveCartToLocalStorage(newItems);
              return { ...state, items:newItems };
          }
      case REMOVE_FROM_CART:
          const updatedItems = state.items.filter(item => item.id !== action.payload);
          saveCartToLocalStorage(updatedItems);
          return { ...state, items: updatedItems };

      case INCREASE_QUANTITY:
          const increasedItems = state.items.map(item =>
              item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
          );
          saveCartToLocalStorage(increasedItems);
          return { ...state, items: increasedItems };

      case DECREASE_QUANTITY:
          const decreasedItems = state.items.map(item =>
              item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
          ).filter(item => item.quantity > 0); // Miktarı 0'ın altına düşenleri filtrele
          saveCartToLocalStorage(decreasedItems);
           return { ...state, items: decreasedItems };

      case CLEAR_CART:
           saveCartToLocalStorage([]); // Sepeti temizle ve kaydet
          return { ...state, items: [] };
      default:
          return state;
  }
};
export default cartReducer;