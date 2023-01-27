import React from 'react'
import Users from './Users'
import {connect} from 'react-redux'
import {followAC, InitialStateType, setUsersAC, unfollowAC, UserType} from '../../redux/users-reducer';
import {AppStateType} from '../../redux/redux-store';
import { Dispatch } from 'redux';

type MapStateToPropsType = {
    usersPage: InitialStateType
}

type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserType>) => void
}

export type UsersPropsType = MapStateToPropsType & MapDispatchPropsType

// для передачи юзеров в пропсы для презентационной компоненты
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        usersPage: state.usersPage
    }
}
// для передачи презентационной компоненте колбеки, которые будет вызывать презентационная компонента
// предназначение коллбеков общаться со стором
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        follow: (userId: number) => {
            // диспатчим результат работы action creator (action - объект, который содержит как минимум тип)
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: Array<UserType>) => {
            dispatch(setUsersAC(users))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Users)