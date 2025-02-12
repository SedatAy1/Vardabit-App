import { call, put, takeLatest, all } from 'redux-saga/effects';
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT_BY_ID,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
} from './actions'; // Doğru import'lar
import * as api from '../../services/api'; // API fonksiyonlarını import et

// Ürünleri çekme saga'sı
function* fetchProductsSaga(action) {
  try {
    const { page, searchQuery, filters } = action.payload;
    const response = yield call(api.getProducts, page, searchQuery, filters); // Doğru API çağrısı
    yield put(fetchProductsSuccess({ products: response.products, totalCount: response.totalCount })); // Doğru action dispatch
  } catch (error) {
    yield put(fetchProductsFailure(error.message)); // Hata durumunda doğru action dispatch
  }
}

// Tek bir ürünü ID'sine göre çekme saga'sı
function* fetchProductByIdSaga(action) {
  try {
    const product = yield call(api.getProductById, action.payload); // Doğru API çağrısı
    yield put(fetchProductByIdSuccess(product)); // Doğru action dispatch
  } catch (error) {
    yield put(fetchProductByIdFailure(error.message)); // Hata durumunda doğru action dispatch
  }
}

// FETCH_PRODUCTS action'ını dinleyen watcher saga
function* watchFetchProducts() {
  yield takeLatest(FETCH_PRODUCTS, fetchProductsSaga);
}

// FETCH_PRODUCT_BY_ID action'ını dinleyen watcher saga
function* watchFetchProductById() {
  yield takeLatest(FETCH_PRODUCT_BY_ID, fetchProductByIdSaga);
}

// Tüm ürünlerle ilgili saga'ları birleştiren root saga
export default function* productSaga() {
  yield all([
    watchFetchProducts(),
    watchFetchProductById(),
  ]);
}