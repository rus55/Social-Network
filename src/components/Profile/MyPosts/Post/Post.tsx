import React from 'react'
import s from './Post.module.css'

const Post = (props: any) => {
    return (
        <div className={s.item}>
            <img src="https://www.mirf.ru/wp-content/uploads/2020/09/1480331127-scaled.jpg" alt=""/>
            {props.message}
            <div>
                <span>like</span> {props.likesCount}
            </div>
        </div>
    )
}

export default Post