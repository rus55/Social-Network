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
    ] as Array<MessageType>
}

const dialogsReducer = (state: InitialStateType = initialState, action: DialogsActions): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            }
        default:
            return state
    }
}
type DialogsActions =
    | sendMessageCreatorType

type sendMessageCreatorType = ReturnType<typeof sendMessageCreator>

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody} as const)

export default dialogsReducer