import { all } from 'redux-saga/effects';
import productSaga from './products/sagas';
import cartSaga from './cart/sagas';

export default function* rootSaga() {
  yield all([
    productSaga(), // Ürünlerle ilgili saga'lar
    cartSaga(),     // Sepetle ilgili saga'lar
    // Diğer saga'lar buraya eklenebilir
  ]);
}