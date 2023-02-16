import React, {ComponentType, FC} from 'react'
import Profile from './Profile'
import axios from "axios";
import {useLocation, useParams, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {RootStateType} from "../../redux/store";
import {AppStateType} from "../../redux/redux-store";
import {setUserProfileActionCreator} from "../../redux/profile-reducer";
import {compose} from "redux";
interface ProfileContainerType {
    match: {
        params: {
            userId: number
        }
    },
    // setUserProfileActionCreator или setUserProfile
    setUserProfileActionCreator: (profile: any) => void
    profile: any
}
class ProfileContainer extends React.Component<ProfileContainerType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {userId = 2}
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                this.props.setUserProfileActionCreator(response.data)
            })
    }
    render() {
        // {...this.props} раскукоживаем пропсы на атрибуты
        return (
           <Profile {...this.props} profile={this.props.profile} />
        )
    }
}
let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage
})


 type mapStateToPropsType = {
    profile: any
}



//let WithUrlDataContainerComponent = withRouter(ProfileContainer)
//export default connect(mapStateToProps, {setUserProfileActionCreator}) (WithUrlDataContainerComponent)
export default compose<FC>(connect(mapStateToProps, {setUserProfileActionCreator}), withRouter)(ProfileContainer)