import {getAuthUserData} from "./auth-reducer";
import {AppThunk} from "./redux-store";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState: InitialStateType = {
    initialized: false
}

export type InitialStateType = {
    initialized: boolean
}
const appReducer = (state: InitialStateType = initialState, action: AppInitializedActionsType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        default:
            return state
    }
}

export type initializedSuccessActionType = {
    type: 'INITIALIZED_SUCCESS'
}

export type AppInitializedActionsType = initializedSuccessActionType

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS} as const)

export const initializeApp = (): AppThunk => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then( () => {
            dispatch(initializedSuccess())
    } )
}

export default appReducer