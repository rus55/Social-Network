import React from 'react'
import styles from './users.module.css'
import {UsersPropsType} from './UsersContainer';
import axios from 'axios';
import userPhoto from './../../assests/images/user.png'

let Users = (props: UsersPropsType) => {
    // тут сайдэффект, что не делает ее чистой
    let getUsers = () => {
        if (props.usersPage.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
                props.setUsers(response.data.items)
            })
        }
    }

    return <div>
        <button onClick={getUsers}>Get users</button>
        {
            // props.users.map(u => <div key={u.id}>
            props.usersPage.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        {/*<img src={u.photoUrl} className={styles.userPhoto}/>*/}
                        <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.follow(u.id)
                            }}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users