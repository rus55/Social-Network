import React from 'react'
import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";

let state = {
    newPostText: '',
    posts: [
        {id: 1, message: 'Hi. How are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 10},
        {id: 3, message: 'It\'s my first post2', likesCount: 10},
        {id: 4, message: 'It\'s my first post3', likesCount: 10}
    ],
    profile: null,
    status: null
}

it('length of posts should be incremented', () => {
    // 1. test data
    let action = addPostActionCreator('test')

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.posts.length).toBe(5)
})

it('Message of new post should be correct', () => {
    // 1. test data
    let action = addPostActionCreator('test')

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.posts[4].message).toBe('test')
})

it('After deleting length of messages should be decrement', () => {
    // 1. test data
    let action = deletePost(1)

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.posts.length).toBe(3)
})

it('After deleting length should not be decrement if id is incorrect', () => {
    // 1. test data
    let action = deletePost(1000)

    // 2. action
    let newState = profileReducer(state, action)

    // 3. expectation
    expect(newState.posts.length).toBe(4)
})