import React, { Component } from 'react'
import { Link } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Post from '../../posts/containers/Post.jsx'
import Loading from '../../shared/components/loading.jsx'

import actions from '../../actions'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = { loading: true }
    }

    async componentDidMount() {
        await this.props.actions.loadUser(this.props.params.id)
        await this.props.actions.loadUserPosts(this.props.params.id)
        this.setState({ loading: false })
    }

    render() {
        if(this.state.loading) {
            return(
                <Loading />
            )
        } else {
            return(
                <section name="About">
                    <FormattedMessage id="title.profile" values={{
                        name: this.props.user.get('name')
                    }}/>
                    <fieldset>
                        <FormattedMessage id="profile.field.basic" tagName="legend" />
                        <input type="email" value={this.props.user.get('email')} disabled />
                    </fieldset>
                    {this.props.user.get('address') && (
                        <fieldset>
                            <FormattedMessage id="profile.field.address" tagName="legend" />
                            <address>
                                {this.props.user.get('address').street} <br />
                                {this.props.user.get('address').suite} <br />
                                {this.props.user.get('address').city} <br />
                                {this.props.user.get('address').zipcode} <br />
                            </address>
                        </fieldset>
                    )}

                    <section>
                        {this.props.posts
                            .map(post =>
                                <Post
                                    key={post.get('id')}
                                    {...post.toJS()}
                                    user={this.props.user.toJS()}
                                />
                            )
                            .toArray()
                        }
                    </section>
                </section>
            )
        }
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.get('users').get(Number(props.params.id)),
        posts: state.get('posts').get('entities')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)