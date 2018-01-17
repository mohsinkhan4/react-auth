import React, { Component } from "react"
import { Link } from "react-router"
import { connect } from "react-redux"

import MasterHeader from "./MasterHeader"
import MasterFooter from "./MasterFooter"

class ItemDetails extends Component {

    constructor() {
        super();
    }

    componentWillMount() {
        this.state = {
            rowData :  [
            	{ key: 0, '1': 'Pink Floyd', '2' : 'The Division Bell' },
            	{ key: 1, '1': 'Poets Of The Fall', '2' : 'Jealous Gods' },
            	{ key: 2, '1': 'Cranberries', '2' : 'Stars' },
            	{ key: 3, '1': 'Evanescence', '2' : 'Fallen' },
            	{ key: 4, '1': 'Nirvana', '2' : 'Nevermind' },
            	{ key: 5, '1': 'Metallica', '2' : 'Master Of Puppets' },
            	{ key: 6, '1': 'Indian Ocean', '2' : 'Kandisa' },
            ],
            columnData : [
            	{ key: 0, text: 'Select'},
            	{ key: 1, text: 'Artist', sortable: true, filterable: true},
            	{ key: 2, text: 'Album'}
            ]
        };
    }

    render() {
        const { params } = this.props;
        const { rowData, columnData } = this.state;

        if(!params.id) params.id = '0';
        const row = ( rowData.filter( row => row.key.toString()===params.id ) )[0];
        const mappedColumns = columnData.filter( col => col.key!=0 );

        return (
            <ul class="itemDetails" style={{ listStyleType: 'none' }}>
                {
                    mappedColumns.map( col =>
                        <li key={ col.key }>
                            <span>{col.text}</span>
                            <span style={{ paddingLeft: '20px' }}>{row[col.key]}</span>
                        </li>
                    )
                }
            </ul>
        );
    }

}

export default ItemDetails;
