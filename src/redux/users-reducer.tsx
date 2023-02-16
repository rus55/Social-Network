const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

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
    isFetching: false
}

export type InitialStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean

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
                users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching}
        }
        default:
            return state
    }
}
export type followActionType = {type: 'FOLLOW', userId: number}
export type unfollowActionType = {type: 'UNFOLLOW', userId: number}
export type setUsersActionType = {type: 'SET_USERS', users: Array<UserType>}
export type setCurrentPageActionType = {type: 'SET_CURRENT_PAGE', currentPage: number}
export type setTotalUsersCountActionType = {type: 'SET_TOTAL_USERS_COUNT', totalUsersCount: number}
export type toggleIsFetchingActionType = {type: 'TOGGLE_IS_FETCHING', isFetching: boolean}

type ActionsType = followActionType | unfollowActionType
    | setUsersActionType | setCurrentPageActionType
    | setTotalUsersCountActionType | toggleIsFetchingActionType

export const follow = (userId: number): followActionType => ({type: FOLLOW, userId} as const)
export const unfollow = (userId: number): unfollowActionType => ({type: UNFOLLOW, userId} as const)
export const setUsers = (users: Array<UserType>): setUsersActionType => ({type: SET_USERS, users} as const)
export const setCurrentPage = (currentPage: number): setCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage} as const)
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount: totalUsersCount} as const)
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching} as const)

export default usersReducer