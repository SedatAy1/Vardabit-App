// Action Types
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const FETCH_PRODUCT_BY_ID = 'FETCH_PRODUCT_BY_ID';
export const FETCH_PRODUCT_BY_ID_SUCCESS = 'FETCH_PRODUCT_BY_ID_SUCCESS';
export const FETCH_PRODUCT_BY_ID_FAILURE = 'FETCH_PRODUCT_BY_ID_FAILURE';
export const ADD_TO_CART = 'ADD_TO_CART';  //Ortak action
export const SET_FILTERED_PRODUCTS = 'SET_FILTERED_PRODUCTS'; // Bunu kullanmıyoruz, API üzerinden filtreleme yapıyoruz


// Action Creators
export const fetchProducts = (page = 1, searchQuery = '', filters = {}) => ({
  type: FETCH_PRODUCTS,
  payload: { page, searchQuery, filters },
});

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const fetchProductById = (id) => ({
  type: FETCH_PRODUCT_BY_ID,
  payload: id,
});

export const fetchProductByIdSuccess = (product) => ({
  type: FETCH_PRODUCT_BY_ID_SUCCESS,
  payload: product,
});

export const fetchProductByIdFailure = (error) => ({
  type: FETCH_PRODUCT_BY_ID_FAILURE,
  payload: error,
});

 export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product,
});