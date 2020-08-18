import api from './../../../utils/api'
import Post from './models'

const postService = {
    getPosts: async () => {
        try {
            return await api.get('posts')
        } catch (err) {
            throw err
        }
    },
    getPostItem: async (id: number) => {
        try {
            return await api.get(`posts/${id}`)
        } catch (err) {
            throw err
        }
    },
    postNewItem: async (item: Post) => {
        try {
            return await api.post(`posts`, item)
        } catch (err) {
            throw err
        }
    },
    putItem: async (item: Post) => {
        try {
            return await api.put(`posts/${item.id}`, item)
        } catch (err) {
            throw err
        }
    },
    deleteItem: async (id: number) => {
        try {
            return await api.delete(`posts/${id}`)
        } catch (err) {
            throw err
        }
    }
}

export default postService
