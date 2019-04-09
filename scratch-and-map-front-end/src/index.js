import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import thunk  from 'redux-thunk'
import logger from 'redux-logger'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/rootReducer'

import './index.scss'

import App from './App';

const middleware = applyMiddleware(thunk, logger)
const store = createStore(rootReducer, middleware)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>, document.getElementById('root'));


