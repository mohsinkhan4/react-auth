import React, { Component } from "react"

import * as d3 from 'd3'

const CHART_TYPE = { BAR: 'bar' };

class Bar extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        const g = d3.select(this.refs.bar);
        this.update(g);
    }

    componentDidUpdate() {
        const g = d3.select(this.refs.bar);
        this.update(g);
    }

    render() {
        return (
            <g ref="bar" className="g-bar"></g>
        );
    }

    update(g) {
        this.updateBars(g);
        this.updateLabels(g);
    }

    updateBars(g) {
        const { rowData, selectedColumns } = this.props;

        const qc = selectedColumns.quantityColumn;
        if(!qc) return;

        const max = this.getMax(rowData, qc)
        const evaluateDim = (row, qc) => (!isNaN(row[qc]) ? (row[qc]/max * 100 + '%') : 0);

        const rect = g
            .selectAll('rect')
            .data(rowData);

        rect.enter()
            .append('rect')
            .attr('x', 0)
            .attr('y', (d, i) => (i * 30))
            .attr('fill', "mediumaquamarine")
            .attr('height', 20)
            .attr('width', 0)
            .transition()
            .duration(2000)
            .attr('width', row => evaluateDim(row, qc));

        rect
            .transition()
            .duration(2000)
            .attr('width', row => evaluateDim(row, qc));

        rect.exit()
            .remove('rect');

    }

    updateLabels(g) {
        const { rowData, selectedColumns } = this.props;

        const nc = selectedColumns.nameColumn;
        if(!nc) return;

        const evaluateText = (row, nc) => (row[nc] ? row[nc] : '');

        const text = g
            .selectAll('text')
            .data(rowData);

        text.enter()
            .append('text')
            .attr('key', row => row.key)
            .text(row => evaluateText(row, nc))
            .attr('fill', 'black')
            .attr('x', 0)
            .attr('y', (d, i) => (i * 30 + 15));

        text
            .attr('key', row => row.key)
            .text(row => evaluateText(row, nc));

        text.exit()
            .remove('text');
    }

    getMax(rowData, qc) {
        const values = rowData.map(row => (!isNaN(row[qc]) ? row[qc] : 0));
        return Math.max.apply(null, values);
    }
}

export default Bar;
