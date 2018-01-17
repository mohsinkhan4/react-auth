import React, { Component } from "react"

class Checkbox extends Component {

    constructor() {
        super();
        this.state = { checked : false };
    }

    render() {
        const { checked } = this.state;
        return (
            <input type="checkbox" checked={ checked } onChange={ this.onChange.bind(this) }/>
        );
    }

    onChange(e) {
        const checked = !this.state.checked;
        this.setState({ checked });

        const { rowKey, onCheckboxChange } = this.props;
        onCheckboxChange(rowKey, checked);
    }
}

export default Checkbox;
