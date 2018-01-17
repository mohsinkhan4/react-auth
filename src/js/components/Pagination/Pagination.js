import React, { Component } from "react"

const PREV_ID = 'prev', NEXT_ID = 'next';

class Pagination extends Component {

    constructor() {
        super();
    }

    render() {
        const { isData } = this.props;
        return (
            <nav style={{ 'display': isData ? 'block' : 'none' }}>
                <ul class="pager">
                    <li><a href="#" onClick={ this.onPaginationNav.bind(this) } id={ PREV_ID }>Previous</a></li>
                    <li><a href="#" onClick={ this.onPaginationNav.bind(this) } id={ NEXT_ID }>Next</a></li>
                </ul>
            </nav>
        );
    }

    onPaginationNav(e) {
        const { onNavPrevPage, onNavNextPage } = this.props;

        switch(e.target.id) {
            case PREV_ID :
                onNavPrevPage();
                break;
            case NEXT_ID :
                onNavNextPage();
                break;
            default :
        }
    }

}

export default Pagination;
