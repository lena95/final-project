import React from 'react';
import PropTypes from 'prop-types';
import PokeItem from '../containers/PokemonCard';

const PokeList = ({
                      list,
                      catched,
                      isFetchedAll,
                      onClick,
                      isFetching,
                      isShowDate
                  }) => (
    <div className='text-center' style={{paddingLeft: '8%', paddingRight: '8%'}}>
        <h3 className='text-center pb-3'>Pokedex</h3>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {list.map(elem => (
                <PokeItem catched={catched} key={elem.id} isShowDate={isShowDate}{...elem} />
            ))}
        </div>
        {!isFetchedAll &&
        <button id='btn-load'
                onClick={onClick}
                className="btn btn-warning m-2 mx-auto"
                disabled={isFetching}
        >
            {isFetching ? 'loading...' : 'load more pokemons'}
        </button>
        }
    </div>
);

PokeList.propTypes = {
    isFetchedAll: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    catched: PropTypes.bool,
};

export default PokeList;