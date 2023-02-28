import React from 'react'
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserData} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Dispatch} from "redux";

export type HeaderContainerTypeProps = MSTP & MDTP
class HeaderContainer extends React.Component<HeaderContainerTypeProps> {
    componentDidMount() {
       this.props.getAuthUserData()
    }
    render() {
        return <Header {...this.props} />
    }
}
type MSTP = {
    isAuth: boolean
    login: string | null
}
type MDTP = {
    getAuthUserData: () => void
}
const mapStateToProps = (state: AppStateType): MSTP => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})
export default connect(mapStateToProps, {getAuthUserData} )(HeaderContainer)