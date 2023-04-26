import React, {ChangeEvent, useState} from 'react'
import s from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import {ProfilePageType} from "../../../redux/store";
import userPhoto from '../../../assests/images/user.png'
import {contactsType, Profiletype, saveProfile} from '../../../../src/redux/profile-reducer';
import ProfileStatusWithHooks from '../../../../src/components/Profile/ProfileInfo/ProfileStatusWithHooks'
import ProfileDataForm, {ProfileDataFormType} from '../../../../src/components/Profile/ProfileInfo/ProfileDataForm'
import ProfileDataFormReduxForm from "../../../../src/components/Profile/ProfileInfo/ProfileDataForm";

type ProfileInfoType = {
    // profile: ProfilePageType
    profile: Profiletype | null
    status: string,
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: File) => void
    saveProfile: () => void

}
const ProfileInfo = (props: ProfileInfoType) => {
    let [editMode, setEditMode] = useState(false)
    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileDataFormType) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        )
    }

    return (
        <div>
            <div>
                <img src="https://wiotto.com/backend/webcontent/kcfinder/images/images/Maldives_Beach_1.jpg"
                     alt="photo"/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props?.profile?.photos?.large || userPhoto} className={s.mainPhoto}/>
                {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}

                {editMode
                    ? <ProfileDataFormReduxForm initialValue={props.profile} profile={props.profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={ () => {setEditMode(true)}} profile={props.profile} isOwner={props.isOwner}  />
                }

                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>

        </div>
    )
}

type ProfileDataType = {
    profile: Profiletype
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData = ({profile, isOwner, goToEditMode}: ProfileDataType) => {
    return <div>
        {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
        <div>
            <b>Full name:</b> {profile.fullName}
        </div>
        <div>
            <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJob &&
            <div>
                <b>My professional skills:</b> {profile.lookingForAJobDescription}
            </div>
        }
        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {profile.contacts && Object.keys(profile.contacts).map((key) => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts}/>
        })}
        </div>
    </div>
}
//.contacts[key as keyof contactsType]
type ContactType = {
    contactTitle: string
    contactValue: contactsType | undefined
}

const Contact = ({contactTitle, contactValue}: ContactType) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue ? contactValue[contactTitle as keyof contactsType] : ''}</div>
}

export default ProfileInfo