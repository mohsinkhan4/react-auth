import React, { Component } from "react"
import { connect } from "react-redux"

class Settings extends Component {

    constructor() {
        super();
        this.state = { currentData : '' };
    }

    render() {
        const { currentData } = this.state;

        return (
            <div>
                <input class="form-control" style={{ margin: 10 }} value={ currentData } onChange={ this.onCurrentDataChange.bind(this) }/>
            </div>
        );
    }

    onCurrentDataChange(e) {
        this.setCurrentData(e.target.value);
    }

    setCurrentData(currentData) {
        this.setState({ currentData });
    }

}

export default Settings;
