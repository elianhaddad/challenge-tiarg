import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'types'
import { initialState } from './slice'

const selectDomain = (state: RootState) => state?.post || initialState

export const selectLoading = createSelector(
    [selectDomain],
    (postState) => postState.loading
)

export const selectViewMode = createSelector(
    [selectDomain],
    (postState) => postState.viewMode
)

export const selectItem = createSelector(
    [selectDomain],
    (postState) => postState.selectedItem
)

export const selectError = createSelector(
    [selectDomain],
    (postState) => postState.error
)

export const selectPosts = createSelector(
    [selectDomain],
    (postState) => postState.posts
)

export const selectNotificator = createSelector(
    [selectDomain],
    (postState) => postState.notificator
)
