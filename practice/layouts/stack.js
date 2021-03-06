/*
this dataset must be rearranged!

let dataset = [
  { apples: 5, oranges: 10, grapes: 22 },
  { apples: 4, oranges: 12, grapes: 28 },
  { apples: 2, oranges: 19, grapes: 32 },
  { apples: 7, oranges: 23, grapes: 35 },
  { apples: 23, oranges: 17, grapes: 43 },
];

*/

// width and height
let w = 500;
let h = 300;

let dataset = [
  [
    { x: 0, y: 5 },
    { x: 1, y: 4 },
    { x: 2, y: 2 },
    { x: 3, y: 7 },
    { x: 4, y: 23 },
  ],
  [
    { x: 0, y: 10 },
    { x: 1, y: 12 },
    { x: 2, y: 19 },
    { x: 3, y: 23 },
    { x: 4, y: 17 },
  ],
  [
    { x: 0, y: 22 },
    { x: 1, y: 28 },
    { x: 2, y: 32 },
    { x: 3, y: 35 },
    { x: 4, y: 43 },
  ],
];

// set up stack method
let stack = d3.layout.stack();

// data, stacked
stack(dataset);

// set up scales
let xScale = d3.scale
  .ordinal()
  .domain(d3.range(dataset[0].length))
  .rangeRoundBands([0, w], 0.05);

let yScale = d3.scale
  .linear()
  .domain([
    0,
    d3.max(dataset, function (d) {
      return d3.max(d, function (d) {
        return d.y0 + d.y;
      });
    }),
  ])
  .range([0, h]);

// easy colors accessible via a 10-step ordinal scale
let colors = d3.scale.category10();

// create SVG element
let svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

// add a group for each row of data
let groups = svg
  .selectAll("g")
  .data(dataset)
  .enter()
  .append("g")
  .style("fill", function (d, i) {
    return colors(i);
  });

// add a rect for each data value
let rects = groups
  .selectAll("rect")
  .data(function (d) {
    return d;
  })
  .enter()
  .append("rect")
  .attr("x", function (d, i) {
    return xScale(i);
  })
  .attr("y", function (d) {
    return yScale(d.y0);
  })
  .attr("height", function (d) {
    return yScale(d.y);
  })
  .attr("width", xScale.rangeBand());
