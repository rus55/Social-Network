import React, { ChangeEvent } from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { DialogPageType } from '../../redux/store';
import {DialogsPropsType} from './DialogsContainer';

// type Dialog = {
//     id: number
//     name: string
// }
// type Message = {
//     id: number
//     message: string
// }

// type DialogsProps = {
//     sendMessage: () => void
//     updateNewMessageBodyCreator: (body: string) => void
//     dialogPage: DialogPageType
// }

const Dialogs = (props: DialogsPropsType) => {
    // const {dialogs,messages,newMessageBody} = props.dialogPage

    let state = props.dialogPage

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id}/>)
    let newMessageBody = state.newMessageBody

    let onSendMessageClick = () => {
        props.sendMessage()
    }
    let onNewMessageChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.currentTarget.value
        props.updateNewMessageBodyCreator(body)
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