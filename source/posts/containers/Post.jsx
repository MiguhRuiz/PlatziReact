import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Styles from './Post.css'

import actions from '../../actions'

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    async componentDidMount() {
        if(this.props.user && !!this.props.comments.size > 0) return this.setState({ loading:false })

        await Promise.all([
            this.props.actions.loadUser(this.props.userId),
            this.props.actions.loadCommentsForPost(this.props.id)
        ])

        this.setState({ loading: false })
    }

    render() {
        return(
            <article id={`post-${this.props.id}`} className={Styles.post}>
                <h2 className={Styles.title}>
                    <Link to={`/post/${this.props.id}`}>
                        {this.props.title}
                    </Link>
                </h2>
                <p className={Styles.body}>
                    {this.props.body}
                </p>
                {!this.state.loading && (
                    <div className={Styles.meta}>
                        <Link to={`/user/${this.props.user.id}`} className={Styles.user}>
                            {this.props.user.get('name')}
                        </Link>
                        <span className={Styles.comments}>
                            <FormattedMessage id="post.meta.comments" values={{
                                amount: this.props.comments.size
                            }} />
                        </span>
                        <Link to={`/post/${this.props.id}`}>
                            <FormattedMessage id="post.meta.readMore" />
                        </Link>
                    </div>
                )}
            </article>
        )
    }
}

Post.propTypes = {
    id: PropTypes.number,
    userId: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    user: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        size: PropTypes.number,
        get: PropTypes.func
    }),
    comments: PropTypes.objectOf(
        PropTypes.object
    ),
    actions: PropTypes.objectOf(PropTypes.func)
}

function mapStateToProps(state, props) {
    return {
        comments: state
            .get('comments')
            .filter(comment => comment.get('postId') === props.id),
        user: state
            .get('users')
            .get(props.userId)
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)