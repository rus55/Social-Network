import React, {ComponentType} from 'react'
import Profile from './Profile'
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {AppStateType} from "../../redux/redux-store";
import {
    getStatus,
    getUserProfile,
    Profiletype,
    savePhoto,
    saveProfile,
    updateStatus
} from "../../redux/profile-reducer";
import {compose, Dispatch} from "redux";
import {RouteComponentProps} from "react-router";
import {ProfilePageType} from "../../../src/redux/store";

// interface ProfileContainerType extends RouteComponentProps<{ userId: string | undefined }> {
//     /*match: {
//         params: {
//             userId: number
//         }
//     },
//     history: any,*/
//     profile: any,
//     status: any,
//     updateStatus: (status: any) => void
//     getUserProfile: (userId: number) => (dispatch: Dispatch) => void,
//     getStatus: (userId: number) => void
//     isAuth: boolean
//     authorizedUserId: number
// }

class ProfileContainer extends React.Component<ProfileContainerProps> {

    refreshProfile = () => {
        let userId = this.props.match.params.userId ? +this.props.match.params.userId : 27595
        if (!userId) {
            userId = this.props.authorizedUserId!

            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(String(userId))
        this.props.getStatus(String(userId))
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfileContainerProps>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
           <Profile {...this.props}
                    isOwner={!this.props.match.params.userId}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}
                    savePhoto={this.props.savePhoto}
           />
        )
    }
}

type MSTP = {
    profile: Profiletype | null
    status: any
    authorizedUserId: number | null
    isAuth: boolean
}

type MapDispatchToPropsType = {
    getUserProfile: (id: string) => void
    getStatus: (id: string) => void
    updateStatus: (id: string) => void
    savePhoto: (photo: File) => void
    saveProfile: (profile: ProfilePageType) => Promise<any>
}

type ProfileContainerProps = MapDispatchToPropsType & MSTP & RouteComponentProps<{ userId: string}>

let mapStateToProps = (state: AppStateType): MSTP => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
})

export default compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
)(ProfileContainer)