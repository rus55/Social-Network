import React, {FC} from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import { MyPostsPropsType } from './MyPostsContainer';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import { Textarea } from '../../common/FormsControls/FormsControls';

const maxLength10 = maxLengthCreator(10)

let AddNewPostForm: FC<InjectedFormProps<{newPostText: string}>> = React.memo((props) => {
    console.log('Render')
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    type={'text'}
                    name='newPostText'
                    component={Textarea}
                    placeholder={'Post message'}
                    validate={[required, maxLength10]}
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
})

let AddNewPostFormRedux = reduxForm<{newPostText: string}>({form: "ProfileAddNewPostForm"})(AddNewPostForm)

const MyPosts = (props: MyPostsPropsType) => {
    let postsElements = props.posts.map(p => <Post message={p.message} key={p.id} likesCount={p.likesCount}/>)

    const onAddPost = (values: {newPostText: string}) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}


export default MyPosts