import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Tinkamo from "./tinkamo";

let x = new Tinkamo();
ReactDOM.render(<App tinkamo={x}/>, document.getElementById('root'));


serviceWorker.unregister();
