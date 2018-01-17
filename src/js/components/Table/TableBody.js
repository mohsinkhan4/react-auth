import React, { Component } from "react"
import { connect } from "react-redux"

import SelectorCell from "./SelectorCell"
import EditableCell from "./EditableCell"

class TableBody extends Component {

    constructor() {
        super();
        this.state = {
            editableRowKey: null,
            editableColumnKey: null
        };
    }

    render() {

        const { rowData, columnData, onSelect } = this.props;
        const { editableRowKey, editableColumnKey } = this.state;

        const getRow = function(row) {

            const dataCells = columnData
                .filter(column => column.key)
                .map(column =>
                    <EditableCell
                        key={ column.key } editableRowKey={ editableRowKey } editableColumnKey={ editableColumnKey }
                        rowKey={ row.key } columnKey={ column.key } text={ row[column.key] }
                        startEdit={ this.startEdit.bind(this) } endEdit={ this.endEdit.bind(this) } />
                );

            return (
                <tr class="row" key={ row.key }>
                    <SelectorCell rowKey={ row.key } onSelect={ onSelect } />
                    { dataCells }
                </tr>
            );
        }.bind(this);

        return (
            <tbody>
                {
                    rowData.map( row => getRow(row) )
                }
            </tbody>
        );
    }

    startEdit(editableRowKey, editableColumnKey) {
        this.setState({ editableRowKey, editableColumnKey });
    }

    endEdit(todoKey, columnKey, text) {
        const { editRow } = this.props;

        this.setState({ editableRowKey: null });
        editRow(todoKey, columnKey, text);
    }

}

export default TableBody;
