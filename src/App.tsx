import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";

function App() {
    return (
        <div className="app-wrapper">
            <HeaderContainer/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Route path="/dialogs" render={() =>
                    <DialogsContainer/>}/>
                <Route path="/profile/:userId?"
                        render={() => <ProfileContainer />} />
                <Route path="/users"
                       render={() => <UsersContainer />} />
                {/*<Route path='/news' render={() => <News />}/>*/}
                {/*<Route path='/music' render={() => <Music />}/>*/}
                {/*<Route path='/settings' render={() => <Settings />}/>*/}
            </div>
        </div>
    );
}

export default App;