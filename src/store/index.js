import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';
import rootSaga from './sagas';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'auth',
    'form',
    'client',
    'user',
    'newRequest',
    'attributes',
    'filters',
  ],
  blacklist: ['form[RegisterForm]'],
};

/* eslint-disable no-underscore-dangle */
// const composeEnhancers =
//   typeof window === 'object' &&
//   process.env.NODE_ENV !== 'production' &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//         name: 'Agent24',
//         actionsBlacklist: ['REDUX_STORAGE_SAVE'],
//       })
//     : compose;
/* eslint-enable */

const persistedReducer = persistReducer(
  persistConfig,
  connectRouter(history)(rootReducer)
);
const enhancer = compose(
  applyMiddleware(thunkMiddleware, routerMiddleware(history), sagaMiddleware)
);

export const store = createStore(persistedReducer, enhancer);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
