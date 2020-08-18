import Post, { INotificator } from './models'

/* --- STATE --- */
export interface PostState {
    posts: Post[]
    selectedItem: Post | null
    viewMode: ViewMode
    loading: boolean
    error?: PostErrorType | null
    notificator: INotificator
}

export enum PostErrorType {
    RESPONSE_ERROR = 1
}

export enum ViewMode {
    SHOW_LIST = 'SHOW_LIST',
    SHOW_FORM = 'SHOW_FORM'
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = PostState
