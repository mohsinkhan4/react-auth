import React, { Component } from "react"

import * as d3 from 'd3'
import Bar from './Types/Bar'
import Column from './Types/Column'

const CHART_TYPE = { BAR: 'bar', COLUMN: 'column' };

class Chart extends Component {

    constructor() {
        super();
    }

    render() {
        const { type, rowData, columnData, selectedColumns } = this.props;
        const dim = { height: 600, width: 800 };

        const chartTypes = [
            {
                'type': CHART_TYPE.BAR,
                'template': Bar
            },
            {
                'type': CHART_TYPE.COLUMN,
                'template': Column
            }
        ];

        const chartType = chartTypes.find(d => (d.type === type));
        const Chart = chartType.template;

        return (
            <svg
                className="d3 chart"
                viewBox="0 0 800 600"
                preserveAspectRatio="xMinYMin meet"
                style={{ 'width': dim.width, 'height': dim.height }}>
                    <Chart
                        type={ chartType.type }
                        dim={ dim }
                        columnData={ columnData }
                        rowData={ rowData }
                        selectedColumns={ selectedColumns }
                    />
            </svg>
        );
    }

}

export default Chart;
