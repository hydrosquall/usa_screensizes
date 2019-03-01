import React from "react";

import { XYFrame } from "semiotic";
import withData from './withData';

import { scaleSqrt } from 'd3-scale';
import { extent, max } from 'd3-array';


const Scatterplot = props => {
  const radiusScale = scaleSqrt()
                    .domain([0, max(props.data, d => d.visits)])
                    .range([3, 12]);

  const Point = (props) => {
    return <circle
      r={`${radiusScale(props.visits)}`}
    />
  }

  return <XYFrame
    size={[800, 600]}
    margin={{ left: 60, bottom: 60, top: 30, right: 30 }}
    points={props.data}
    customPointMark={metadata => <Point visits={metadata.d.visits}/>}
    xAccessor="width"
    yAccessor="height"
  />;
};


const MarginPlotX = props => {
  return <div>Along the Top</div>;
};

//
const MarginPlotY = props => {
  return <div>Along the side</div>;
};


const Chart = props => {
  console.log(props.data);
  return (
    <div>
      <Scatterplot data={props.data}/>
      <MarginPlotY />
      <MarginPlotX />
    </div>
  );
};



export default withData(Chart);
