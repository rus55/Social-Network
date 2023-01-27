import React from 'react'
import styles from './users.module.css'
import {UsersPropsType} from './UsersContainer';

let Users = (props: UsersPropsType) => {
    // тут сайдэффект, что не делает ее чистой
    if (props.usersPage.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                photoUrl: 'https://phonoteka.org/uploads/posts/2021-07/1625375743_15-phonoteka-org-p-oboi-ribalka-spinning-oboi-krasivo-15.jpg',
                followed: false,
                fullName: 'Dima',
                status: 'I am a boss',
                location: {city: 'Minsk', country: 'Belarus'}
            },
            {
                id: 2,
                photoUrl: 'https://phonoteka.org/uploads/posts/2021-07/1625375743_15-phonoteka-org-p-oboi-ribalka-spinning-oboi-krasivo-15.jpg',
                followed: true,
                fullName: 'Dima',
                status: 'I am a boss too',
                location: {city: 'Moscow', country: 'RF'}
            },
            {
                id: 3,
                photoUrl: 'https://phonoteka.org/uploads/posts/2021-07/1625375743_15-phonoteka-org-p-oboi-ribalka-spinning-oboi-krasivo-15.jpg',
                followed: false,
                fullName: 'Dima',
                status: 'I am a boss too',
                location: {city: 'NN', country: 'RF'}
            },
        ])
    }

    return <div>
        {
            // props.users.map(u => <div key={u.id}>
            props.usersPage.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photoUrl} className={styles.userPhoto}/>
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
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users