import React from 'react';
import {render} from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import cfgStore from './cfgStore';
import 'react-app-polyfill/ie11';
import './index.css';
import App from './components/App';

const store = cfgStore();

render(
    <App store={store}/>, document.getElementById('root')
);

registerServiceWorker();