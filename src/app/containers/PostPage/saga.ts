import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'
import { actions } from './slice'
import { PostErrorType } from './types'
import postService from './services'
import Post from './models'

export function* loadPosts() {
    try {
        const response = yield call(postService.getPosts)
        if (response.data) {
            let posts = response.data as Post[]
            posts = posts.filter((e) => e.userId === 1)
            yield put(actions.postsLoaded(posts))
        } else {
            yield put(actions.postError(PostErrorType.RESPONSE_ERROR))
        }
    } catch (err) {
        yield put(actions.postError(PostErrorType.RESPONSE_ERROR))
    }
}

export function* selectForm(action: PayloadAction<number>) {
    try {
        const response = yield call(postService.getPostItem, action.payload)
        if (response.data) {
            yield put(actions.postItemLoaded(response.data))
        } else {
            yield put(actions.postItemError(PostErrorType.RESPONSE_ERROR))
        }
    } catch (err) {
        yield put(actions.postItemError(PostErrorType.RESPONSE_ERROR))
    }
}

export function* postNewItem(action: PayloadAction<Post>) {
    try {
        debugger
        let item = action.payload
        item.userId = 1
        const response = yield call(postService.postNewItem, item)
        if (response.data) {
            yield put(actions.postNewItemLoaded(response.data))
            yield put(actions.showNotificator('Successfully Added'))
        } else {
            yield put(actions.postNewItemError(PostErrorType.RESPONSE_ERROR))
        }
    } catch (err) {
        yield put(actions.postNewItemError(PostErrorType.RESPONSE_ERROR))
    }
}

export function* putItem(action: PayloadAction<Post>) {
    try {
        const response = yield call(postService.putItem, action.payload)
        if (response.data) {
            yield put(actions.putItemLoaded(response.data))
            yield put(actions.showNotificator('Successfully Modified'))
        } else {
            yield put(actions.putItemError(PostErrorType.RESPONSE_ERROR))
        }
    } catch (err) {
        yield put(actions.putItemError(PostErrorType.RESPONSE_ERROR))
    }
}

export function* deleteItem(action: PayloadAction<number>) {
    try {
        yield call(postService.deleteItem, action.payload)
        yield put(actions.showNotificator('Successfully Removed'))
        yield loadPosts()
    } catch (err) {
        yield put(actions.putItemError(PostErrorType.RESPONSE_ERROR))
    }
}

export function* postSaga() {
    yield takeLatest(actions.loadPosts.type, loadPosts)
    yield takeLatest(actions.selectForm.type, selectForm)
    yield takeLatest(actions.postNewItem.type, postNewItem)
    yield takeLatest(actions.putItem.type, putItem)
    yield takeLatest(actions.deleteItem.type, deleteItem)
}
