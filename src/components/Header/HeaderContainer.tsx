import React from 'react'
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

export type HeaderContainerTypeProps = MSTP & MDTP

class HeaderContainer extends React.Component<HeaderContainerTypeProps> {
    render() {
        return <Header {...this.props} />
    }
}
type MSTP = {
    isAuth: boolean
    login: string | null
}
type MDTP = {
    logout: () => void
}
const mapStateToProps = (state: AppStateType): MSTP => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})
export default connect(mapStateToProps, {logout} )(HeaderContainer)