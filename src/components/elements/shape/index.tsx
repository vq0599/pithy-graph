import { IEShape } from '@/structs/elements/shape';
import { defineComponent, PropType } from 'vue';
import DiamondShape from './diamond';
import EllipseShape from './ellipse';
import RectangleShape from './rectangle';
import TriangleShape from './triangle';
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
      const { payload, width, height } = this.data;
      switch (payload.appearance) {
        case 'diamond':
          return <DiamondShape width={width} height={height} {...payload} />;
        case 'ellipse':
          return <EllipseShape width={width} height={height} {...payload} />;
        case 'rectangle':
          return <RectangleShape width={width} height={height} {...payload} />;
        case 'triangle':
          return <TriangleShape width={width} height={height} {...payload} />;
        default:
          return null;
      }
    },
  },

  render() {
    return <div class="pithy-element-shape">{this.renderShape()}</div>;
  },
});
