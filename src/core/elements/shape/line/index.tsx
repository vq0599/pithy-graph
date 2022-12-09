import { useRecordRect } from '@/core/hooks';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'pithy-shape-line',
  inheritAttrs: false,
  props: {
    elId: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    stroke: {
      type: String,
    },
    strokeWidth: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    useRecordRect(props.elId, () => props.strokeWidth);
  },
  render() {
    const { width, strokeWidth, stroke } = this;
    const centerY = strokeWidth / 2;
    return (
      <svg
        width={width}
        height={strokeWidth}
        viewBox={`0 0 ${width} ${strokeWidth}`}
        version="2.0"
        ref="root"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0"
          y1={centerY}
          x2={width}
          y2={centerY}
          stroke-width={strokeWidth}
          stroke={stroke}
        />
      </svg>
    );
  },
});
