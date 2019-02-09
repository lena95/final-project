import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {requestPokemons} from '../reducers/actions';
import {getError, getFetchedAllPokemons, getIsFetching, getPokemons, getPokemonsPage} from '../reducers/reducer'
import PokeList from '../components/PokeList';
import FetchError from '../components/FetchError';


export class PokemonsAll extends Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
        fetchPokemons: PropTypes.func.isRequired,
        fetchedAllPokemons: PropTypes.bool.isRequired,
        isFetching: PropTypes.bool.isRequired,
        page: PropTypes.number.isRequired,
        errorMessage: PropTypes.string,
    };

    componentDidMount() {
        if (this.props.page === 1 && !this.props.fetchedAllPokemons) {
            this.fetchPokemons();
        }
    }

    fetchPokemons = () => {
        this.props.fetchPokemons();
    };

    static defaultProps = {
        fetchPokemons: () => {
        },
    };

    render() {
        const {list, errorMessage, isFetching, fetchedAllPokemons} = this.props;

        if (!list.length && errorMessage) {
            return (
                <FetchError
                    message={errorMessage}
                    onRetry={this.fetchPokemons}
                />
            )
        }

        if (!list.length && !isFetching) {
            return (
                <h6>
                    There are no pokemons.
                </h6>
            )
        }

        return (
            <PokeList
                list={list}
                onClick={this.fetchPokemons}
                isFetching={isFetching}
                isFetchedAll={fetchedAllPokemons}
                isShowDate={false}
            />
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchPokemons: bindActionCreators(requestPokemons, dispatch)
});

const mapStateToProps = (state) => ({
    list: getPokemons(state),
    errorMessage: getError(state),
    fetchedAllPokemons: getFetchedAllPokemons(state),
    isFetching: getIsFetching(state),
    page: getPokemonsPage(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(PokemonsAll);