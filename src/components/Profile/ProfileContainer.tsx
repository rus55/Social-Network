import React, {ComponentType} from 'react'
import Profile from './Profile'
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {AppStateType} from "../../redux/redux-store";
import {getUserProfile} from "../../redux/profile-reducer";
import {compose, Dispatch} from "redux";
interface ProfileContainerType {
    match: {
        params: {
            userId: number
        }
    },
    profile: any,
    getUserProfile: (userId: number) => (dispatch: Dispatch) => void,
    isAuth: boolean
}
class ProfileContainer extends React.Component<ProfileContainerType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {userId = this.props.authorizedUserId}
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }
    render() {
        return (
           <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default compose<ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    withRouter
)(ProfileContainer)