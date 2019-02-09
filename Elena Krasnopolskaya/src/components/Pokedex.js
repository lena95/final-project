import React from 'react';
import Header from './Header';
import Routing from './Routing';

const Pokedex = () => (
    <div id='bcg'>
        <img id='pikachu'
             src={require(`./../wallpaper3.png`)}
             alt={`pika`}
             style={{width: '28em', position: 'fixed', bottom: '1px', right: '1px'}}
        />
        <Header/>
        <Routing/>
    </div>
);

export default Pokedex;