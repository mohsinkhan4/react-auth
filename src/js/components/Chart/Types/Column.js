import React, { Component } from "react"

import * as d3 from 'd3'

class Column extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        const { type } = this.props;
        const g = d3.select(this.refs[type]);
        this.update(g);
    }

    componentDidUpdate() {
        const { type } = this.props;
        const g = d3.select(this.refs[type]);
        this.update(g);
    }

    render() {
        const { type } = this.props;
        return (
            <g ref={ type } data-chart-type={ type } className="g-bar"></g>
        );
    }

    update(g) {
        this.updateBars(g);
        this.updateLabels(g);
    }

    updateBars(g) {
        const { rowData, selectedColumns, dim } = this.props;
        const { height } = dim;
        const width = 200;

        const qc = selectedColumns.quantityColumn;
        if(!qc) return;

        const rowDataQC = rowData.map(row => (!isNaN(row[qc]) ? row[qc] : 0));
        const max = d3.max(rowDataQC)
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(rowDataQC)])
            .range([0, height]);
        const xScale = d3.scaleLinear()
            .domain([0, rowDataQC.length])
            .range([0, width * 2]);

        const rect = g
            .selectAll('rect')
            .data(rowData);

        rect.enter()
            .append('rect')
            .attr('key', row => row.key)
            .attr('x', (d, i) => xScale(i) )
            .attr('y', height)
            .attr('fill', "mediumaquamarine")
            .attr('width', 20)
            .attr('height', 0)
            .transition()
            .duration(2000)
            .attr('y', row => (height - yScale(row[qc])) )
            .attr('height', row => yScale(row[qc]) );

        rect
            .attr('key', row => row.key)
            .transition()
            .duration(2000)
            .attr('height', row => yScale(row[qc]) );

        rect.exit()
            .remove('rect');

    }

    updateLabels(g) {
        const { rowData, selectedColumns, dim } = this.props;
        const { height } = dim;
        const width = 200;

        const nc = selectedColumns.nameColumn;
        if(!nc) return;

        const evaluateText = (row, nc) => (row[nc] ? row[nc] : '');
        const yScale = d3.scaleLinear()
            .domain([0, rowData.length])
            .range([0, height]);

        const text = g
            .selectAll('text')
            .data(rowData);

        text.enter()
            .append('text')
            .attr('key', row => row.key)
            .text(row => evaluateText(row, nc))
            .attr('fill', 'black')
            .attr('x', 0)
            .attr('y', (d, i) => (yScale(i) + 15) )
            .on('mouseover', (d) => {
                console.log(d[nc]);
            });

        text
            .attr('key', row => row.key)
            .text(row => evaluateText(row, nc));

        text.exit()
            .remove('text');
    }
}

export default Column;
