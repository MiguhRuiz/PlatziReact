import React, { Component } from 'react'
import { Link } from 'react-router'

class Profile extends Component {
    render() {
        return(
            <section name="About">
                <h1>Profile</h1>
                <Link to="/">
                    Go to home
                </Link>
                <Link to="/random">
                    Go to random
                </Link>
            </section>
        )
    }
}

export default Profile