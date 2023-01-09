import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Dialogs from './components/Dialogs/Dialogs';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import {RootStateType} from './redux/state';

type PropsType = {
    state: RootStateType
    addPost: () => void
    updateNewPostText: (newText: string) => void
}

function App(props: PropsType) {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Route path="/dialogs" render={() => <Dialogs state={props.state.dialogPage}/>} />
                <Route path="/profile"
                       render={() => <Profile
                           profilePage={props.state.profilePage}
                           addPost={props.addPost}
                           updateNewPostText={props.updateNewPostText}
                       />} />
                {/*<Route path='/news' render={() => <News />}/>*/}
                {/*<Route path='/music' render={() => <Music />}/>*/}
                {/*<Route path='/settings' render={() => <Settings />}/>*/}
            </div>
        </div>
    );
}

export default App;