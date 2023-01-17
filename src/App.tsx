import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Dialogs from './components/Dialogs/Dialogs';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import { StateType} from './redux/state';

type PropsType = {
    state: StateType
    dispatch:(action:any) => void
}

function App(props: PropsType) {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className="app-wrapper-content">
                <Route path="/dialogs" render={() =>
                    <Dialogs
                        dialogPage={props.state.dialogPage}
                        dispatch={props.dispatch}/>}/>
                <Route path="/profile"
                        render={() => <Profile
                            profilePage={props.state.profilePage}
                            dispatch={props.dispatch}
                        />} />
                {/*<Route path='/news' render={() => <News />}/>*/}
                {/*<Route path='/music' render={() => <Music />}/>*/}
                {/*<Route path='/settings' render={() => <Settings />}/>*/}
            </div>
        </div>
    );
}

export default App;