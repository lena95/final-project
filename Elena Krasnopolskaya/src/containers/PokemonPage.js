import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {getError, getIsFetching, getPokemon} from '../reducers/reducer';
import {requestPokemon} from '../reducers/actions';
import FetchError from '../components/FetchError';
import PokePage from '../components/PokePage';


export class PokemonPage extends Component {
    static propTypes = {
        poke: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            date: PropTypes.string,
        }),
        isFetching: PropTypes.bool.isRequired,
        fetchPokemon: PropTypes.func.isRequired,
        errorMessage: PropTypes.string,
    };

    static defaultProps = {
        fetchPokemon: () => {
        },
    };

    componentDidMount() {
        const {poke, errorMessage} = this.props;
        if (!poke && !errorMessage) {
            this.getPokemon();
        }
    }

    handleClick = () => {
        this.props.history.goBack();
    };

    getPokemon = () => {
        const {poke, fetchPokemon, match} = this.props;
        if (!poke) {
            fetchPokemon(match.params.id);
        }
    };

    render() {
        const {poke, isFetching, errorMessage} = this.props;

        if (!poke && errorMessage) {
            return (
                <FetchError
                    message={errorMessage}
                    onRetry={this.getPokemon}
                />
            )
        }

        if (!poke && isFetching) {
            return (
                <h6>
                    Fetching...
                </h6>
            )
        }

        if (!poke) {
            return (
                <h6>No pokemon found :(</h6>
            )
        }

        return (
            <PokePage
                {...poke}
                goBack={this.handleClick}
            />
        )
    }
}

const mapStateToProps = (state, {match}) => {
    const id = match.params.id;
    return {
        poke: getPokemon(state, id),
        isFetching: getIsFetching(state),
        errorMessage: getError(state),
    }
};

const mapDispatchToProps = (dispatch) => ({
    fetchPokemon: bindActionCreators(requestPokemon, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PokemonPage);