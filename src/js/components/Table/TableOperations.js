import React, { Component } from "react"
import { connect } from "react-redux"

class TableOperations extends Component {

    constructor() {
        super();
        this.state = { currentData : '' };
    }

    render() {
        const { isData, currentSearch, onSearch, removeRow } = this.props;
        const { currentData } = this.state;

        return (
            <div style={{ 'display': isData ? 'block' : 'none' }}>
                <input class="form-control" style={{ margin: 10, display: 'none' }} value={ currentData } onChange={ this.onCurrentDataChange.bind(this) }/>
                <button class="btn btn-success" style={{ margin: 10 }} onClick={ this.addRow.bind(this) }>Add</button>
                <button class="btn btn-danger" style={{ marginLeft: 50 }} onClick={ removeRow }>Remove</button>
                <input class="form-control" placeholder={ 'Search' } style={{ margin: 10, float: 'right' }}
                    value={ currentSearch } onChange={ onSearch }/>
            </div>
        );
    }

    onCurrentDataChange(e) {
        this.setCurrentData(e.target.value);
    }

    setCurrentData(currentData) {
        this.setState({ currentData });
    }

    addRow() {
        const { addRow } = this.props;
        const { currentData } = this.state;

        this.setCurrentData('');
        addRow({
            text: currentData
    	});
    }

    removeRow() {
        const { removeRow } = this.props;
        removeRow();
    }
}

export default TableOperations;
