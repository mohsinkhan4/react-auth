import React, { Component } from "react"

import Pagination from "../Pagination/Pagination"

import TableOperations from "./TableOperations"
import TableHeader from "./TableHeader"
import TableBody from "./TableBody"

const SORT = { ASC: 'ASC', DESC: 'DESC' };
const PAGE_SIZE = 5;

class Table extends Component {

    constructor() {
        super();
        this.state = {
            currentSearch: '',
            currentSortDirection : SORT.ASC,
            currentSortColumn: null,
            currentPage: 0
        };
    }

    componentWillMount() {
        this.selectedRows = new Set();
    }

    render() {
        const { rowData, columnData, addRow, editRow } = this.props;
        const { currentSearch, currentPage, currentSortColumn, currentSortDirection } = this.state;
        const isData = !!rowData.length;

        return (
            <div class="form-inline">
                <TableOperations
                    isData={ isData }
                    currentSearch={ currentSearch }
                    onSearch={ this.onSearch.bind(this) }
                    addRow={ addRow }
                    removeRow={ this.removeRow.bind(this) } />
                <Pagination
                    isData={ isData }
                    onNavPrevPage={ this.onNavPrevPage.bind(this) }
                    onNavNextPage={ this.onNavNextPage.bind(this) } />
                <div className="container">
                    <table class="table table-striped table-hover table-container">
                        <TableHeader
                            columnData={ columnData }
                            currentSortColumn={ currentSortColumn }
                            currentSortDirection={ currentSortDirection }
                            onSort={ this.onSort.bind(this) } />
                        <TableBody
                            rowData={ this.getVisibleRowData(rowData, currentSearch, currentPage, currentSortColumn, currentSortDirection) }
                            columnData={ columnData }
                            onSelect={ this.onSelect.bind(this) }
                            editRow={ editRow } />
                    </table>
                </div>
            </div>
        );
    }

    onSort(e) {
        const { currentSortDirection } = this.state;
        const newSort = currentSortDirection === SORT.ASC ? SORT.DESC : SORT.ASC;
        this.setState({ currentSortDirection: newSort, currentSortColumn: e.target.dataset.key });
    }

    onSearch(e) {
        this.setState({ currentSearch: e.target.value });
    }

    removeRow() {
        const { removeRow } = this.props;
        removeRow(this.selectedRows);
        this.selectedRows = new Set();
    }

    onSelect(key, checked) {
        if(!checked && this.selectedRows.has(key)) {
            this.selectedRows.delete(key);
        } else if(checked && !this.selectedRows.has(key)){
            this.selectedRows.add(key);
        }
    }

    onNavPrevPage() {
        const { currentPage } = this.state;
        const newCurrentPage = currentPage === 0 ? this.maxPageIndex : (currentPage - 1)
        this.setState({ currentPage: newCurrentPage });
    }

    onNavNextPage() {
        const { currentPage } = this.state;
        const newCurrentPage = currentPage === this.maxPageIndex ? 0 : (currentPage + 1)
        this.setState({ currentPage: newCurrentPage });
    }

    getVisibleRowData(rowData, currentSearch, currentPage, currentSortColumn, currentSortDirection) {
        if(!rowData) return [];

        const filteredRowData = currentSearch ? this.getFilteredRowData(rowData, currentSearch) : rowData;

        const sortedData = this.getSortedData(filteredRowData, currentSortColumn, currentSortDirection);

        this.maxPageIndex = Math.floor(sortedData.length / PAGE_SIZE);
        const newCurrentPage = (currentPage > this.maxPageIndex) ?  this.maxPageIndex : currentPage;
        const startIndex = newCurrentPage * PAGE_SIZE;
        const endIndex = ( newCurrentPage + 1 ) * PAGE_SIZE;
        const paginatedRowData = sortedData.filter( (row, i) => ( i >= startIndex &&  i < endIndex) );

        return paginatedRowData;
    }

    getFilteredRowData(rowData, currentSearch) {
        return rowData.filter( row => {
            const keys = Object.keys(row);
            const isTextInRow = keys.map( key => {
                const val = row[key] ? row[key] : '';
                const indexOf = val.toLowerCase().indexOf(currentSearch.toLowerCase());
                return (indexOf > -1);
            });
            return isTextInRow.reduce((x, i) => (x || i))
        })
    }

    getSortedData(rowData, currentSortColumn, currentSortDirection) {
        const getValues = (a, b) => ({
                'a' : (a[currentSortColumn] ? a[currentSortColumn] : ''),
                'b' : (b[currentSortColumn] ? b[currentSortColumn] : '')
        })

        return currentSortDirection === SORT.ASC
            ?
                rowData.sort( (a, b) => {
                    let values = getValues(a, b);
                    return (values.a.toLowerCase() > values.b.toLowerCase());
                })
            :
                rowData.sort( (a, b) => {
                    let values = getValues(a, b);
                    return (values.a.toLowerCase() < values.b.toLowerCase());
                });
        }

}

export default Table;
