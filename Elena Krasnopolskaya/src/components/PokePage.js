import React from 'react';
import PropTypes from 'prop-types';

const PokePage = ({
                      name,
                      id,
                      date,
                      goBack,
                  }) => {
    let isCatched;

    if (date) {
        isCatched = (
            <div className='pb-5 '>
                Was catched {date}
            </div>
        )
    } else {
        isCatched = (
            <div className='pb-5 '>
                Not catched yet :(
            </div>
        )
    }

    return (

        <div className="page text-center">

            <img id='pokemon-info-avatar'
                 src={require(`./../pokemons/${id}.png`)}
                 alt={`${name}.png`}
                 style={{width: '18em', paddingTop: '1em'}}
            />
            <h1>
                {name}
            </h1>
            {isCatched}
            <button id='btn-load'
                    className="btn btn-warning m-5"><a
                className=""
                onClick={(e) => {
                    e.preventDefault();
                    goBack();
                }}
            >
                Back to pokedex
            </a></button>
            <br/><br/>
        </div>
    )
};

PokePage.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    date: PropTypes.string,
    goBack: PropTypes.func.isRequired,
};

export default PokePage;