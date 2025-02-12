import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import productReducer from './products/reducers';
import cartReducer from './cart/reducers';
import rootSaga from './rootSaga'; // Tüm saga'ları birleştiren kök saga

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    // Diğer reducer'lar buraya eklenebilir
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;