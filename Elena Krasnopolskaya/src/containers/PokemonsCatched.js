import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {getCatchedPage, getCatchedPokemons, getError, getFetchedAllCatched, getIsFetching} from '../reducers/reducer';
import {requestCatchedPokemons} from '../reducers/actions';
import PokeList from '../components/PokeList';
import FetchError from '../components/FetchError';


export class PokemonsCatched extends Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
        catchedPage: PropTypes.number.isRequired,
        fetchCatchedPokemons: PropTypes.func.isRequired,
        fetchedAllCatched: PropTypes.bool.isRequired,
        isFetching: PropTypes.bool.isRequired,
        errorMessage: PropTypes.string,
    };

    componentDidMount() {
        if (this.props.catchedPage === 1 && !this.props.fetchedAllCatched) {
            this.fetchPokemons();
        }
    }

    fetchPokemons = () => {
        this.props.fetchCatchedPokemons();
    };

    static defaultProps = {
        fetchCatchedPokemons: () => {
        },
    };


    render() {
        const {list, errorMessage, isFetching, fetchedAllCatched} = this.props;
        if (errorMessage && !list.length) {
            return (
                <FetchError
                    message={errorMessage}
                    onRetry={this.fetchPokemons}
                />
            )
        }

        if (!list.length && !isFetching) {
            return (
                <p>
                    There are no catched pokemons
                </p>
            )
        }

        return (
            <PokeList
                catched
                list={list}
                onClick={this.fetchPokemons}
                isFetching={isFetching}
                isFetchedAll={fetchedAllCatched}
                isShowDate={true}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    list: getCatchedPokemons(state),
    errorMessage: getError(state),
    fetchedAllCatched: getFetchedAllCatched(state),
    isFetching: getIsFetching(state),
    catchedPage: getCatchedPage(state),
});

const mapDispatchToProps = (dispatch) => ({
    fetchCatchedPokemons: bindActionCreators(requestCatchedPokemons, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PokemonsCatched);