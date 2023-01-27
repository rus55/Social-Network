const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

export type DialogType = {
    id: number
    name: string
    avatar: string
}

export type MessageType = {
    id: number
    message: string
}

export type InitialStateType = typeof initialState

let initialState = {
    dialogs: [
        {id: 1, name: 'Dima', avatar: 'https://cdn-icons-png.flaticon.com/512/4440/4440953.png'},
        {id: 2, name: 'Vova', avatar: 'https://cdn-icons-png.flaticon.com/512/4441/4441037.png'},
        {id: 3, name: 'Alexa', avatar: 'https://cdn-icons-png.flaticon.com/512/5231/5231019.png'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'Yo'}
    ] as Array<MessageType>,
    newMessageBody: ''
}

const dialogsReducer = (state: InitialStateType = initialState, action: DialogsActions): InitialStateType => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.newText
            }
        case SEND_MESSAGE:
            let body = state.newMessageBody
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, {id: 6, message: body}]
            }
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