/**
 * Created by miguhruiz on 19/12/16.
 */

import { combineReducers } from 'redux-immutable'
import {
    fromJS,
    Map as map
} from 'immutable'

const initialState = fromJS({
    posts: {
        page: 1,
        entities: {}
    },
    comments: {},
    users: {},
    post: {}
})

function postsPageReducer(state = initialState.get('posts').get('page'), action = {} ) {
    switch (action.type) {
        case 'SET_POST':
            return state + 1
        default:
            return state
    }
}

function postsEntitiesReducer(state = initialState.get('posts').get('entities'), action = {}) {
    switch (action.type) {
        case 'SET_POST':
            return action.payload
                .reduce(
                    (posts, post) => posts.set(post.id, map(post)),
                    state
                )
        default:
            return state
    }
}

const postsReducer = combineReducers({
    page: postsPageReducer,
    entities: postsEntitiesReducer
})

function commentsReducer(state = initialState.get('comments'), action = {}) {
    switch (action.type) {
        case 'SET_COMMENTS':
            return action.payload
                .reduce(
                    (comments, comment) => comments.set(comment.id, map(comment)),
                    state
                )
            return state.concat(action.payload)
        default:
            return state
    }
}

function usersReducer(state = initialState.get('users'), action = {}) {
    switch (action.type) {
        case 'SET_USER':
            return state.set(action.payload.id, map(action.payload))
        default:
            return state
    }
}

function postReducer(state = initialState.get('post'), action = {}) {
    switch (action.type) {
        case 'SET_SINGLE':
            return state.set(action.payload.id, map(action.payload))
        default:
            return state
    }
}

const reducer = combineReducers({
    posts: postsReducer,
    comments: commentsReducer,
    users: usersReducer,
    post: postReducer
})

export default reducer