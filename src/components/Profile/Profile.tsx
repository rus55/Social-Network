import React from 'react'
import MyPosts from './MyPosts/MyPosts'
// import s from './../.Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {ProfilePageType} from '../../redux/store';
import MyPostsContainer from './MyPosts/MyPostsContainer';

// type ProfileType = {
//     profilePage: ProfilePageType
//     dispatch: (action: any) => void
// }

const Profile = () => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile