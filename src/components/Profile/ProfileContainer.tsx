import React, {ComponentType, FC} from 'react'
import Profile from './Profile'
import {Redirect, withRouter} from 'react-router-dom';
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
        if (!userId) {userId = 2}
        this.props.getUserProfile(userId)
    }
    render() {
        if (!this.props.isAuth) return <Redirect to='./login' />

        return (
           <Profile {...this.props} profile={this.props.profile} />
        )
    }
}
let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage,
    isAuth: state.auth.isAuth
})

type mapStateToPropsType = {
    profile: any
}
export default compose<FC>(connect(mapStateToProps, {getUserProfile}), withRouter)(ProfileContainer)