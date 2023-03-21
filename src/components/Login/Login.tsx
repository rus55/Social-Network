import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import { Input } from '../common/FormsControls/FormsControls';
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {required} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";
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

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    placeholder={'Email'}
                    name={'email'}
                    validate={[required]}
                    component={Input}/>
            </div>
            <div>
                <Field
                    placeholder={'Password'}
                    name={'password'}
                    type={'password'}
                    validate={[required]}
                    component={Input}/>
            </div>
            <div>
                <Field
                    component={Input}
                    name={'rememberMe'}
                    type={'checkbox'}/> remember me
            </div>
            {props.error && <div className={style.formSummaryError}>
                {props.error}
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
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
};

const mapStatetoProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStatetoProps, {login})(Login);