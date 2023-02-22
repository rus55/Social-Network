import React from 'react'
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

export type HeaderContainerTypeProps = MSTP & MDTP
class HeaderContainer extends React.Component<HeaderContainerTypeProps> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
                    this.props.setAuthUserData(id, email, login)
                }
            })
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
    setAuthUserData: (userId: number, email: string, login: string) => void
}

const mapStateToProps = (state: AppStateType): MSTP => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})
export default connect(mapStateToProps, {setAuthUserData} )(HeaderContainer)