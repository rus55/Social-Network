import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {store, AppStateType} from './redux/redux-store'
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';

let rerenderEntireTree = (state: AppStateType) => {
    ReactDOM.render(
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>, document.getElementById('root')
    );
}

rerenderEntireTree(store.getState())

store.subscribe(() => {
    let state = store.getState()
    rerenderEntireTree(state)
})