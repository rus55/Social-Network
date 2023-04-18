import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {ProfilePageType} from "../../redux/store";

type ProfileType = {
    profile: ProfilePageType
    status: any
    updateStatus: (status: any) => void
}

const Profile = (props: ProfileType) => {
    return (
        <div>
            <ProfileInfo isOwner={props.isOwner} profile={props.profile} status={ props.status} updateStatus={props.updateStatus}  />
            <MyPostsContainer />
        </div>
    )
}

export default Profile