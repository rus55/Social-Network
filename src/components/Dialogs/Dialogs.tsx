import React, { ChangeEvent } from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {sendMessageCreator, updateNewMessageBodyCreator} from '../../redux/dialogs-reducer';
import { DialogPageType } from '../../redux/state';

type Dialog = {
    id: number
    name: string
}
type Message = {
    id: number
    message: string
}

type DialogsProps = {
    dialogPage: DialogPageType
    dispatch:(action:any) => void
}

const Dialogs = (props: DialogsProps) => {
    const {dialogs,messages,newMessageBody} = props.dialogPage
    let dialogsElements = dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = messages.map(m => <Message message={m.message}/>)

    let onSendMessageClick = () => {
        props.dispatch(sendMessageCreator())
    }
    let onNewMessageChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value
        props.dispatch(updateNewMessageBodyCreator(body))
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea
                        value={newMessageBody}
                        onChange={onNewMessageChange}
                        placeholder='Enter your message '></textarea></div>
                    <div><button onClick={onSendMessageClick}>SEND</button></div>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;