import React, { Component } from "react"

import MasterNav from "./MasterNav"
import MasterHeader from "./MasterHeader"
import MasterFooter from "./MasterFooter"

class MasterLayout extends Component {

    constructor() {
        super();
    }

    render() {
        const { history, location } = this.props
        const { pathname } = location;

        return (
            <div>
                <MasterNav pathname={ pathname } />
                <MasterHeader title={ pathname }/>
                { this.props.children }
                <MasterFooter />
            </div>
        );
    }

    navigateRoot() {
        this.props.history.push('/', null)
    }

    navigateSettings() {
        this.props.history.push('settings', null)
    }

}

export default MasterLayout;
