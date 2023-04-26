import React from 'react'
import s from './Post.module.css'

const Post = (props: any) => {
    return (
        <div className={s.item}>
            <img src="https://w7.pngwing.com/pngs/187/576/png-transparent-account-avatar-profile-user-avatars-icon.png" alt="photo"/>
            {props.message}
            <div>
                <span>like</span> {props.likesCount}
            </div>
        </div>
    )
}

export default Post