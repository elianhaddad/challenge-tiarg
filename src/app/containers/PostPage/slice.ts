import { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from 'utils/@reduxjs/toolkit'
import { PostState, PostErrorType, ViewMode } from './types'
import Post from './models'

export const initialState: PostState = {
    posts: [],
    loading: false,
    error: null,
    selectedItem: null,
    viewMode: ViewMode.SHOW_LIST,
    notificator: { message: null, open: false }
}

const PostSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        loadPosts(state) {
            state.loading = true
            state.error = null
            state.viewMode = ViewMode.SHOW_LIST
        },
        postsLoaded(state, action: PayloadAction<Post[]>) {
            const posts = action.payload
            state.posts = posts
            state.loading = false
        },
        postError(state, action: PayloadAction<PostErrorType>) {
            state.error = action.payload
            state.loading = false
            state.posts = []
        },
        createForm(state) {
            state.viewMode = ViewMode.SHOW_FORM
            state.selectedItem = null
        },
        selectForm(state, action: PayloadAction<number>) {
            state.viewMode = ViewMode.SHOW_FORM
            state.selectedItem = null
            state.loading = true
            state.error = null
        },
        selectList(state) {
            state.viewMode = ViewMode.SHOW_LIST
            state.selectedItem = null
        },
        postItemLoaded(state, action: PayloadAction<Post>) {
            const post = action.payload
            state.selectedItem = post
            state.loading = false
        },
        postItemError(state, action: PayloadAction<PostErrorType>) {
            state.error = action.payload
            state.loading = false
            state.selectedItem = null
        },
        putItem(state, action: PayloadAction<Post>) {
            state.loading = true
        },
        putItemLoaded(state, action: PayloadAction<Post>) {
            const post = action.payload
            state.selectedItem = post
            state.loading = false
        },
        putItemError(state, action: PayloadAction<PostErrorType>) {
            state.error = action.payload
            state.loading = false
            state.selectedItem = null
        },
        postNewItem(state, action: PayloadAction<Post>) {
            state.loading = true
        },
        postNewItemLoaded(state, action: PayloadAction<Post>) {
            const post = action.payload
            state.selectedItem = post
            state.loading = false
        },
        postNewItemError(state, action: PayloadAction<PostErrorType>) {
            state.error = action.payload
            state.loading = false
            state.selectedItem = null
        },
        deleteItem(state, action: PayloadAction<number>) {},
        showNotificator(state, action: PayloadAction<string>) {
            state.notificator.message = action.payload
            state.notificator.open = true
        },
        hideNotificator(state) {
            state.notificator.message = null
            state.notificator.open = false
        }
    }
})

export const { actions, reducer, name: sliceKey } = PostSlice
