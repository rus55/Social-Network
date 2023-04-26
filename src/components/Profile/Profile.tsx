import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {Profiletype} from "../../redux/profile-reducer";

type ProfileType = {
    profile: Profiletype | null
    status: any
    updateStatus: (status: any) => void
    savePhoto: any
    isOwner: boolean
    saveProfile: any
}

const Profile = (props: ProfileType) => {
    return (
        <div>
            <ProfileInfo
                savePhoto={props.savePhoto}
                isOwner={props.isOwner}
                profile={props.profile}
                status={ props.status}
                updateStatus={props.updateStatus}
                saveProfile={props.saveProfile}
            />
            <MyPostsContainer />
        </div>
    )
}

export default Profile