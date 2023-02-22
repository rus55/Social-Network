import React from 'react'
import s from './Header.module.css'
import {NavLink} from 'react-router-dom'
import {HeaderContainerTypeProps} from "./HeaderContainer";

type HeaderPropsType = HeaderContainerTypeProps
const Header = (props: HeaderPropsType) => {
    return (
        <header className={s.header}>
            <img
                src="https://st.depositphotos.com/2235295/2688/i/600/depositphotos_26882771-stock-photo-three-green-leaves-isolated-on.jpg"
                alt=""/>
            <div className={s.loginBlock}>
                {props.isAuth ? props.login : <NavLink to={'login'}>Login</NavLink>}

            </div>
        </header>
    )
}

export default Header