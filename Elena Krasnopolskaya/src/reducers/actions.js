import * as actionTypes from './constants';


export const isGotPokemonsCatched = () => ({
    type: actionTypes.IS_GOT_POKEMONS_CATCHED,
});

export const isGotPokemonsAll = () => ({
    type: actionTypes.IS_GOT_POKEMONS_ALL,
});

export const getCathedPokemons = () => ({
    type: actionTypes.GET_CATCHED_POKEMONS,
});

export const getCathedPokemonsSuccess = (data) => ({
    type: actionTypes.GET_CATCHED_POKEMONS_SUCCESS,
    payload: {
        data,
    }
});

export const getCathedPokemonsFail = (error) => ({
    type: actionTypes.GET_CATCHED_POKEMONS_FAIL,
    payload: {
        error: error.message || 'Something went wrong',
    }
});

export const requestCatchedPokemons = () => (dispatch, getState) => {
    dispatch(getCathedPokemons());

    const page = getState().catchedPage;

    return fetch(`http://localhost:3001/catched?_page=${page}&_limit=10&_expand=pokemon&_sort=id`)
        .then(res => res.json())
        .then(data => {
            if (data.length < 10) dispatch(isGotPokemonsCatched());
            const pokemons = {};
            data.forEach(poke => {
                pokemons[poke.pokemonId] = {
                    ...poke.pokemon, date: poke.date
                }
            });
            return pokemons;
        })
        .then(pokemons => {
            dispatch(getCathedPokemonsSuccess(pokemons));
            return pokemons;
        })
        .catch(err => dispatch(getCathedPokemonsFail(err)));
};

export const onCatchPokemon = () => ({
    type: actionTypes.ON_CATCH_POKEMON,
});

export const onCatchPokemonSuccess = (data) => ({
    type: actionTypes.ON_CATCH_POKEMON_SUCCESS,
    payload: {
        data
    },
});

export const onCatchPokemonFail = (error) => ({
    type: actionTypes.ON_CATCH_POKEMON_FAIL,
    payload: {
        error: error.message || 'Something went wrong',
    }
});

export const catchPokemon = (id, name) => (dispatch) => {
    dispatch(onCatchPokemon());

    return fetch(`http://localhost:3001/catched?_sort=id`, {
        method: 'POST',
        body: JSON.stringify({
            date: new Date().toLocaleString(),
            pokemonId: id,
            id: id,
        }),
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(res => res.json())
        .then(data => ({
            name,
            id,
            date: data.date,
        }))
        .then(pokemon => {
            dispatch(onCatchPokemonSuccess(pokemon));
            return pokemon;
        })
        .catch(err => {
            dispatch(onCatchPokemonFail(err));
            return err;
        })
};

export const getThePokemon = () => ({
    type: actionTypes.GET_THE_POKEMON,
});

export const getThePokemonSuccess = (data) => ({
    type: actionTypes.GET_THE_POKEMON_SUCCESS,
    payload: {
        data,
    }
});

export const getThePokemonFail = (error) => ({
    type: actionTypes.GET_THE_POKEMON_FAIL,
    payload: {
        error: error.message || 'Something went wrong',
    }
});

export const changePokemonStatus = (data) => ({
    type: actionTypes.CHANGE_POKEMON_STATUS,
    payload: {
        data,
    }
});

export const requestPokemon = (id) => (dispatch) => {
    dispatch(getThePokemon());

    return fetch(`http://localhost:3001/pokemons/${id}?_embed=catched&_sort=id`)
        .then(res => res.json())
        .then(data => {
            const placeholder = data.catched[0] ? data.catched[0].date : null;
            const pokemon = {
                name: data.name,
                id: data.id,
                date: placeholder,
            };
            return pokemon;
        })
        .then(pokemon => {
            dispatch(getThePokemonSuccess(pokemon));
            if (pokemon.date) dispatch(changePokemonStatus(pokemon));
            return pokemon;
        })
        .catch(err => dispatch(getThePokemonFail(err)))
};

export const getPokemons = () => ({
    type: actionTypes.GET_POKEMONS,
});

export const getPokemonsSuccess = (data) => ({
    type: actionTypes.GET_POKEMONS_SUCCESS,
    payload: {
        data,
    }
});

export const getPokemonsFail = (error) => ({
    type: actionTypes.GET_POKEMONS_FAIL,
    payload: {
        error: error.message || 'Something wrong',
    }
});

export const requestPokemons = () => (dispatch, getState) => {
    dispatch(getPokemons());

    const page = getState().page;

    return fetch(`http://localhost:3001/pokemons?_page=${page}&_limit=10&_embed=catched&_sort=id`)
        .then(res => res.json())
        .then(data => {
            if (data.length < 10) dispatch(isGotPokemonsAll());
            const pokemons = {};
            data.forEach(poke => {
                const placeholder = poke.catched[0] ? poke.catched[0].date : null;
                pokemons[poke.id] = {
                    name: poke.name,
                    id: poke.id,
                    date: placeholder,
                }
            });
            dispatch(getPokemonsSuccess(pokemons));
            return pokemons;
        })
        .catch(err => dispatch(getPokemonsFail(err)));
};


