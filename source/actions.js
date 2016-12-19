/**
 * Created by miguhruiz on 19/12/16.
 */

function setPost(post) {
    return {
        type: 'SET_POST',
        payload: post
    }
}

export default {
    setPost
}