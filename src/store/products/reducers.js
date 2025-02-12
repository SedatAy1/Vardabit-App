import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCT_BY_ID,
  FETCH_PRODUCT_BY_ID_SUCCESS,
  FETCH_PRODUCT_BY_ID_FAILURE,
} from './actions';

const initialState = {
  products: [],          // Sayfalanmış ve filtrelenmiş ürünler
  currentProduct: null,  // Şu anki ürün (detay sayfası için)
  loading: false,
  error: null,
  totalCount: 0,       // Toplam ürün sayısı (sayfalama için)
};

const productReducer = (state = initialState, action) => {
  console.log("productReducer - action:", action); // Action'ı logla
  if (!action) { // action undefined ise, hatayı engelle
    console.warn("productReducer received undefined action!");
    return state;
  }
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, loading: true, error: null };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products, // API'den gelen ürünler
        totalCount: action.payload.totalCount, // API'den gelen toplam ürün sayısı
      };

    case FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_PRODUCT_BY_ID:
      return { ...state, loading: true, error: null, currentProduct: null };

    case FETCH_PRODUCT_BY_ID_SUCCESS:
      return { ...state, loading: false, currentProduct: action.payload };

    case FETCH_PRODUCT_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default productReducer;