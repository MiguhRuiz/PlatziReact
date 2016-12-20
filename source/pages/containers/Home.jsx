import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Post from '../../posts/containers/Post.jsx'
import Loading from '../../shared/components/loading.jsx'
import Header from '../../shared/components/header.jsx'

import Styles from './Page.css'

import actions from '../../actions'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }

        this.handleScroll = this.handleScroll.bind(this)
    }
    async componentDidMount() {
        await this.props.actions.postsNextPage()
        this.setState({ loading: false })

        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll(event) {
        if(this.state.loading) return null

        const scrolled = window.scrollY
        const vHeight = window.innerHeight
        const fullHeight = document.body.clientHeight

        if(!(scrolled + vHeight + 300 >= fullHeight)) {
            return null
        }

        this.setState({
            loading: true
        }, async () => {
            try {
                await this.props.actions.postsNextPage()
                this.setState({ loading: false })
            } catch(error) {
                console.error(error)
                this.state({
                    loading: false
                })
            }
        })
    }

    render() {
        return (
           <section name="Home" className={Styles.section}>
                    <FormattedMessage id="title.home" />
                    <section className={Styles.list}>
                        {this.props.posts
                            .map(post => <Post key={post.get('id')} {...post.toJS()}/>)
                            .toArray()
                        }
                        {this.state.loading && (
                            <Loading />
                        )}
                    </section>
                </section>
        )
    }
}

Home.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func),
    posts: PropTypes.objectOf(PropTypes.object)
}

function mapStateToProps(state) {
    return {
        posts: state.get('posts').get('entities')
    }
}

function mapDispatchToProps(dispatch) {
   return {
       actions: bindActionCreators(actions, dispatch)
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)