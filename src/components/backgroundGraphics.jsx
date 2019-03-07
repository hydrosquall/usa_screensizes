import React from 'react';

import {COMMON_RESOLUTIONS, colorScale} from '../formatting/colors';

// Add some range bands...
export const BackgroundGraphics = (props) => {
  const { margin , size } = props;
  const [ width, height ] = size;

  // const getArea = area()
  //                   .x0(margin.left)
  //                   .x1(width - margin.right)
  //                   .y0(10)
  //                   .y1(50);

  const innerHeight = height - (margin.bottom);
  const innerWidth = width - (margin.left + margin.right);

  // console.log(innerWidth/ innerHeight);
  // console.log({ size, width, height})


  const stylesFromResolution = (resolution) => {
    const bottomLeft = `${margin.left},${margin.top}`;
    // x and y are flipped because of the transform
    const bandMargin =  30;

    const stripePageWidth = width;

    const rightYIntercept = 330 + resolution * (innerWidth);

    const topRight = `${rightYIntercept + bandMargin},${stripePageWidth}`;
    const topLeft = `${rightYIntercept - bandMargin},${stripePageWidth}`;
    const color = colorScale(resolution);
    return {
      bottomLeft,
      topLeft,
      topRight,
      color
    }
  }

  const resolutions = COMMON_RESOLUTIONS;
  return (<g >
    {/* <rect x={margin.left}
          y={innerHeight}
          height={rectHeight}
          width="50"
          fill="red"/> */}
    {resolutions.map((resolution, i) => {
      const {bottomLeft, topLeft, topRight, color} = stylesFromResolution(resolution);
      const transform = `scale(1,-1) translate(${0},${-(height-margin.top)})`;

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
