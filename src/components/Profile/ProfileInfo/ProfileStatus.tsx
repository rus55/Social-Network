import React, {ChangeEvent} from 'react'
import s from './ProfileInfo.module.css'

type ProfileStatusProps = {
    status: string
    updateStatus: (status: any) => void
}

type ProfileStatusState = {
    editMode: boolean
    status: any
}

class ProfileStatus extends React.Component<ProfileStatusProps, ProfileStatusState> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState( {
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState( {
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: ProfileStatusProps, prevState:ProfileStatusState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}></span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.props.status}/>
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus