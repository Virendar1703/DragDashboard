import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './ChartWidget.css';

const ChartWidget = ({ type, width, height }) => {
  const chartRef = useRef();

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.attr('width', width).attr('height', height).style('overflow', 'visible');
    svg.selectAll('*').remove(); // Clear previous render

    const data = [30, 80, 45, 60, 20, 90, 30];

    if (type === 'bar') {
      svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * (width / data.length))
        .attr('y', d => height - d * 2)
        .attr('width', (width / data.length) - 5)
        .attr('height', d => d * 2)
        .attr('fill', '#007bff');
    } else if (type === 'line') {
      const line = d3.line()
        .x((d, i) => i * (width / data.length))
        .y(d => height - d * 2)
        .curve(d3.curveMonotoneX);

      svg.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', line)
        .attr('fill', 'none')
        .attr('stroke', '#28a745')
        .attr('stroke-width', 2);
    }
  }, [type, width, height]);  // Trigger re-render on width/height change

  return <svg ref={chartRef}></svg>;
};

export default ChartWidget;
