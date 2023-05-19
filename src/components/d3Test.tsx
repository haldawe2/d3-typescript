import React, { useEffect, useRef, useState } from "react";
const d3 = require('d3');

function D3Test() {

  const [testData, setTestData] = useState<number[]>([30, 50, 70, 10, 40]);
  const svgRef = useRef(null);

  useEffect(() => {
    // set up svg
    const w : number = 400;
    const h: number = 100;
    const svg = d3.select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('background', '#d3d3d3')
      .style('margin-top', '50')
      .style('overflow', 'visible')
      .style('margin-left', '100')

    // set up scale
    const xScale = d3.scaleLinear()
      .domain([0, 4])
      .range([0, w]);
    const yScale = d3.scaleLinear()
      .domain([0, h])
      .range([h, 0]);
    const generateScaledLine = d3.line()
      .x((d: number, i: number) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal);

    // set up axis 
    const xAxis = d3.axisBottom(xScale)
      .ticks(testData.length)
      .tickFormat((i: number) => i + 1);
    const yAxis = d3.axisLeft(yScale)
      .ticks(5);
    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${h})`);
    svg.append('g')
      .call(yAxis)

    // set up data
    svg.selectAll('.line')
      .data([testData])
      .join('path')
        .attr('d', (d: any) => generateScaledLine(d))
        .attr('fill', 'none')
        .attr('stroke', 'black')
  }, [testData]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default D3Test;
