import React from 'react'
import {addPostActionCreator} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {AppStateType} from '../../../redux/redux-store';
import {PostType} from '../../../redux/store';

type MapStateToPropsType = {
    posts: PostType[]
    newPostText: string
}

type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
}

export type MyPostsPropsType =  MapStateToPropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addPost: (newPostText: string) => dispatch(addPostActionCreator(newPostText)),
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer