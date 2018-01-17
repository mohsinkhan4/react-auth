import React, { Component } from "react"
import { connect } from "react-redux"

import { fetchColumnData } from "../actions/columnDataActions"
import { fetchRowData, addRowData, removeRowData, editRowData } from "../actions/rowDataActions"

import FileUpload from "./FileUpload/FileUpload"
import Table from "./Table/Table"
import FieldSelector from "./FieldSelector/FieldSelector"
import MasterChartLayout from "./MasterChartLayout"

const CHART_TYPE = { BAR: 'bar', COLUMN: 'column' };

@connect((store) => {
    return {
        columnData: store.columnData.columnData,
        rowData: store.rowData.rowData,
    };
})
class MasterTableLayout extends Component {

    constructor() {
        super();
        this.state = { show: false, selectedColumns: {} };
    }

    render() {
        const { rowData, columnData } = this.props;
        const { show, selectedColumns } = this.state;
        const chartRowData = show ? rowData : [];
        return (
            <div>
                <FileUpload onUpload={ this.importData.bind(this) }/>
                <Table
                    columnData={ columnData }
                    rowData={ rowData }
                    addRow={ this.addRow.bind(this) }
                    removeRow={ this.removeRow.bind(this) }
                    editRow={ this.editRow.bind(this) }
                    importData={ this.importData.bind(this) }
                />
                <FieldSelector columnData={ columnData } onSubmit={ this.onSubmit.bind(this) }/>
                <MasterChartLayout
                    type={ CHART_TYPE.COLUMN }
                    rowData={ chartRowData }
                    columnData={ columnData }
                    selectedColumns={ selectedColumns }
                />
            </div>
        );
    }

    onSubmit(selectedColumns) {
        this.setState({ show: true, selectedColumns });
    }

    addRow(row) {
        const { dispatch } = this.props;
        dispatch( addRowData({
            'text': row.text
        }) );
    }

    removeRow(keys) {
        const { dispatch } = this.props;
        dispatch( removeRowData(keys) );
    }

    editRow(rowKey, columnKey, text) {
        const { dispatch } = this.props;
        dispatch( editRowData(rowKey, columnKey, text) );
    }

    importData(d) {
        const { dispatch } = this.props;
        const keyList = this.getKeylist(d);
        dispatch( fetchColumnData(d, keyList) );
        dispatch( fetchRowData(d, keyList) );
    }

    componentWillMount() {
        const { dispatch } = this.props;
        let d = [{
        	"artist 0": "Pink Floyd",
        	"album": "The Division Bell",
        	"salesX": 80,
            "salesY": 80
        },{
        	"artist 1": "Poets Of The Fall",
        	"album": "Jealous Gods",
            "salesX": 30,
            "salesY": 30
        }, {
        	"artist 2": "Cranberries",
        	"album" : "Stars",
            "salesX": 40,
            "salesY": 40
        }, {
        	"artist 3": "Evanescence",
        	"album" : "Fallen",
            "salesX": 30,
            "salesY": 60
        }, {
        	"artist": "Nirvana",
        	"album" : "Nevermind",
            "salesX": 80,
            "salesY": 90
        }, {
        	"artist": "Metallica",
        	"album" : "Master Of Puppets",
            "salesX": 80,
            "salesY": 10
        }, {
        	"artist 0": "Indian Ocean",
        	"album" : "Kandisa",
            "salesX": 80,
            "salesY": 40
        }];

        // d = {
        // 	"artist": "Pink Floyd",
        // 	"album": "The Division Bell",
        // 	"sales": 80
        // };

        const keyList = this.getKeylist(d);
        dispatch( fetchColumnData(d, keyList) );
        dispatch( fetchRowData(d, keyList) );

    }

    getKeylist(d) {
        const keysObj = {}
        const keyCollater = el => {
            Object.keys(el).forEach(key => {
                keysObj[key] = true;
            });
        }
        if(Array.isArray(d)) {
            d.forEach(keyCollater);
        } else {
            keyCollater(d);
        }
        return Object.keys(keysObj);
    }

}

export default MasterTableLayout;
