import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import PostList from './components/PostList'
import { useSelector, useDispatch } from 'react-redux'
import { selectViewMode } from './selectors'
import { useParams, useHistory } from 'react-router-dom'
import { ViewMode } from './types'
import PostForm from './components/PostForm'
import { makeStyles, AppBar, Toolbar, Button } from '@material-ui/core'
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors'
import { sliceKey, reducer, actions } from './slice'
import { postSaga } from './saga'

const useStyles = makeStyles((theme) => ({
    content: {
        marginRight: '15%',
        marginLeft: '15%',
        marginTop: '10px'
    },
    appBar: {
        flexGrow: 1
    },
    toolbar: {
        float: 'none',
        width: '100px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    buttons: {
        minWidth: '75px'
    }
}))

export function PostsPage() {
    useInjectReducer({ key: sliceKey, reducer: reducer })
    useInjectSaga({ key: sliceKey, saga: postSaga })

    const { id } = useParams()

    const classes = useStyles()

    const viewMode = useSelector(selectViewMode)

    const dispatch = useDispatch()

    let history = useHistory()

    const backButton = () => {
        dispatch(actions.selectList())
        if (id) history.push(`/`)
    }

    useEffect(() => {
        if (id) dispatch(actions.selectForm(id))
    }, [viewMode, id, dispatch])

    return (
        <>
            <Helmet>
                <title>Post Page</title>
                <meta name="description" content="Post Page" />
            </Helmet>
            <div>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar variant="dense" className={classes.toolbar}>
                        {viewMode === ViewMode.SHOW_LIST ? (
                            <Button
                                color="inherit"
                                onClick={() => dispatch(actions.createForm())}
                                className={classes.buttons}
                            >
                                Create
                            </Button>
                        ) : (
                            <Button
                                color="inherit"
                                className={classes.buttons}
                                onClick={backButton}
                            >
                                Back
                            </Button>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
            <div className={classes.content}>
                {viewMode === ViewMode.SHOW_LIST ? <PostList /> : <PostForm />}
            </div>
        </>
    )
}
