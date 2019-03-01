// Data Fetching
// TODO: rewrite with a react hook
import React, { Component } from "react";
import { csv } from "d3-fetch";
import { timeParse } from "d3-time-format";
import { rollup, sum } from "d3-array";

import { from } from "rxjs";
import {
  map,
  toArray,
  flatMap,
  filter,
  take,

} from "rxjs/operators";

const DATA_URL = "https://analytics.usa.gov/data/live/screen-size.csv";
const NUM_POINTS = 9000;

// TODO: add date filter someday with // date: parseDate(row.date),
// const parseDate = timeParse("%Y-%m-%d"); // 2019-01-28
// Assign correct datatypes
const parseRows = rows => {
  return from(rows).pipe(
    filter(row => row.date !== "(other)"),
    toArray(),
    flatMap(filtered => {
      return Array.from(
        rollup(
          filtered,
          group => sum(group, d => d.visits), // reducer
          d => d.screen_resolution            // key function
        )
      );
    }),
    map(row => {
      const [screen_resolution, visits] = row;
      const [width, height] = screen_resolution.split("x"); // 1200 x 1920
      return {
        visits: visits,
        width: +width,
        height: +height
      };
    }),
    take(NUM_POINTS) // limit num dims that get charted at once
  );
};

const withData = WrappedComponent => {
  class ChartContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: []
      };
    }

    componentDidMount() {
      this.subscription$ = from(csv(DATA_URL))
        .pipe(
          flatMap(parseRows),
          toArray() // gather rows back into into a single array
        )
        .subscribe(parsed => {
          this.setState({
            data: parsed
          });
        });
    }

    render() {
      return <WrappedComponent data={this.state.data} />;
    }
  }
  return ChartContainer;
};

export default withData;
