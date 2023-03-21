import React, {ComponentType} from 'react';
import {InitialStateType, sendMessageCreator} from '../../redux/dialogs-reducer';
import {connect} from 'react-redux';
import {compose, Dispatch} from 'redux';
import {AppStateType} from '../../redux/redux-store';
import Dialogs from './Dialogs';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

type MapStateToPropsType = {
    dialogPage: InitialStateType
    isAuth: boolean
}

type MapDispatchPropsType = {
    sendMessage: (newMessageBody: string) => void
}
export type DialogsPropsType = MapStateToPropsType & MapDispatchPropsType

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogPage: state.dialogPage
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(sendMessageCreator(newMessageBody))
        }
    }
}

export default compose<ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps),
)(Dialogs)