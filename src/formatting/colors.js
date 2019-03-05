import { scaleQuantile } from "d3-scale";
import { schemeSet2 } from "d3-scale-chromatic";

const COMMON_RESOLUTIONS = new Set([
  3 / 2,
  4 / 3,
  5 / 3,
  5 / 4,
  8 / 5,
  16 / 9,
  21 / 9
]);

export const AXIS_COLOR = 'grey'

export const colorScale = scaleQuantile()
  .domain(Array.from(COMMON_RESOLUTIONS))
  .range(schemeSet2);

export const getRatioColor = point => {
  if (point.height === 0) return "#000";
  const ratio = point.width / point.height;
  if (COMMON_RESOLUTIONS.has(ratio)) return colorScale(ratio);
  return "lightgrey";
};
