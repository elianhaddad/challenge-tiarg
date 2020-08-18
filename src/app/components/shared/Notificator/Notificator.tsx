import React from 'react'
import { Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { useSelector, useDispatch } from 'react-redux'
import { selectNotificator } from 'app/containers/PostPage/selectors'
import { actions } from 'app/containers/PostPage/slice'

const Notificator = () => {
    const notificatorItem = useSelector(selectNotificator)
    const dispatch = useDispatch()

    const handleClose = (event: any) => {
        dispatch(actions.hideNotificator())
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                open={notificatorItem.open}
                autoHideDuration={6000}
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id'
                }}
                message={<span id="message-id">{notificatorItem.message}</span>}
                action={[
                    <IconButton
                        size="small"
                        key="1"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                ]}
            />
        </div>
    )
}

export default Notificator
