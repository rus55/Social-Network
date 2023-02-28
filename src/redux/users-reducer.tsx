import {usersAPI} from "../api/api";
import {Dispatch} from "redux";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

type LocationType = {
    city: string
    country: string
}

export type UserType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    location: LocationType
    photos: {
        small: string
        large: string
    }
}

const initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 19,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

export type InitialStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>

}
const usersReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            };
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state
    }
}
export type followActionType = { type: 'FOLLOW', userId: number }
export type unfollowActionType = { type: 'UNFOLLOW', userId: number }
export type setUsersActionType = { type: 'SET_USERS', users: Array<UserType> }
export type setCurrentPageActionType = { type: 'SET_CURRENT_PAGE', currentPage: number }
export type setTotalUsersCountActionType = { type: 'SET_TOTAL_USERS_COUNT', totalUsersCount: number }
export type toggleIsFetchingActionType = { type: 'TOGGLE_IS_FETCHING', isFetching: boolean }
export type toggleFollowingProgressActionType = { type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching: boolean, userId: number }

type ActionsType = followActionType | unfollowActionType
    | setUsersActionType | setCurrentPageActionType
    | setTotalUsersCountActionType | toggleIsFetchingActionType
    | toggleFollowingProgressActionType


export const followSuccess = (userId: number): followActionType => ({type: FOLLOW, userId} as const)
export const unfollowSuccess = (userId: number): unfollowActionType => ({type: UNFOLLOW, userId} as const)
export const setUsers = (users: Array<UserType>): setUsersActionType => ({type: SET_USERS, users} as const)
export const setCurrentPage = (currentPage: number): setCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    currentPage
} as const)
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount: totalUsersCount
} as const)
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
} as const)
export const toggleFollowingProgress = (isFetching: boolean, userId: number): toggleFollowingProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
} as const)

export const getUsers = (currentPage: number, pageSize: number) => {
    return (dispatch: Dispatch) => {

        dispatch(toggleIsFetching(true))

        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        })
    }
}

export const follow = (userId: number) => {
    return (dispatch: Dispatch) => {

        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.follow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followSuccess(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))
            })
    }
}

export const unfollow = (userId: number) => {
    return (dispatch: Dispatch) => {

        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.unfollow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(unfollowSuccess(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))
            })
    }
}
export default usersReducer