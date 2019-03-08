
import { AnnotationLabel, AnnotationBracket } from 'react-annotation';
import { colorScale } from './formatting/colors';

const aspectRatioAnnotations = [
  {
    type: AnnotationLabel,
    height: 3304,
    width: 4070,
    // editMode: true,
    note: {
      label: 'Aspect Ratio',
      wrap: 30,
    },
  },
  {
    type: AnnotationLabel,
    height: 3300,
    width: 3850,
    dx: 0,
    dy: 0,
    // editMode: true,
    note: {
      label: '5:4',
      labelColor: colorScale(5 / 4),
    },
  },
  {
    type: AnnotationLabel,
    height: 3025,
    width: 4010,
    dx: 0,
    dy: 0,
    note: {
      label: '4:3',
      labelColor: colorScale(4 / 3),
    },
  },
  {
    type: AnnotationLabel,
    height: 2700,
    width: 4010,
    dx: 0,
    dy: 0,
    note: {
      label: '3:2',
      labelColor: colorScale(3 / 2),
    },
  },
  {
    type: AnnotationLabel,
    height: 2545,
    width: 4010,
    dx: 0,
    dy: 0,
    note: {
      label: '8:5',
      labelColor: colorScale(8 / 5),
    },
  },
  {
    type: AnnotationLabel,
    height: 2440,
    width: 4010,
    dx: 0,
    dy: 0,
    note: {
      label: '5:3',
      labelColor: colorScale(5 / 3),
    },
  },
  {
    type: AnnotationLabel,
    height: 2280,
    width: 4010,
    dx: 0,
    dy: 0,
    note: {
      label: '16:9',
      labelColor: colorScale(16 / 9),
    },
  },
  {
    type: AnnotationLabel,
    height: 1750,
    width: 4010,
    dx: 0,
    dy: 0,
    note: {
      label: '21:9',
      labelColor: colorScale(21 / 9),
    },
  },
]

export const scatterAnnotations = [
  {
    type: AnnotationLabel,
    title: 'Laptops',
    note: {
      title: 'Laptops',
      label: "1920x1080 1366x768",
      align: 'left'
    },
    height: 1080,
    width: 1920,
    dx: 39,
    dy: 41,
    // editMode:true
  },
  {
    type: AnnotationLabel,
    label: "",
    width: 1366,
    height: 768,
    dx: 135,
    dy: 20,
  },
  {
    type: AnnotationLabel,
    note: {
      title: 'Tablets',
      label: "Portrait (768x1024) Landscape (1024x768)",
      wrap: 160,
    },
    width: 768,
    height: 1024,
    dx: 167,
    dy: -91,
  },
  {
    type: AnnotationLabel,
    height: 768,
    width: 1024,
    dx: 116,
    dy: -134,
  },
  // AnnotationBracket
  {
    type: AnnotationBracket,
    height: 1000,
    width: 280,
    dx: 0,
    dy: 0,
    // align: 'center',
    subject:{
      "width": 50,
      "type": "curly",
      depth: -20,
    },
    note: {
      title: 'Cellphones'
    },
  },
  // Place by hand

]

export const annotations = [
  ...scatterAnnotations,
  ...aspectRatioAnnotations,
];
