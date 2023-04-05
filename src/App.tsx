import React, {Component} from 'react';
import './App.css';
import {Route, withRouter} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {AppStateType} from "./redux/redux-store";

type AppPropsType = {
    initializeApp: () => void
    initialized: boolean
}

class App extends Component<AppPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }
    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path="/dialogs" render={() =>
                        <DialogsContainer/>}/>
                    <Route path="/profile/:userId?"
                           render={() => <ProfileContainer/>}/>
                    <Route path="/users"
                           render={() => <UsersContainer/>}/>
                    <Route path="/login"
                           render={() => <LoginPage/>}/>
                    {/*<Route path='/news' render={() => <News />}/>*/}
                    {/*<Route path='/music' render={() => <Music />}/>*/}
                    {/*<Route path='/settings' render={() => <Settings />}/>*/}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)
