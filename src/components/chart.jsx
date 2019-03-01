import React from "react";

import { XYFrame } from "semiotic";
import withData from "./withData";

import { scaleSqrt } from "d3-scale";
import { extent, max } from "d3-array";

const CHART_WIDTH = 1000;
const CHART_HEIGHT = 700;
const CHART_MARGIN = { left: 60, bottom: 60, top: 50, right: 30 };
const CHART_DIMS = [CHART_WIDTH, CHART_HEIGHT];

const X_MARGIN_CHART_HEIGHT = 300;
const X_MARGIN_CHART_DIMS = [CHART_WIDTH, X_MARGIN_CHART_HEIGHT];

const Y_MARGIN_CHART_WIDTH = 300;
const Y_MARGIN_CHART_DIMS = [Y_MARGIN_CHART_WIDTH, CHART_HEIGHT];

const Scatterplot = props => {
  const radiusScale = scaleSqrt()
    .domain([0, max(props.data, d => d.visits)])
    .range([3, 9]);

  // Custom component because we need the radius to scale based on the data that came in.
  const Point = props => {
    return <circle r={`${radiusScale(props.visits)}`} />;
  };

  return (
    <XYFrame
      size={CHART_DIMS}
      margin={CHART_MARGIN}
      points={props.data}
      customPointMark={metadata => <Point visits={metadata.d.visits} />}
      xAccessor="width"
      yAccessor="height"
    />
  );
};

const MarginPlotX = props => {
  return <XYFrame
    size={X_MARGIN_CHART_DIMS}
    margin={{ left: 60, bottom: 60, top: 50, right: 30 }}
    points={props.data}
    xAccessor="width"
    yAccessor="height"
  />;
};

//
const MarginPlotY = props => {
  return <XYFrame
    size={Y_MARGIN_CHART_DIMS}
    margin={{ left: 60, bottom: 60, top: 50, right: 30 }}
    points={props.data}
    xAccessor="width"
    yAccessor="height"
  />;;
};

const Chart = props => {
  return (
    <div>
      <Scatterplot data={props.data} />
      <MarginPlotX data={props.data} />
      <MarginPlotY data={props.data} />
    </div>
  );
};

export default withData(Chart);
