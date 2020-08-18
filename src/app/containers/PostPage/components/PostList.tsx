import React, { useEffect } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { useSelector, useDispatch } from 'react-redux'
import { selectPosts } from '../selectors'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { actions } from '../slice'

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        }
    }
}))(TableRow)

const useStyles = makeStyles({
    table: {
        minWidth: 700
    },
    postIdColumn: {
        minWidth: '100px'
    },
    actionsColumn: {
        minWidth: '150px'
    },
    buttons: {
        minWidth: '75px'
    }
})

export default function PostList() {
    const classes = useStyles()

    const posts = useSelector(selectPosts)

    const dispatch = useDispatch()

    const useEffectOnMount = (effect: React.EffectCallback) => {
        useEffect(effect, [])
    }
    useEffectOnMount(() => {
        // When initial state username is not null, submit the form to load repos
        dispatch(actions.loadPosts())
    })

    let history = useHistory()

    const onEditItem = (id: number) => {
        history.push(`/${id}`)
    }

    const onDelete = (id: number) => {
        dispatch(actions.deleteItem(id))
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Post Id</StyledTableCell>
                        <StyledTableCell align="right">Title</StyledTableCell>
                        <StyledTableCell align="right">Body</StyledTableCell>
                        <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell
                                component="th"
                                scope="row"
                                className={classes.postIdColumn}
                            >
                                {row.id}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {row.title}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {row.body}
                            </StyledTableCell>
                            <StyledTableCell
                                align="right"
                                className={classes.actionsColumn}
                            >
                                <Button
                                    color="inherit"
                                    onClick={() => onEditItem(row.id)}
                                    className={classes.buttons}
                                >
                                    Edit
                                </Button>
                                <Button
                                    color="inherit"
                                    className={classes.buttons}
                                    onClick={() => onDelete(row.id)}
                                >
                                    Delete
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
