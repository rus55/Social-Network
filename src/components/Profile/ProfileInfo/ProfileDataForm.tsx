import s from './ProfileInfo.module.css'
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls"
import {reduxForm} from "redux-form";
import style from "src/components/common/FormsControls/FormsControls.module.css";
import React from "react";
import {Profiletype} from "../../../../src/redux/profile-reducer";

export type ProfileDataFormType = {
    handleSubmit: any
    profile: Profiletype
    error: null
}

type ProfileFormDataType = {
    fullName: string
    lookingForAJob: string
    lookingForAJobDescription: string
    aboutMe: string
}

const ProfileDataForm = ({handleSubmit, profile, error}: ProfileDataFormType) => {
    return <form onSubmit={handleSubmit}>
        <div><button>save</button></div>
        {error && <div className={style.formSummaryError}>
            {error}
        </div>}
        <div>
            <b>Full name</b>: {createField('Full name', 'fullName', [], Input)}
        </div>
        <div>
            <b>Looking for a job</b>: {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
        </div>
        <div>
             <b>My professional skills</b>:
            {createField('My professional skills', 'lookingForAJobDescription', [], Textarea)}
        </div>
        <div>
            <b>About me</b>:
            {createField('About me', 'aboutMe', [], Textarea)}
       </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={s.contact}>
                <b>{key}:
                    {createField('', 'lookingForAJob', [], Input)}
                    </b>
            </div>
        })}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<ProfileFormDataType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm