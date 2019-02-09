import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {catchPokemon} from '../reducers/actions';

export let PokemonCard = ({
                              name,
                              id,
                              date,
                              catched,
                              onClick,
                              isShowDate
                          }) => ((
    <div style={{width: '12em', height: '13.5em'}} className="card text-center mx-auto mb-4">
        <h6 className="card-header">
            <Link to={`/pokemons/${id}`}>
                {name.toUpperCase()}
            </Link>
        </h6>
        <Link to={`/pokemons/${id}`}>
            <img id='pokeimg' className='mx-auto'
                 src={require(`./../pokemons/${id}.png`)}
                 alt={`${name}.png`}
                 style={{width: '8.5em', backgroundSize: 'auto'}}
            />
        </Link>
        {!catched &&
        <button
            disabled={date}
            onClick={() => onClick(id, name)}
            className={!date ? 'button button-active' : 'button button-disabled'}
        >
            {date ? 'catched' : 'catch'}
        </button>
        }
        {date && isShowDate &&
        <div>
            {date}
        </div>
        }

    </div>
));

const mapDispatchToProps = (dispatch) => ({
    onClick: bindActionCreators(catchPokemon, dispatch),
});

PokemonCard.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    date: PropTypes.string,
    catched: PropTypes.bool,
    onClick: PropTypes.func, // perhaps we will redo this
};

export default connect(null, mapDispatchToProps)(PokemonCard);