import React, {ComponentType} from 'react'
import Profile from './Profile'
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {AppStateType} from "../../redux/redux-store";
import {getStatus, getUserProfile, Profiletype, updateStatus} from "../../redux/profile-reducer";
import {compose, Dispatch} from "redux";
import {RouteComponentProps} from "react-router";
interface ProfileContainerType extends RouteComponentProps<{ userId: string | undefined }> {
    /*match: {
        params: {
            userId: number
        }
    },
    history: any,*/
    profile: any,
    status: any,
    updateStatus: (status: any) => void
    getUserProfile: (userId: number) => (dispatch: Dispatch) => void,
    getStatus: (userId: number) => void
    isAuth: boolean
    authorizedUserId: number
}

class ProfileContainer extends React.Component<ProfileContainerType> {
    componentDidMount() {
        let userId = this.props.match.params.userId ? +this.props.match.params.userId : undefined
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
               // this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }
    render() {
        return (
           <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
        )
    }
}

type MSTP = {
    profile: Profiletype | null
    status: any
    authorizedUserId: number | null
    isAuth: boolean
}

let mapStateToProps = (state: AppStateType): MSTP => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
})

export default compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
)(ProfileContainer)