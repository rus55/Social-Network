import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {InitialStateType, sendMessageCreator, updateNewMessageBodyCreator} from '../../redux/dialogs-reducer';
import {connect} from 'react-redux';
import { Dispatch } from 'redux';
import {AppStateType} from '../../redux/redux-store';
import Dialogs from './Dialogs';

type MapStateToPropsType = {
    dialogPage: InitialStateType
    isAuth: boolean
}

type MapDispatchPropsType = {
    sendMessage: () => void
    updateNewMessageBodyCreator: (body: string) => void
}
export type DialogsPropsType = MapStateToPropsType & MapDispatchPropsType

// если есть изменения, то перерисуйся
let mapStateToProps = (state: AppStateType) => {
    return {
        dialogPage: state.dialogPage,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        sendMessage: () => {
            dispatch(sendMessageCreator())
        },
        updateNewMessageBodyCreator: (body: string) => {
           dispatch(updateNewMessageBodyCreator(body))
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;