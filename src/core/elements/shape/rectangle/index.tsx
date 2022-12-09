import { defineComponent } from 'vue';

export default defineComponent({
  name: 'pithy-shape-rectangle',
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    fill: {
      type: String,
      default: 'rgba(0, 0, 0, 0)',
    },
    stroke: {
      type: String,
    },
    strokeWidth: {
      type: Number,
      default: 0,
    },
    radius: {
      type: Number,
      default: 0,
    },
  },
  render() {
    const { width, height, fill, strokeWidth, stroke, radius } = this;
    return (
      <svg
        width={width}
        height={height}
        fill={fill}
        viewBox={`0 0 ${width} ${height}`}
        version="2.0"
        xmlns="http://www.w3.org/2000/svg"
        stroke-width={strokeWidth}
        stroke={stroke}
      >
        <g class="clickable">
          <rect
            x={strokeWidth / 2}
            y={strokeWidth / 2}
            width={width - strokeWidth}
            height={height - strokeWidth}
            rx={`${radius}%`}
          ></rect>
        </g>
      </svg>
    );
  },
});
