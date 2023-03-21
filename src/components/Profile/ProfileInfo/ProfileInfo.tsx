import React from 'react'
import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import {ProfilePageType} from "../../../redux/store";
import ProfileStatus from './ProfileStatus'

type ProfileInfoType = {
    profile: ProfilePageType
    status: any,
    updateStatus: (status: any) => void
}
const ProfileInfo = (props: ProfileInfoType) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            {/*<div>
                <img src="https://wiotto.com/backend/webcontent/kcfinder/images/images/Maldives_Beach_1.jpg"
                     alt=""/>
            </div>*/}
            <div className={s.descriptionBlock}>
              {/*  <img src={props.profile.photos.large}/>*/}
                ava + descr
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            </div>

        </div>
    )
}

export default ProfileInfo