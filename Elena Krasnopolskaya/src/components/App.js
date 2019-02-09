import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Pokedex from './Pokedex';

const App = ({
  store,
}) => (
  <Provider store={store} >
    <BrowserRouter>
      <Pokedex />
    </BrowserRouter>
  </Provider>
);

App.propTypes = {
  store: PropTypes.shape({
    isFetching: PropTypes.bool,
    isCatching: PropTypes.bool,
    pokemons: PropTypes.object,
    counter: PropTypes.number,
    catched: PropTypes.object,
    catchedCounter: PropTypes.number,
    fetchedAllPokemons: PropTypes.bool,
    fetchedAllCatched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

export default App;