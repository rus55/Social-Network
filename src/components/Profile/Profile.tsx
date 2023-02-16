import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {ProfilePageType} from "../../redux/store";

type ProfileType = {
    profile: ProfilePageType
}

const Profile = (props: ProfileType) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile