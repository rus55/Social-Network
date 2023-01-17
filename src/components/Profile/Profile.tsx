import React from 'react'
import MyPosts from './MyPosts/MyPosts'
// import s from './../.Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {ProfilePageType} from '../../redux/state';

type ProfileType = {
    profilePage: ProfilePageType
    dispatch: (action: any) => void
}

const Profile = (props: ProfileType) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}
                     newPostText={props.profilePage.newPostText}
                     dispatch={props.dispatch}
            />
        </div>
    )
}

export default Profile