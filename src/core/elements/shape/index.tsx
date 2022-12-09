import { IEShape } from '@/core';
import { defineComponent, PropType } from 'vue';
import DiamondShape from './diamond';
import EllipseShape from './ellipse';
import RectangleShape from './rectangle';
import TriangleShape from './triangle';
import LineShape from './line';
import ArrowShape from './arrow';
import './index.scss';

export default defineComponent({
  name: 'pithy-element-shape',
  props: {
    data: {
      type: Object as PropType<IEShape>,
      required: true,
    },
  },
  methods: {
    renderShape() {
      const { payload, width, height, id } = this.data;
      switch (payload.appearance) {
        case 'diamond':
          return <DiamondShape width={width} height={height} {...payload} />;
        case 'ellipse':
          return <EllipseShape width={width} height={height} {...payload} />;
        case 'rectangle':
          return <RectangleShape width={width} height={height} {...payload} />;
        case 'triangle':
          return <TriangleShape width={width} height={height} {...payload} />;
        case 'line':
          return <LineShape width={width} elId={id} {...payload} />;
        case 'arrow':
          return <ArrowShape width={width} markerId={id} {...payload} />;
        default:
          return null;
      }
    },
  },

  render() {
    return <div class="pithy-element-shape">{this.renderShape()}</div>;
  },
});
