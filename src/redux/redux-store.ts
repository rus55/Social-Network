import {applyMiddleware, combineReducers, createStore} from 'redux';
import profileReducer, {ProfileActions} from './profile-reducer';
import dialogsReducer, {DialogsActions} from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer, {UsersActionsType} from './users-reducer';
import authReducer, {AuthActionsType} from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import { reducer as formReducer} from "redux-form";

export const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
})

export type AppActionsType = AuthActionsType | DialogsActions | ProfileActions| UsersActionsType

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType>