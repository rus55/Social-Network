import React from 'react'
import s from './ProfileInfo.module.css'

const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img src="https://wiotto.com/backend/webcontent/kcfinder/images/images/Maldives_Beach_1.jpg"
                     alt=""/>
            </div>
            <div className={s.descriptionBlock}>
                ava + descr
            </div>

        </div>
    )
}

export default ProfileInfo