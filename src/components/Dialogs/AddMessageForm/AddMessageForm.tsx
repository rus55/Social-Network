import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";

const maxLength50 = maxLengthCreator(50)

const AddMessageForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Textarea}
                    validate={[required, maxLength50]}
                    placeholder='Enter your message'
                    name='newMessageBody'
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export default reduxForm<{newMessageBody: string}>({form: 'dialog-add-message-form'})(AddMessageForm)