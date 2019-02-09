import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import pokemonApp from './reducers/reducer';

const cfgStore = () => {
  const middlewares = [thunk];

  return createStore(
    pokemonApp,
    applyMiddleware(...middlewares),
  )
};

export default cfgStore;