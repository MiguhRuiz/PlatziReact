import fetch from 'isomorphic-fetch'

const baseURL = 'http://jsonplaceholder.typicode.com'

const api = {
    posts: {
        async getList(page = 1) {
            const response = await fetch(`${baseURL}/posts?_page=${page}`)
            const data = await response.json()
            return data
        },
        async getSingle(id = 1) {
            const response = await fetch(`${baseURL}/posts/${id}`)
            const data = await response.json()
            return data
        },
        async getComments(id = 3) {
            const response = await fetch(`${baseURL}/posts/${id}/comments`)
            const data = await response.json()
            return data
        }
    },
    users: {
        async getSingle(id = 1) {
            const response = await fetch(`${baseURL}/users/${id}`)
            const data = await response.json()
            return data
        },
        async getPosts(id = 1) {
            const response = await fetch(`${baseURL}/posts/?userId=${id}`)
            const data = await response.json()
            return data
        }
    }
}

export default api