import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import naraStore from './index';

export default function configureStore() {
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(naraStore, () => {
      const nextRootReducer = naraStore;
      store.replaceReducer(nextRootReducer);
    });
  }

  
  const store = createStore(
    naraStore, 
    applyMiddleware(logger, thunk)
  );

  return store;
}