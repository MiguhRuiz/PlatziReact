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
        let w1 = this.state.post.title.split(' ')[0]
        let w2 = this.state.post.title.split(' ')[1]
        document.title = `${w1} ${w2}... en Mi Primera Aplicación con React`
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