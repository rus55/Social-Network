let rerenderEntireTree = () => {
    console.log('State changed')
}

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
type DialogPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}
type SidebarType = {}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogPage: DialogPageType
    sidebar: SidebarType
}
let state: RootStateType = {
    profilePage: {
        newPostText: 'it-kamasutra.com',
        posts: [
            {id: 1, message: 'Hi. How are you?', likesCount: 12},
            {id: 2, message: 'It\'s my first post', likesCount: 10},
            {id: 3, message: 'It\'s my first post2', likesCount: 10},
            {id: 4, message: 'It\'s my first post3', likesCount: 10}
        ],

    },
    dialogPage: {
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
        ]
    },
    sidebar: {}
}

export const addPost = () => {
    let newPost: PostType = {
        id: state.profilePage.posts.length + 1,
        message: state.profilePage.newPostText,
        likesCount: 0
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = ''
    rerenderEntireTree()
}

// @ts-ignore
window.state= state

export const updateNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText
    rerenderEntireTree()
}

export const subscribe = (observer: any) => {
    rerenderEntireTree = observer
}

export default state

// store - OOP