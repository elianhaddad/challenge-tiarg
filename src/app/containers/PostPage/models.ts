export default interface Post {
    userId: number
    id: number
    title: string
    body: string
}

export interface INotificator {
    message: string | null
    open: boolean
}
