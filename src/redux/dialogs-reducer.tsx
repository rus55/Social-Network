import {DialogType, MessageType, PostType} from './state';

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

type InitialStateType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody:string
}

let initialState: InitialStateType = {
    dialogs: [
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Vova'},
        {id: 3, name: 'Alex'},
        {id: 4, name: 'David'},
        {id: 5, name: 'Genya'},
        {id: 6, name: 'Artem'},
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'}
    ],
    newMessageBody: ''
}

const dialogsReducer = (state = initialState, action: DialogsActions): InitialStateType => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.newText
            return state
        case SEND_MESSAGE:
            let body = state.newMessageBody
            state.newMessageBody = ''
            state.messages.push({id: 6, message: body})
            return state
        default:
            return state
    }
}
type DialogsActions =
    | sendMessageCreatorType
    | updateNewMessageBodyCreatorType

type sendMessageCreatorType = ReturnType<typeof sendMessageCreator>
type updateNewMessageBodyCreatorType = ReturnType<typeof updateNewMessageBodyCreator>

export const sendMessageCreator = () => ({type: SEND_MESSAGE} as const)
export const updateNewMessageBodyCreator = (newText: string) =>
    ({type: UPDATE_NEW_MESSAGE_BODY, newText} as const)

export default dialogsReducer