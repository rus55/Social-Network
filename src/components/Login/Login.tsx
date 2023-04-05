import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from '../common/FormsControls/FormsControls';
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {required} from "../../utils/validators/validators";
import style from './../common/FormsControls/FormsControls.module.css'
import {AppStateType} from "../../redux/redux-store";

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

type LoginType = {
    login: (email: string, password: string, rememberMe: boolean) => void
    isAuth: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', [required], Input)}
            {createField('Password', 'password', [required], Input, {type:'password'} )}
            {createField(null, 'rememberMe', [required], Input, {type: 'checkbox'}, 'remember me' )}
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}

            <div>
                <button>Login</button>
            </div>
        </form>
    )
};

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const Login = (props: LoginType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        //return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
};

const mapStatetoProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStatetoProps, {login})(Login);