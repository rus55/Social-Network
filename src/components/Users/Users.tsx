import React from 'react';
import {UserType} from "../../redux/users-reducer";
import {Paginator} from '../common/Paginator/Paginator';
import User from './User';
import s from './users.module.css'

export type UserDataType = {
    currentPage: number
    onPageChanged: (value: number) => void
    totalUsersCount: number
    pageSize: number
    users: Array<UserType>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    followingInProgress: Array<number>
}
const Users: React.FC<UserDataType> = ({currentPage, onPageChanged, totalUsersCount, pageSize, ...props}) => {
    return <div>
        <Paginator currentPage={currentPage}
                   onPageChanged={onPageChanged}
                   totalUsersCount={totalUsersCount}
                   pageSize={pageSize}/>
        <div className={s.users}>
            {
                props.users.map(u => <User user={u} followingInProgress={props.followingInProgress}
                                           unfollow={props.unfollow} follow={props.follow} key={u.id}
                />)
            }
        </div>
    </div>
}

export default Users