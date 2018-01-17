import React, { Component } from "react"

import Chart from './Chart/Chart'

class MasterChartLayout extends Component {

    constructor() {
        super();
    }

    render() {
        const { type, rowData, columnData, selectedColumns } = this.props;

        return (
            <div className="container">
                <div className="well row">
                    <div className="col-lg-3">
                        <ul className="configSvg">
                            <li> --Render Configs-- </li>
                        </ul>
                    </div>
                    <div className="col-lg-9">
                        <Chart
                            type={ type }
                            rowData={ rowData }
                            columnData={ columnData }
                            selectedColumns={ selectedColumns }
                        />
                    </div>
                </div>
            </div>
        );
    }

}

export default MasterChartLayout;
