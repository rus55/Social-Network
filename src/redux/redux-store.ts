import {AnyAction, applyMiddleware, combineReducers, compose, createStore} from 'redux';
import profileReducer, {ProfileActions} from './profile-reducer';
import dialogsReducer, {DialogsActions} from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer, {UsersActionsType} from './users-reducer';
import authReducer, {AuthActionsType} from "./auth-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import { reducer as formReducer} from "redux-form";
import appReducer, {AppInitializedActionsType} from './app-reducer';

export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

export type AppActionsType = AuthActionsType | DialogsActions | ProfileActions| UsersActionsType | AppInitializedActionsType

export type AppStateType = ReturnType<typeof rootReducer>

/*const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware));*/

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store