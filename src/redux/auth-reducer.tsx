import {authAPI} from "../api/api";
import {Dispatch} from "redux";

const SET_USER_DATA = 'SET_USER_DATA';

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
const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            };
        default:
            return state
    }
}
export type setAuthUserDataActionType = {type: 'SET_USER_DATA', data: any}

type ActionsType = setAuthUserDataActionType

export const setAuthUserData = (userId: number, email: string, login: string) => ({type: SET_USER_DATA, data: {userId, email, login} } as const)
export const getAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
                dispatch(setAuthUserData(id, email, login))
            }
        })
}

export default authReducer