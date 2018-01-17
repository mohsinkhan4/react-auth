import React, { Component } from "react"
import { connect } from "react-redux"

import Checkbox from "../Checkbox/Checkbox"

class SelectorCell extends Component {

    constructor() {
        super();
    }

    render() {
        const { rowKey, onSelect } = this.props;

        return (
            <td class="col-md-1">
                <Checkbox rowKey={ rowKey } onCheckboxChange={ onSelect } />
            </td>
        );
    }

}

export default SelectorCell;
