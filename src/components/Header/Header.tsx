import React from 'react'
import s from './Header.module.css'
import {NavLink} from 'react-router-dom'
import {HeaderContainerTypeProps} from "./HeaderContainer";

type LogoutType = {
    logout: () => void
}
type HeaderPropsType = HeaderContainerTypeProps & LogoutType
const Header = (props: HeaderPropsType) => {
    return (
        <header className={s.header}>
            <img
                src="https://e7.pngegg.com/pngimages/199/963/png-clipart-social-media-scalable-graphics-computer-icons-social-network-social-media-text-logo.png"
                alt="Logotip"/>
            {/*<div className={s.logo}>Social Network</div>*/}
            <div className={s.loginBlock}>
                {props.isAuth ? <div>{props.login} - <button onClick={props.logout}>logout</button></div>
                    : <NavLink to={'login'}>Login</NavLink>}
            </div>
        </header>
    )
}

export default Header