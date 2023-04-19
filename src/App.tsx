import React, {Component} from 'react';
import './App.css';
import {Redirect, Route, withRouter} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {AppStateType} from "./redux/redux-store";
import { withSuspense } from './hoc/withSuspense';

const DialogsContainer = React.lazy( () =>
    import('./components/Dialogs/DialogsContainer')
)

const ProfileContainer = React.lazy( () =>
    import('./components/Profile/ProfileContainer')
)

type AppPropsType = {
    initializeApp: () => void
    initialized: boolean
}

class App extends Component<AppPropsType> {
    catchAllUnhandledErrors = (promiseRejectionEvent) => {
        alert(promiseRejectionEvent)
    }
    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }
    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
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
                    <Route path="/" render={() => <Redirect to={'/profile'} />} />
                    <Route path="/dialogs" render={withSuspense(DialogsContainer)} />
                    <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)} />
                    <Route path="/users"
                           render={() => <UsersContainer/>}/>
                    <Route path="/login"
                           render={() => <LoginPage/>}/>
                    <Route path='*' render={() => <div>404 NOT FOUND</div> }  />
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
