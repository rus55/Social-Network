import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';

type MessageType = {
    id: number
    message: string
}
type DialogType = {
    id: number
    name: string
}
export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}
export type DialogPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageBody:string
}
export type SidebarType = {}

export type StateType = {
    profilePage: ProfilePageType
    dialogPage: DialogPageType
    sidebar: SidebarType
}

export type RootStateType = {
    _state: StateType
    _callSubscriber: (state:StateType) => void
    getState: () => StateType
    subscribe: (observer: (state:StateType) => void) => void
    dispatch: (action:any) => void
}

// let store: RootStateType = {
//     _state : {
//         profilePage: {
//             newPostText: 'it-kamasutra.com',
//             posts: [
//                 {id: 1, message: 'Hi. How are you?', likesCount: 12},
//                 {id: 2, message: 'It\'s my first post', likesCount: 10},
//                 {id: 3, message: 'It\'s my first post2', likesCount: 10},
//                 {id: 4, message: 'It\'s my first post3', likesCount: 10}
//             ],
//
//         },
//         dialogPage: {
//             dialogs: [
//                 {id: 1, name: 'Dima'},
//                 {id: 2, name: 'Vova'},
//                 {id: 3, name: 'Alex'},
//                 {id: 4, name: 'David'},
//                 {id: 5, name: 'Genya'},
//                 {id: 6, name: 'Artem'},
//             ],
//             messages: [
//                 {id: 1, message: 'Hi'},
//                 {id: 2, message: 'How are you?'},
//                 {id: 3, message: 'Yo'},
//                 {id: 4, message: 'Yo'},
//                 {id: 5, message: 'Yo'}
//             ],
//             newMessageBody: ''
//         },
//         sidebar: {}
//     },
//     _callSubscriber(state:StateType) {
//         console.log('State changed')
//     },
//
//     getState() {
//         return this._state;
//     },
//     subscribe(observer:(state:StateType) => void) {
//         this._callSubscriber = observer
//     },
//
//     dispatch(action:any) { // {type: 'ADD-POST'}
//         this._state.profilePage = profileReducer(this._state.profilePage, action)
//         this._state.dialogPage = dialogsReducer(this._state.dialogPage, action)
//         this._state.sidebar = sidebarReducer(this._state.sidebar, action)
//
//         this._callSubscriber(this._state)
//     }
// }
// export default store
//@ts-ignore
// window.store = store

// let rerenderEntireTree = () => {
//     console.log('State changed')
// }

// let state: RootStateType = {
//     profilePage: {
//         newPostText: 'it-kamasutra.com',
//         posts: [
//             {id: 1, message: 'Hi. How are you?', likesCount: 12},
//             {id: 2, message: 'It\'s my first post', likesCount: 10},
//             {id: 3, message: 'It\'s my first post2', likesCount: 10},
//             {id: 4, message: 'It\'s my first post3', likesCount: 10}
//         ],
//
//     },
//     dialogPage: {
//         dialogs: [
//             {id: 1, name: 'Dima'},
//             {id: 2, name: 'Vova'},
//             {id: 3, name: 'Alex'},
//             {id: 4, name: 'David'},
//             {id: 5, name: 'Genya'},
//             {id: 6, name: 'Artem'},
//         ],
//         messages: [
//             {id: 1, message: 'Hi'},
//             {id: 2, message: 'How are you?'},
//             {id: 3, message: 'Yo'},
//             {id: 4, message: 'Yo'},
//             {id: 5, message: 'Yo'}
//         ]
//     },
//     sidebar: {}
// }

// export const addPost = () => {
//     let newPost: PostType = {
//         id: state.profilePage.posts.length + 1,
//         message: state.profilePage.newPostText,
//         likesCount: 0
//     }
//     state.profilePage.posts.push(newPost)
//     state.profilePage.newPostText = ''
//     rerenderEntireTree()
// }
//
//
// export const updateNewPostText = (newText: string) => {
//     state.profilePage.newPostText = newText
//     rerenderEntireTree()
// }
//
// export const subscribe = (observer: any) => {
//     rerenderEntireTree = observer
// }
