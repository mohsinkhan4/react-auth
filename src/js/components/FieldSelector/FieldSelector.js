import React, { Component } from "react"
import Select from "../Select/Select"

class FieldSelector extends Component {

    constructor() {
        super();
        this.state = { show: false, selectedColumn: '' };
    }

    render() {
        const { columnData } = this.props;
        const options = columnData.map(
            c => <option key={ c.key } value={ c.key }> { c.text } </option>
        );
        const data = {
            label: 'Select the Quantity Field:',
            options: columnData
        }

        return (
            <div class="container well" style={{ 'display': columnData.length ? 'block' : 'none' }}>
                <Select
                    data={{
                        label: 'Select the Name Field: ',
                        options: columnData
                    }}
                    onSelect={ this.onSelectName.bind(this) } />
                <Select
                    data={{
                        label: '& Quantity Field: ',
                        options: columnData
                    }}
                    onSelect={ this.onSelectQuantity.bind(this) } />
                <span style={{ 'marginLeft': '75px' }}>
                    <button className="btn btn-primary" style={{ margin: 10 }} onClick={ this.onSubmit.bind(this) }>Submit</button>
                </span>
            </div>
        );
    }

    onSelectQuantity(quantityColumn) {
        this.setState({ quantityColumn });
    }

    onSelectName(nameColumn) {
        this.setState({ nameColumn });
    }

    onSubmit() {
        const { onSubmit } = this.props;
        const { nameColumn, quantityColumn } = this.state;
        onSubmit({
            nameColumn, quantityColumn
        });
    }

}

export default FieldSelector;
