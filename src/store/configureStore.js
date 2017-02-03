import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from '../reducers';
import * as Actions from '../actions';

export default function configureStore(initialState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middleware = [reduxThunk];

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  store.dispatch(Actions.verifyAuth());

  return store;
}
