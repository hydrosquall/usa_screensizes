// Based on Ben Jone's Tableau Chart
// https://public.tableau.com/profile/ben.jones#!/vizhome/ScreenResolutions/Dashboard1

import React from "react";

import { XYFrame, OrdinalFrame } from "semiotic";
import { scaleSqrt, scaleLinear } from "d3-scale";
import { max, histogram } from "d3-array";
import styled from 'tachyons-components'

import withData from "./withData";
import { getRatioColor, AXIS_COLOR } from '../formatting/colors';

import {
  CHART_WIDTH,
  CHART_HEIGHT,
  CHART_DIMS,
  CHART_MARGIN,
  X_MARGIN_CHART_DIMS,
  Y_MARGIN_CHART_DIMS,
  //
  X_NUM_TICKS,
  Y_NUM_TICKS,
} from '../formatting/sizes';

// Add brush??
const Scatterplot = props => {
  const radiusScale = scaleSqrt()
    .domain([0, max(props.data, d => d.visits)])
    .range([3, 12]);

  // Custom component because we need the radius to scale based on the data that came in.
  const Point = props => {
    return (
      <circle
        r={`${radiusScale(props.d.visits)}`}
        stroke={getRatioColor(props.d)}
        fill="none"
      />
    );
  };

  return (
    <XYFrame
      size={CHART_DIMS}
      margin={CHART_MARGIN}
      points={props.data}
      customPointMark={metadata => <Point d={metadata.d} />} // d is for point data
      xAccessor="width"
      yAccessor="height"
      axes={[
        {
          orient: "left",
          tickFormat: d => d,
          ticks: 8,
          footer: true,
          tickLineGenerator: ({ xy }) => (
            <line
              key={`line-${xy.y1}-${xy.x1}`}
              x1={xy.x1}
              x2={xy.x2}
              y1={xy.y1}
              y2={xy.y2}
              style={{
                strokeDasharray: "6 6",
                stroke: AXIS_COLOR,
                strokeOpacity: 0.3
              }}
            />
          )
        },
        {
          orient: "bottom",
          tickFormat: d => d,
          footer: true,
          ticks: 12,
          tickLineGenerator: ({ xy }) => (
            <line
              key={`line-${xy.y1}-${xy.x1}`}
              x1={xy.x1}
              x2={xy.x2}
              y1={xy.y1}
              y2={xy.y2}
              style={{
                strokeDasharray: "6 6",
                stroke: AXIS_COLOR,
                strokeOpacity: 0.3
              }}
            />
          )
        }
      ]}
    />
  );
};

const getMarginChartStyle = (d) => ({ fill: 'lightgrey', stroke: 'none' });

// TODO: stacking for margin plots... do little grouping in the bins so that the colors come out correctly.
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

  return (
    <OrdinalFrame
      size={X_MARGIN_CHART_DIMS}
      margin={{ left: CHART_MARGIN.left, bottom: 0, top: 50, right: CHART_MARGIN.right }}
      data={bins}
      projection={"vertical"}
      type={"bar"}
      oAccessor={d => d.x0} // or x1
      rAccessor={d => d.length}
      style={getMarginChartStyle}
    />
  );
};

//
const MarginPlotY = props => {
  const { data } = props;
  const yScale = scaleLinear()
    .domain([-max(props.data, d => d.height), 0]) // upside down
    .range([CHART_MARGIN.top, CHART_HEIGHT - CHART_MARGIN.bottom]);

  const makeHistogram = histogram()
    .domain(yScale.domain())
    .thresholds(yScale.ticks(Y_NUM_TICKS))
    .value(d => -d.height);
  const bins = makeHistogram(data);

  return (
    <OrdinalFrame
      size={Y_MARGIN_CHART_DIMS}
      margin={{
        left: 0,
        bottom: CHART_MARGIN.bottom,
        top: CHART_MARGIN.top,
        right: 30
      }}
      data={bins}
      projection={"horizontal"}
      type={"bar"}
      oAccessor={d => d.x0} // or x1
      rAccessor={d => d.length}
      style={getMarginChartStyle}
    />
  );
};

const ChartLegend = (props) => {
  return <div>
    Hello
  </div>
}

const ChartTextBlock= styled('div')`
  ml5
`;

const ChartTitle = styled('h1')`
  f3
`;

const CaptionText = styled('p')`
  f6 lh-copy measure-wide
`

const Chart = props => {
  return (
    <div className="compoundChart">
      <div style={{ display: "inline-block" }}>
      <MarginPlotX data={props.data} />
      </div>
      <div style={{ display: "inline-block" }}>
        <Scatterplot data={props.data} />
      </div>
      <div style={{ display: "inline-block" }}>
        <MarginPlotY data={props.data} />
      </div>
      <ChartTextBlock>
        <ChartTitle>Common Screen Resolutions of Visitors to US Federal Government Sites</ChartTitle>
        <CaptionText>
          Static version of Ben Jones's <a href="https://public.tableau.com/profile/ben.jones#!/vizhome/ScreenResolutions/Dashboard1">Tableau Project</a>. Made with <a href="https://semiotic.nteract.io">Semiotic</a>.</CaptionText>
        <ChartLegend data={props.data} style={{ display: "block" }} />
      </ChartTextBlock>
    </div>
  );
};

export default withData(Chart);
