import React from 'react';
import { scaleLinear } from "d3-scale";
import { XYFrame } from "semiotic";

import {COMMON_RESOLUTIONS, colorScale} from '../formatting/colors';

// Return React Component
export const getBackgroundGraphics = (data, xExtent, yExtent) => (props) => {
  const { margin , size } = props;
  const [ width, height ] = size;

  const innerHeight = height - (margin.bottom);
  const innerWidth = width - (margin.left + margin.right);

  const stylesFromResolution = (resolution) => {
    const bottomLeft = `${margin.left},${height - margin.bottom}`;
    // const bottomLeft = `0,0`;
    // x and y are flipped because of the transform
    const bandMargin = 35;
    const stripePageWidth = width;

    // const rightYIntercept = 330 * 1.49 + 0 * (innerWidth);
    // const topRight = `${rightYIntercept + bandMargin},${stripePageWidth}`;
    // const topLeft = `${stripePageWidth},${rightYIntercept - bandMargin}`;
    console.log(innerWidth);

    console.log('x',props.xScale.domain(), props.xScale.range());
    console.log('y', props.yScale.domain(), props.yScale.range());
    const topRight = `${props.xScale(2000) + margin.left},${props.yScale(2000* (1/resolution) - margin.bottom + bandMargin)}`
    // const topRight = `${props.xScale(2000)},${props.yScale(4000 / 1.49) + bandMargin}`
    // const topRight = `${stripePageWidth},${rightYIntercept + bandMargin}`;
    const topLeft = `${props.xScale(2000) + margin.left},${props.yScale(2000 * (1 / resolution) - margin.bottom -bandMargin)}`;
    // const topLeft = `${props.xScale(2000)},${props.yScale(4000 / 1.49) - bandMargin}`;
    // const topLeft = `${props.xScale(2000)},${props.yScale(4000 / 1.49) - bandMargin}`;

    // const rightYIntercept = innerWidth * resolution - innerWidth;
    // console.log(rightYIntercept, bandMargin);
    // const topRight = `${stripePageWidth},${rightYIntercept + bandMargin}`;
    // const topLeft = `${stripePageWidth},${rightYIntercept - bandMargin}`;


    const color = colorScale(resolution);
    return {
      bottomLeft,
      topLeft,
      topRight,
      color
    }
  }

  const resolutions = COMMON_RESOLUTIONS;
  console.log(props);


  // return (<XYFrame
  //   size={size}
  //   margin={margin}
  //   points={data}
  //   customPointMark={metadata => <circle fill='#000000' r={100} stroke="black"/>} // d is for point data
  //   xAccessor="width"
  //   yAccessor="height"
  // />)


  return (<g className="ratioShades">
    {resolutions.map((resolution, i) => {
      const { bottomLeft, topLeft, topRight, color} = stylesFromResolution(resolution);
      // const transform = `scale(1,-1) translate(${0},${-(height-margin.top)})`;
      const transform = ``;
      // const transform = `translate(${margin.left},${margin.top}) rotate(270) translate(${-width},${height})`;

      return <polygon
        points={`${bottomLeft} ${topLeft} ${topRight}`}
        opacity={0.4}
        fill={color}
        transform={transform}
        key={`${resolution}`}
        data={`${resolution}`}
      />
    })}
  </g>)

};
