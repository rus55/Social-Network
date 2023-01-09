import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import state, {RootStateType, subscribe} from './redux/state'
import App from './App';
import {addPost, updateNewPostText} from './redux/state'
import {BrowserRouter} from 'react-router-dom';

let rerenderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <App state={state} addPost={addPost} updateNewPostText={updateNewPostText}/>
        </BrowserRouter>, document.getElementById('root')
    );
}

rerenderEntireTree()

subscribe(rerenderEntireTree)