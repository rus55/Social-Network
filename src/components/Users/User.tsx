import styles from './users.module.css';
import React from 'react';
import {NavLink} from "react-router-dom";
import {UserType} from "../../redux/users-reducer";
import userPhoto from '../../assests/images/user.png'

type UsersType = {
    user: UserType
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    followingInProgress: Array<number>
}

const User: React.FC<UsersType> = ({user, followingInProgress, unfollow, follow }) => {
    return (
        <div>
                    <span>
                        <div>
                            <NavLink to={''}>
                            <img src={user.photos.small !== null ? user.photos.small : userPhoto}
                                 className={styles.userPhoto}/>
                                </NavLink>
                        </div>
                        <div>
                            {user.followed
                                ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                    unfollow(user.id)
                                }}>Unfollow</button>
                                : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                    follow(user.id)
                                }}>Follow</button>
                            }
                        </div>
                    </span>
            <span>
                        <div>{user.fullName}</div>
                        <div>{user.status}</div>
                    </span>
            <span>
                        <div>{'user.location.country'}</div>
                        <div>{'user.location.city'}</div>
                    </span>
        </div>)
}

export default User