import React, { Component } from "react"
import { connect } from "react-redux"

const SORT = { ASC: 'ASC', DESC: 'DESC' };

class TableHeader extends Component {

    constructor() {
        super();
    }

    render() {
        const { columnData, currentSortColumn, currentSortDirection, onSort } = this.props;
        const columns = columnData.map(
            c => {
                const style = c.sortable ? { 'cursor' : 'pointer' } : {};
                const onClick = c.sortable ? onSort : '';
                const className = c.sortable && (c.key === currentSortColumn)
                    ? (currentSortDirection === SORT.ASC ? 'glyphicon glyphicon-arrow-up' : 'glyphicon glyphicon-arrow-down') : '';
                return (
                    <th key={ c.key } data-key={ c.key } className='col-md-1' style={ style } onClick={ onClick }>
                        { c.text }
                        <i className={ className }/>
                    </th>)
            }
        )

        return (
            <thead><tr class="row">{ columns }</tr></thead>
        );
    }

}

export default TableHeader;
