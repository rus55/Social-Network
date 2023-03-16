import {PostType} from './store';
import {profileAPI, usersAPI} from "../api/api";
import {Dispatch} from "redux";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

type contactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
type PhotosType = {
    small: string
    large: string
}
type Profiletype = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: contactsType
    photos: PhotosType
}

export type InitialStateType = {
    newPostText: string
    posts: PostType[]
    profile: null | Profiletype
}

let initialState: InitialStateType = {
    posts: [
        {id: 1, message: 'Hi. How are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 10},
        {id: 3, message: 'It\'s my first post2', likesCount: 10},
        {id: 4, message: 'It\'s my first post3', likesCount: 10}
    ],
    profile: null
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
        default:
            return state
    }
}

type ProfileActions =
    | addPostActionCreatorType
    | setUserProfileActionCreatorType
    | updateNewPostTextActionCreatorType

type addPostActionCreatorType = ReturnType<typeof addPostActionCreator>
type setUserProfileActionCreatorType = ReturnType<typeof setUserProfileActionCreator>
type updateNewPostTextActionCreatorType = ReturnType<typeof updateNewPostTextActionCreator>

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText} as const)
export const setUserProfileActionCreator = (profile: Profiletype) => ({type: SET_USER_PROFILE, profile} as const)
export const setStatus = (status: ) => ({type: SET_STATUS, status} as const)

export const getUserProfile = (userId: number) => (dispatch: Dispatch) => {
    usersAPI.getProfile(userId).then(response => {
        dispatch(setUserProfileActionCreator(response.data))
    })
}

export const getStatus = (userId: number) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(setStatus(response.data))
    })
}

export const updateStatus = (status: ) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    })
}

export default profileReducer