// Based on Ben Jone's Tableau Chart
// https://public.tableau.com/profile/ben.jones#!/vizhome/ScreenResolutions/Dashboard1

import React from "react";

import { XYFrame, OrdinalFrame } from "semiotic";
import { scaleSqrt, scaleLinear } from "d3-scale";
import { max, histogram } from "d3-array";
import styled from "tachyons-components";
import { useD3 } from "d3blackbox";
import { select } from "d3-selection";
import { symbol, symbolCircle } from "d3-shape";
import { legendColor } from "d3-svg-legend";
import { timeFormat } from "d3-time-format";
import { compactInteger } from "humanize-plus";

import withData from "./withData";
import {
  getRatioColor,
  AXIS_COLOR,
  colorScale,
  POINT_FILL_COLOR,
  COMMON_RESOLUTIONS,
  COMMON_RESOLUTION_LABELS
} from "../formatting/colors";
import { annotations } from "../annotations";

import {
  CHART_WIDTH,
  CHART_HEIGHT,
  CHART_DIMS,
  CHART_MARGIN,
  X_MARGIN_CHART_DIMS,
  Y_MARGIN_CHART_DIMS,
  //
  X_NUM_TICKS,
  Y_NUM_TICKS
} from "../formatting/sizes";

const MAX_X_EXTENT = 3900;
const MAX_Y_EXTENT = 3100;

const formatDate = timeFormat("%Y-%m-%d"); // 2019-01-28

const scatterTooltip = d => {
  return (
    <div className="tooltip-content">
      <p>
        ({d.width}x{d.height}) | {compactInteger(d.visits)} Visits
      </p>
    </div>
  );
};

// Add brush??
const Scatterplot = props => {
  const radiusScale = scaleSqrt()
    .domain([0, max(props.data, d => d.visits)])
    .range([2, 10]);

  // Custom component because we need the radius to scale based on the data attributes
  const Point = props => {
    return (
      <circle
        r={`${radiusScale(props.d.visits)}`}
        stroke={getRatioColor(props.d)}
        strokeWidth={1.5}
        fill={POINT_FILL_COLOR}
        opacity={0.4}
      />
    );
  };

  const bandWidth = 50;
  const bound = 4000;
  const summaries = COMMON_RESOLUTIONS.map(resolution => ({
    color: colorScale(resolution),
    coordinates: [
      { width: 0, height: 0 },
      { width: bound, height: bound * (1 / resolution) + bandWidth },
      { width: bound, height: bound * (1 / resolution) - bandWidth }
    ]
  }));

  return (
    <XYFrame
      matte={true}
      size={CHART_DIMS}
      margin={CHART_MARGIN}
      points={props.data}
      customPointMark={metadata => <Point d={metadata.d} />} // d is for point data
      xAccessor="width"
      yAccessor="height"
      xExtent={[0, MAX_X_EXTENT]}
      yExtent={[0, MAX_Y_EXTENT]}
      annotations={annotations}
      hoverAnnotation={true}
      tooltipContent={scatterTooltip}
      summaries={summaries}
      summaryStyle={d => ({ fill: d.color, opacity: 0.35 })}
      axes={[
        {
          orient: "left",
          tickFormat: d => d,
          ticks: 8,
          footer: true,
          label: {
            name: "height (pixels)",
            locationDistance: 50
          },
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
          label: {
            name: "width (pixels)",
            locationDistance: 50
          },
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

const getMarginChartStyle = d => ({ fill: "lightgrey", stroke: "none" });

const MarginPlotX = props => {
  const { data } = props;
  const xScale = scaleLinear()
    .domain([0, max(props.data, d => d.width)])
    .range([CHART_MARGIN.left, CHART_WIDTH - CHART_MARGIN.right]);

  const makeHistogram = histogram()
    .domain([0, MAX_X_EXTENT])
    .thresholds(xScale.ticks(X_NUM_TICKS))
    .value(d => d.width);
  const bins = makeHistogram(data);

  return (
    <OrdinalFrame
      size={X_MARGIN_CHART_DIMS}
      margin={{
        left: CHART_MARGIN.left,
        bottom: 0,
        top: 50,
        right: CHART_MARGIN.right
      }}
      data={bins}
      projection={"vertical"}
      type={"bar"}
      oAccessor={d => d.x0} // or x1
      rAccessor={d => d.length}
      style={getMarginChartStyle}
    />
  );
};

const MarginPlotY = props => {
  const { data } = props;
  const yScale = scaleLinear()
    .domain([-max(props.data, d => d.height), 0]) // upside down
    .range([CHART_MARGIN.top, CHART_HEIGHT - CHART_MARGIN.bottom]);

  const makeHistogram = histogram()
    .domain([-MAX_Y_EXTENT, 0])
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

function withLegend(anchor) {
  const svg = select(anchor);
  svg
    .append("g")
    .attr("class", "legendOrdinal")
    .attr("transform", "translate(20,20)");

  const legendOrdinal = legendColor()
    .title("Aspect Ratios")
    .shapeWidth(30)
    .shape(
      "path",
      symbol()
        .type(symbolCircle)
        .size(150)()
    )
    .shapePadding(40)
    .labels(COMMON_RESOLUTION_LABELS)
    .orient("horizontal")
    .scale(colorScale);

  svg.select(".legendOrdinal").call(legendOrdinal);
}

const ChartLegend = props => {
  const refAnchor = useD3(anchor => withLegend(anchor));
  return (
    <svg height={100} width={500}>
      <g ref={refAnchor} transform={`translate(${0},${20})`} />
    </svg>
  );
};

const ChartTextBlock = styled("div")`
  ml5
`;

const ChartTitle = styled("h1")`
  f3
`;

const CaptionText = styled("p")`
  f6 lh-copy
`;

const Chart = ({ data, timeExtent }) => {
  const timeString = `${timeExtent
    .map(time => formatDate(time))
    .join(" and ")}`;

  const charts = (
    <React.Fragment>
      <div style={{ display: "inline-block" }}>
        <MarginPlotX data={data} />
      </div>
      <div style={{ display: "inline-block" }}>
        <Scatterplot data={data} />
      </div>
      <div style={{ display: "inline-block" }}>
        <MarginPlotY data={data} />
      </div>
    </React.Fragment>
  );

  return (
    <div className="compoundChart">
      <ChartTextBlock>
        <ChartTitle>
          Screen Resolutions of Visitors to US Federal Government Sites
        </ChartTitle>
        <CaptionText>
          A{" "}
          <a
            href="https://semiotic.nteract.io"
            rel="noopener noreferrer"
            target="_blank"
          >
            Semiotic
          </a>{" "}
          remake of Ben Jones's{" "}
          <a
            href="https://public.tableau.com/profile/ben.jones#!/vizhome/ScreenResolutions/Dashboard1"
            rel="noopener noreferrer"
            target="_blank"
          >
            Tableau Project
          </a>
          , by Cameron Yick.
        </CaptionText>
      </ChartTextBlock>

      <div className="appBody">
        {data.length > 0 ? (
          charts
        ) : (
          <ChartTextBlock>
            <CaptionText>Data is on its way!</CaptionText>
          </ChartTextBlock>
        )}
      </div>

      <ChartTextBlock>
        <ChartLegend />
      </ChartTextBlock>
      <ChartTextBlock>
        <CaptionText>
          Data updates daily from{" "}
          <a
            href="https://analytics.usa.gov/"
            rel="noopener noreferrer"
            target="_blank"
          >
            analytics.gov.usa
          </a>
          . Point areas correspond to total visits between {timeString}.
        </CaptionText>
        <CaptionText>
          Read about how this graphic was made
          <a
            href="https://www.serendipidata.com/posts/margin-charts-with-semiotic"
            rel="noopener noreferrer"
            target="_blank"
          >
            in this blog post.
          </a>
        </CaptionText>
      </ChartTextBlock>
    </div>
  );
};

export default withData(Chart);
