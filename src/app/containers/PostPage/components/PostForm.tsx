import React from 'react'
import { TextField, Button, makeStyles } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { selectItem, selectLoading } from '../selectors'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { actions } from '../slice'
import Post from '../models'

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}))

export default function PostForm() {
    let item = useSelector(selectItem)

    const isLoading = useSelector(selectLoading)

    const dispatch = useDispatch()

    const { register, handleSubmit, errors } = useForm()

    const classes = useStyles()

    let history = useHistory()

    const onSubmit = (data: Post) => {
        const { ...itemToSend } = item as Post

        itemToSend.title = data.title
        itemToSend.body = data.body

        if (itemToSend.id && itemToSend.id > 0) {
            dispatch(actions.putItem(itemToSend))
        } else {
            dispatch(actions.postNewItem(itemToSend))
        }
    }

    const handleClose = () => {
        dispatch(actions.selectList())
        history.push(`/`)
    }

    return (
        <React.Fragment>
            {!isLoading || item ? (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={classes.form}
                    data-testid="post-form"
                >
                    <TextField
                        margin="dense"
                        label="Title"
                        name="title"
                        type="text"
                        defaultValue={item?.title}
                        fullWidth
                        inputRef={register({ required: true })}
                    />
                    {errors.title && <span>Title is required</span>}

                    <TextField
                        margin="dense"
                        label="Body"
                        multiline
                        rowsMax={6}
                        name="body"
                        type="text"
                        defaultValue={item?.body}
                        fullWidth
                        inputRef={register({ required: true })}
                    />
                    {errors.body && <span>Body is required</span>}

                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        data-testid="form-dialog-layer-save"
                    >
                        Save
                    </Button>
                </form>
            ) : (
                <div> Cargando </div>
            )}
        </React.Fragment>
    )
}
