import React from 'react';
import styles from "./Paginator.module.css";
import {UserType} from "src/redux/users-reducer";

type UsersType = {
    currentPage: number
    onPageChanged: (value: number) => void
    totalUsersCount: number
    pageSize: number
    users: Array<UserType>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    followingInProgress: Array<number>
}

const Paginator: React.FC<UsersType> = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
            {pages.map(p => {
                return <span className={currentPage === p ? styles.selectedPage : ''}
                             onClick={(e) => {
                                 onPageChanged(p)
                             }}>{p}</span>
            })}
    </div>
}

export default Paginator