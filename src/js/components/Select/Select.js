import React, { Component } from "react"

class Select extends Component {

    constructor() {
        super();
    }

    render() {
        const { data, onSelect } = this.props;
        const options = data.options.map(
            c => <option key={ c.key } value={ c.key }> { c.text } </option>
        );

        return (
            <span style={{ margin: '25px' }}>
                <span>{ data.label }</span>
                <select onChange={ this.onChange.bind(this) }>
                    { options }
                </select>
            </span>
        );
    }

    onChange(e) {
        const { onSelect } = this.props;
        onSelect(e.target.value);
    }
}

export default Select;
