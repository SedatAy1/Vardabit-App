// Action Types
export const ADD_TO_CART = 'ADD_TO_CART'; // products/actions.js'de tanımlı
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';
export const LOAD_CART = "LOAD_CART";

// Action Creators

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId, // Ürün ID'si
});

export const increaseQuantity = (productId) => ({
  type: INCREASE_QUANTITY,
  payload: productId, // Ürün ID'si
});

export const decreaseQuantity = (productId) => ({
  type: DECREASE_QUANTITY,
  payload: productId, // Ürün ID'si
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const loadCart = (cartItems) => ({
    type: LOAD_CART,
    payload: cartItems,
});