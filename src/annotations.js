
import { AnnotationLabel, AnnotationBracket } from 'react-annotation';

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
]
