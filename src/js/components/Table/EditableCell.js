import React, { Component } from "react"

class EditableCell extends Component {

    constructor() {
        super();
    }

    componentWillMount() {
        this.state = { text :  this.props.text };
    }

    render() {
        const { rowKey, columnKey, editableRowKey, editableColumnKey } = this.props;
        const { text } = this.state;

        if(editableRowKey === rowKey && editableColumnKey === columnKey){
            return (
                <td class="col-md-1" style={{ padding: 0 }}>
                    <input class="form-control input-sm" style={{ margin: 0 }} value={ text }
                        onDoubleClick={ this.endEdit.bind(this) } onChange={ this.onTextChange.bind(this) }/>
                </td>
            );
        }

        return (
            <td class="col-md-1" onDoubleClick={ this.startEdit.bind(this) }>{ text }</td>
        );
    }

    startEdit(e) {
        const { rowKey, columnKey, startEdit } = this.props;
        startEdit(rowKey, columnKey);
    }

    endEdit() {
        const { endEdit, rowKey, columnKey } = this.props;
        const { text } = this.state;

        endEdit(rowKey, columnKey, text);
    }

    onTextChange(e) {
        this.setState({ text: e.target.value });
    }
}

export default EditableCell;
