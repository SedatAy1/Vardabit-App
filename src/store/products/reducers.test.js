import productReducer from './reducers'; // Reducer'ın yolu doğru olmalı
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCT_BY_ID,
  FETCH_PRODUCT_BY_ID_SUCCESS,
  FETCH_PRODUCT_BY_ID_FAILURE,
} from './actions';

const initialState = {
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
    totalCount: 0
};

describe('productReducer', () => {
    it('should return the initial state', () => {
        expect(productReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle FETCH_PRODUCTS', () => {
        const action = { type: FETCH_PRODUCTS };
        const expectedState = { ...initialState, loading: true, error: null };
         expect(productReducer(initialState, action)).toEqual(expectedState)

    });

    it('should handle FETCH_PRODUCTS_SUCCESS', () => {
        const products = [{ id: '1', name: 'Product 1' }];
        const totalCount = 10;
        const action = { type: FETCH_PRODUCTS_SUCCESS, payload: { products, totalCount } };
    const expectedState = {
      ...initialState,
      loading: false,
      products: products,
      totalCount: totalCount,
    };
    expect(productReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle FETCH_PRODUCTS_FAILURE', () => {
        const error = 'Error message';
        const action = { type: FETCH_PRODUCTS_FAILURE, payload: error };
        const expectedState = { ...initialState, loading: false, error };
         expect(productReducer(initialState, action)).toEqual(expectedState);
    });

       it('should handle FETCH_PRODUCT_BY_ID', () => {
        const action = { type: FETCH_PRODUCT_BY_ID, payload: '123' };
        const expectedState = { ...initialState, loading: true, error: null, currentProduct: null };
        expect(productReducer(initialState, action)).toEqual(expectedState);
    });

     it('should handle FETCH_PRODUCT_BY_ID_SUCCESS', () => {
    const product = { id: '1', name: 'Product 1' };
    const action = { type: FETCH_PRODUCT_BY_ID_SUCCESS, payload: product };
    const expectedState = { ...initialState, loading: false, currentProduct: product };
    expect(productReducer(initialState, action)).toEqual(expectedState);
  });

      it('should handle FETCH_PRODUCT_BY_ID_FAILURE', () => {
        const error = 'Error message';
        const action = { type: FETCH_PRODUCT_BY_ID_FAILURE, payload: error };
        const expectedState = { ...initialState, loading: false, error };
        expect(productReducer(initialState, action)).toEqual(expectedState)
    });

       it('should handle unknown action type', () => {
        const action = { type: 'UNKNOWN_ACTION' };
        expect(productReducer(initialState, action)).toEqual(initialState); // Değişiklik olmamalı
    });
});