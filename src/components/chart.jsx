import React from "react";

import { XYFrame, OrdinalFrame } from "semiotic";
import withData from "./withData";

import { scaleSqrt, scaleLinear } from "d3-scale";
import {  max, histogram } from "d3-array";

const CHART_WIDTH = 1000;
const CHART_HEIGHT = 700;
const CHART_MARGIN = { left: 60, bottom: 60, top: 50, right: 30 };
const CHART_DIMS = [CHART_WIDTH, CHART_HEIGHT];

const X_MARGIN_CHART_HEIGHT = 200;
const X_MARGIN_CHART_DIMS = [CHART_WIDTH, X_MARGIN_CHART_HEIGHT];
const X_NUM_TICKS = 40;

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
  const { data } = props;
  const xScale = scaleLinear()
    .domain([0, max(props.data, d => d.width)])
    .range([CHART_MARGIN.left, CHART_WIDTH - CHART_MARGIN.right]);

  const makeHistogram = histogram()
                          .domain(xScale.domain())
                          .thresholds(xScale.ticks(X_NUM_TICKS))
                          .value(d => d.width);

  const bins = makeHistogram(data);

  console.log(bins);

  return <OrdinalFrame
    size={X_MARGIN_CHART_DIMS}
    margin={{ left: 60, bottom: 10, top: 50, right: 30 }}
    data={bins}
    projection={'vertical'}
    type={'bar'}
    oAccessor={d => d.x0} // or x1
    rAccessor={d => d.length}
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
      <MarginPlotX data={props.data} />
      <Scatterplot data={props.data} />

      <MarginPlotY data={props.data} />
    </div>
  );
};

export default withData(Chart);