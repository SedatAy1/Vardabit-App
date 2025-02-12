import { takeLatest, put, all } from 'redux-saga/effects';
import { LOAD_CART, loadCart } from './actions';

function* loadCartFromLocalStorage() {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      yield put(loadCart(JSON.parse(savedCart)));
    }
  } catch (error) {
    console.error("Error loading cart from LocalStorage:", error);
    // Burada kullanıcıya bir hata mesajı gösterebilirsiniz (isteğe bağlı)
  }
}

function* watchLoadCart() {
  yield takeLatest(LOAD_CART, loadCartFromLocalStorage);
}
 export default function* cartSaga() {
    yield all([
      watchLoadCart(), // Load cart
    ]);
  }