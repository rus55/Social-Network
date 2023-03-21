import React, {FC} from 'react';
import {Field, reduxForm, InjectedFormProps} from 'redux-form';


const AddPostForm: FC<InjectedFormProps> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={'textarea'} name='postText' />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'profile-add-post'
})(AddPostForm)