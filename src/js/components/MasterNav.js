import React, { Component } from "react"
import { Link } from "react-router"

class MasterNav extends Component {

    constructor() {
        super();
    }

    render() {
        const { pathname } = this.props

        return (
            <ul class="nav nav-pills" style={{ display: 'none' }}>
                <li class={ pathname === "/" ? 'active' : '' }>
                    <Link to="/">Home</Link>
                </li>
                <li class={ pathname.match(/^\/items/) ? 'active' : '' }>
                    <Link to="items">Details</Link>
                </li>
                <li class={ pathname.match(/^\/settings/) ? 'active' : '' }>
                    <Link to="settings">Settings</Link>
                </li>
            </ul>
        );
    }

}

export default MasterNav;
