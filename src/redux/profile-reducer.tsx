import {PostType, ProfilePageType} from './store';
import {profileAPI, usersAPI} from "../api/api";
import {Dispatch} from "redux";
import {stopSubmit} from "redux-form";
import {AppDispatch, AppStateType} from "../../src/redux/redux-store";
import {ProfileDataFormType} from "../../src/components/Profile/ProfileInfo/ProfileDataForm";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE-POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

export type contactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string
    large: string
}
export type Profiletype = {
    userId?: number
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    fullName?: string
    contacts?: contactsType
    photos?: PhotosType,
    aboutMe?:string
}

export type InitialStateType = {
    newPostText: string
    posts: PostType[]
    profile: null | Profiletype
    status: null | string
}

let initialState: InitialStateType = {
    newPostText: '',
    posts: [
        {id: 1, message: 'Hi. How are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 10},
        {id: 3, message: 'It\'s my first post2', likesCount: 10},
        {id: 4, message: 'It\'s my first post3', likesCount: 10}
    ],
    profile: null,
    status: null
}

const profileReducer = (state = initialState, action: ProfileActions): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostType = {
                id: state.posts.length + 1,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, newPost]
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        }
        default:
            return state
    }
}

export type ProfileActions =
    | addPostActionCreatorType
    | setUserProfileActionCreatorType
    | setStatusActionCreatorType
    | deletePostActionCreatorType
    | savePhotoSuccessActionCreatorType


type addPostActionCreatorType = ReturnType<typeof addPostActionCreator>
type setUserProfileActionCreatorType = ReturnType<typeof setUserProfileActionCreator>
type setStatusActionCreatorType = ReturnType<typeof setStatus>
type deletePostActionCreatorType = ReturnType<typeof deletePost>
type savePhotoSuccessActionCreatorType = ReturnType<typeof savePhotoSuccess>

export const addPostActionCreator = (newPostText: string) => ({type: ADD_POST, newPostText} as const)
export const setUserProfileActionCreator = (profile: Profiletype) => ({type: SET_USER_PROFILE, profile} as const)
export const setStatus = (status: string) => ({type: SET_STATUS, status} as const)
export const deletePost = (postId: number) => ({type: DELETE_POST, postId} as const)
export const savePhotoSuccess = (photos: PhotosType) => ({type: SAVE_PHOTO_SUCCESS, photos} as const)

export const getUserProfile = (userId: number) => async (dispatch: Dispatch) => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfileActionCreator(response.data as Profiletype))
}

export const getStatus = (userId: number) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export const savePhoto = (file: File) => async (dispatch: Dispatch) => {
    let response = await profileAPI.savePhoto(file)

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = async (profile: ProfileDataFormType) => async (dispatch: AppDispatch, getState: ()=>AppStateType) => {
    const userId = getState()?.auth?.id
    const response = await profileAPI.saveProfile(profile)

    if (response.data.resultCode === 0) {
        if (userId) {
        dispatch(getUserProfile(userId))
    }
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer
