import {PostType} from './store';
import {usersAPI} from "../api/api";
import {Dispatch} from "redux";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

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
    newPostText: 'it-kamasutra.com',
    posts: [
        {id: 1, message: 'Hi. How are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 10},
        {id: 3, message: 'It\'s my first post2', likesCount: 10},
        {id: 4, message: 'It\'s my first post3', likesCount: 10}
    ],
    profile: null
}
// перед стрелкой редьюсер возвращает такой же тип, который у него был
// почему state через равно?
const profileReducer = (state = initialState, action: ProfileActions): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostType = {
                // у него id: 5
                id: state.posts.length + 1,
                message: state.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, newPost]
            }
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
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

// по факту он возвращает объект, у которого есть type и newText, снизу которые
type addPostActionCreatorType = ReturnType<typeof addPostActionCreator>
type setUserProfileActionCreatorType = ReturnType<typeof setUserProfileActionCreator>
type updateNewPostTextActionCreatorType = ReturnType<typeof updateNewPostTextActionCreator>

export const addPostActionCreator = () => ({type: ADD_POST} as const)
export const setUserProfileActionCreator = (profile: Profiletype) => ({type: SET_USER_PROFILE, profile} as const)
export const getUserProfile = (userId: number) => (dispatch: Dispatch) => {
    usersAPI.getProfile(userId).then(response => {
        dispatch(setUserProfileActionCreator(response.data))
    })
}
export const updateNewPostTextActionCreator = (newText: string) => ({type: UPDATE_NEW_POST_TEXT, newText} as const)

export default profileReducer