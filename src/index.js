import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import reducer from './reducers/'
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

function configureStore() {
    return createStore(
        reducer,
        applyMiddleware(thunk, logger)
    );
}

ReactDOM.render(
    <Provider store={configureStore()}>
        <App />
    </Provider>,
    document.getElementById('root')
);
