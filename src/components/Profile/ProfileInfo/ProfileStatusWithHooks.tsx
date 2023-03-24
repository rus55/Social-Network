import React, {ChangeEvent, useEffect, useState} from 'react'
import s from './ProfileInfo.module.css'

type ProfileStatusProps = {
    status: string
    updateStatus: (status: any) => void
}

type ProfileStatusState = {
    editMode: boolean
    status: any
}

const ProfileStatusWithHooks = (props: ProfileStatusProps) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect( () => {
        setStatus(props.status)
    }, [props.status] )

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            { !editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || "_______"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input value={status} onChange={onStatusChange}  onBlur={deactivateEditMode} autoFocus={true}/>
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks