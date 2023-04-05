import {authAPI} from "../api/api";
import {Dispatch} from "redux";
import {stopSubmit} from "redux-form";
import {AppThunk} from "./redux-store";
import {FormAction} from "redux-form/lib/actions";

const SET_USER_DATA = 'auth/SET_USER_DATA';

const initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

export type InitialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                //...action.payload
                login: action.payload.login,
                email: action.payload.email,
                id: action.payload.id,
                isAuth: action.payload.isAuth,
            };
        default:
            return state
    }
}

export type setAuthUserDataActionType = {
    type: 'SET_USER_DATA', payload: {
        userId: number,
        email: string,
        login: string,
        isAuth: boolean
    }
}

export type AuthActionsType = setAuthUserDataActionType | FormAction

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
} as const)

export const getAuthUserData = (): AppThunk => async (dispatch) => {
    let response = await authAPI.me()

    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean): AppThunk => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe)

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logout = () => async (dispatch: Dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer