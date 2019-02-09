import React from 'react';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import CatchedList from '../containers/PokemonsCatched';
import PokemonsList from "../containers/PokemonsAll";
import PokePage from "../containers/PokemonPage";

const Routing = () => (
  <main>
    <Switch>
      <Route exact path='/' component={PokemonsList}/>
      <Route exact path='/catched' component={CatchedList}/>
      <Route exact path='/pokemons/:id' component={PokePage}/>
    </Switch>
  </main>
);

export default Routing;