import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PostBody from '../../posts/containers/Post.jsx'
import Loading from '../../shared/components/loading.jsx'
import Comment from '../../comments/components/Comment.jsx'

import actions from '../../actions'

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = { loading: true }
    }

    async componentDidMount() {
        await this.props.actions.loadSinglePost(this.props.params.id)
        await this.props.actions.loadUser(this.props.post.get('userId'))
        await this.props.actions.loadCommentsForPost(this.props.params.id)

        this.setState({ loading: false })
    }

    render() {
        if(this.state.loading) {
            return <Loading />
        }
        return(
            <section name="About">

                <section>
                    <PostBody
                        {...this.props.post.toJS()}
                        user={this.props.user.toJS()}
                        comments={this.props.comments.toJS()}
                    />
                    {this.props.comments.map(comment => {
                        return <Comment
                                    key={comment.get('id')}
                                    {...comment.toJS()}
                                />
                    }).toArray()
                    }
                </section>
            </section>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        post: state.get('post').first(),
        user: state.get('users').first(),
        comments: state.get('comments')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)