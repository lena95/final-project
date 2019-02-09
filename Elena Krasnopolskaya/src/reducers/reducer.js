import * as actionTypes from './constants';

const initialState = {
  isFetching: false,
  isCatching: false,
  error: null,
  pokemons: {},
  page: 1,
  catched: {},
  catchedPage: 1,
  fetchedAllPokemons: false,
  fetchedAllCatched: false,
};

const pokemonApp = (state = initialState, action) => {
  switch(action.type) {
      case actionTypes.GET_THE_POKEMON:
          return {
              ...state,
              isFetching: true,
          };
      case actionTypes.GET_THE_POKEMON_SUCCESS:
          return {
              ...state,
              isFetching: false,
              pokemons: {
                  ...state.pokemons,
                  [action.payload.data.id]: {
                      ...action.payload.data,
                  }
              }
          };
    case actionTypes.GET_CATCHED_POKEMONS:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case actionTypes.GET_CATCHED_POKEMONS_SUCCESS:
      return {
        ...state,
        catched: {
          ...state.catched,
          ...action.payload.data,
        },
        isFetching: false,
        catchedPage: state.catchedPage + 1,
      };

    case actionTypes.CHANGE_POKEMON_STATUS:
      return {
        ...state,
        catched: {
          ...state.catched,
          [action.payload.data.id]: {
            ...action.payload.data,
          }
        }
      };
      case actionTypes.GET_POKEMONS:
          return {
              ...state,
              isFetching: true,
              error: null,
          };
      case actionTypes.GET_POKEMONS_SUCCESS:
          return {
              ...state,
              pokemons: {
                  ...state.pokemons,
                  ...action.payload.data,
              },
              isFetching: false,
              page: state.page + 1,
          };
    case actionTypes.ON_CATCH_POKEMON:
      return {
        ...state,
        error: null,
        isCatching: true,
      };
    case actionTypes.ON_CATCH_POKEMON_SUCCESS:
      return {
        ...state,
        catched: {
          ...state.catched,
          [action.payload.data.id]: action.payload.data,
        },
        pokemons: {
          ...state.pokemons,
          [action.payload.data.id]: {
            ...action.payload.data,
          }
        },
        isCatching: false,
      };
      case actionTypes.ON_CATCH_POKEMON_FAIL:
          return {
              ...state,
              error: action.payload.error,
              isCatching: false,
          };
    case actionTypes.GET_POKEMONS_FAIL:
    case actionTypes.GET_CATCHED_POKEMONS_FAIL:
    case actionTypes.IS_GOT_POKEMONS_ALL:
      return {
        ...state,
        fetchedAllPokemons: true,
      };
    case actionTypes.IS_GOT_POKEMONS_CATCHED:
      return {
        ...state,
        fetchedAllCatched: true,
      };
    default:
      return state;
  }
};

export const getPokemons = (state) => {
  const ids = Object.keys(state.pokemons);
  return ids.map(id => state.pokemons[id])
};

export const getError = (state) => state.error;

export const getCatchedPokemons = (state) => {
  const ids = Object.keys(state.catched);
  return ids.map(id => state.catched[id]);
};

export const getFetchedAllPokemons = (state) => state.fetchedAllPokemons;

export const getFetchedAllCatched = (state) => state.fetchedAllCatched;

export const getPokemon = (state, id) => {
  return state.pokemons[id];
};

export const getPokemonsPage = (state) => state.page;

export const getCatchedPage = (state) => state.catchedPage;

export const getIsFetching = (state) => state.isFetching;


export default pokemonApp;

