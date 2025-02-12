import { call, put, takeLatest, all } from 'redux-saga/effects';
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT_BY_ID,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
} from './actions';
import * as api from '../../services/api'; // API istekleri burada
import productSaga, { fetchProductsSaga, fetchProductByIdSaga, watchFetchProducts, watchFetchProductById } from './sagas';


// Mock API calls
jest.mock('../../services/api');

describe('Product Sagas', () => {
  describe('fetchProductsSaga', () => {
    it('should successfully fetch products and dispatch success action', () => {
      const mockProducts = [{ id: '1', name: 'Product 1' }, { id: '2', name: 'Product 2' }];
      const mockTotalCount = 10;
      const mockResponse = { products: mockProducts, totalCount: mockTotalCount };

      const generator = fetchProductsSaga({ type: FETCH_PRODUCTS, payload: {} });

      // 1. call api.getProducts
      expect(generator.next().value).toEqual(call(api.getProducts, 1, '', {}));

      // 2. put fetchProductsSuccess
      expect(generator.next(mockResponse).value).toEqual(put(fetchProductsSuccess(mockResponse)));

      // 3. Saga should be done
      expect(generator.next().done).toBe(true);
    });

    it('should handle errors and dispatch failure action', () => {
      const error = new Error('API Error');
      const generator = fetchProductsSaga({ type: FETCH_PRODUCTS, payload: {} });

      // 1. call api.getProducts
      expect(generator.next().value).toEqual(call(api.getProducts, 1, '', {}));

      // 2. Simulate API error
      expect(generator.throw(error).value).toEqual(put(fetchProductsFailure(error.message)));

      // 3. Saga should be done
      expect(generator.next().done).toBe(true);
    });

    it('should fetch products with correct page, search query, and filters', () => {
        const mockPage = 2;
        const mockSearchQuery = 'test';
        const mockFilters = { brands: ['Apple'], sort: 'lowToHigh' };
        const generator = fetchProductsSaga({ type: FETCH_PRODUCTS, payload: { page: mockPage, searchQuery: mockSearchQuery, filters: mockFilters } });

        // Check if api.getProducts is called with correct arguments
        expect(generator.next().value).toEqual(call(api.getProducts, mockPage, mockSearchQuery, mockFilters));

    });
  });

  describe('fetchProductByIdSaga', () => {
    it('should successfully fetch a product by ID and dispatch success action', () => {
      const mockProduct = { id: '1', name: 'Product 1' };
      const generator = fetchProductByIdSaga({ type: FETCH_PRODUCT_BY_ID, payload: '1' });

      // 1. call api.getProductById
      expect(generator.next().value).toEqual(call(api.getProductById, '1'));

      // 2. put fetchProductByIdSuccess
      expect(generator.next(mockProduct).value).toEqual(put(fetchProductByIdSuccess(mockProduct)));

      // 3. Saga should be done
      expect(generator.next().done).toBe(true);
    });

    it('should handle errors when fetching product by ID and dispatch failure action', () => {
      const error = new Error('API Error');
      const generator = fetchProductByIdSaga({ type: FETCH_PRODUCT_BY_ID, payload: '1' });

      // 1. call api.getProductById
       expect(generator.next().value).toEqual(call(api.getProductById, '1'));

      // 2. Simulate API error
      expect(generator.throw(error).value).toEqual(put(fetchProductByIdFailure(error.message)));

      // 3. Saga should be done
      expect(generator.next().done).toBe(true);
    });
      it('should fetch product with correct ID', () => {
        const mockId = '123';
        const generator = fetchProductByIdSaga({ type: FETCH_PRODUCT_BY_ID, payload: mockId });
        expect(generator.next().value).toEqual(call(api.getProductById, mockId));

    });
  });


    describe('watchFetchProducts', () => {
        it('should takeLatest FETCH_PRODUCTS action', () => {
            const generator = watchFetchProducts();
            expect(generator.next().value).toEqual(takeLatest(FETCH_PRODUCTS, fetchProductsSaga));
            expect(generator.next().done).toBe(true);
        });
    });

    describe('watchFetchProductById', () => {
        it('should takeLatest FETCH_PRODUCT_BY_ID action', () => {
            const generator = watchFetchProductById();
            expect(generator.next().value).toEqual(takeLatest(FETCH_PRODUCT_BY_ID, fetchProductByIdSaga));
             expect(generator.next().done).toBe(true);
        });
    });

      describe('productSaga', () => {
        it('should combine watchFetchProducts and watchFetchProductById sagas', () => {
            const generator = productSaga();
            expect(generator.next().value).toEqual(all([watchFetchProducts(), watchFetchProductById()]));
            expect(generator.next().done).toBe(true);
        });
    });
});