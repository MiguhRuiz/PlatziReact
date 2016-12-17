import React, { Component } from 'react'
import { Link } from 'react-router'

import PostBody from '../../posts/containers/Post.jsx'
import Loading from '../../shared/components/loading.jsx'
import Comment from '../../comments/components/Comment.jsx'

import api from '../../api'

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            user: {},
            post: {},
            comments: []
        }
    }

    async componentDidMount() {
        const [post, comments] = await Promise.all([
            api.posts.getSingle(this.props.params.id),
            api.posts.getComments(this.props.params.id)
        ])

        const user = await api.users.getSingle(post.userId)

        this.setState({
            loading: false,
            user,
            post,
            comments
        })
    }

    render() {
        if(this.state.loading) {
            return <Loading />
        }
        return(
            <section name="About">
                <PostBody
                    {...this.state.post}
                    user={this.state.user}
                    comments={this.state.comments}
                />
                <section>
                    {this.state.comments.map(comment => {
                        return <Comment
                                    key={comment.id}
                                    {...comment}
                                />
                    })}
                </section>
            </section>
        )
    }
}

export default Post