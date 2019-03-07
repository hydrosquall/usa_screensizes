import { scaleOrdinal } from "d3-scale";
import { schemeSet2 } from "d3-scale-chromatic";

export const COMMON_RESOLUTIONS = [
  3 / 2,
  4 / 3,
  5 / 3,
  5 / 4,
  8 / 5,
  16 / 9,
  21 / 9
];

const COMMON_RESOLUTIONS_SET = new Set(COMMON_RESOLUTIONS);

export const AXIS_COLOR = 'grey'
export const POINT_FILL_COLOR = 'rgb(64, 54, 74)';

export const colorScale = scaleOrdinal()
  .domain(COMMON_RESOLUTIONS)
  .range(schemeSet2);

window.colorScale = colorScale;

export const getRatioColor = point => {
  if (point.height === 0) return "#000";
  const ratio = point.width / point.height;
  if (COMMON_RESOLUTIONS_SET.has(ratio)) return colorScale(ratio);
  return POINT_FILL_COLOR;
};
