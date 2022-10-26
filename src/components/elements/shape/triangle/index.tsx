import { defineComponent } from 'vue';

export default defineComponent({
  name: 'pithy-shape-triangle',
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
  },
  computed: {
    points() {
      const { width, height, strokeWidth } = this;
      const points = [
        `${width / 2},${strokeWidth}`,
        `${strokeWidth},${height - strokeWidth / 2}`,
        `${width - strokeWidth},${height - strokeWidth / 2}`,
      ];
      return points.join(' ');
    },
  },
  render() {
    const { width, height, fill, strokeWidth, stroke, points } = this;
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
          <polygon points={points}></polygon>
        </g>
      </svg>
    );
  },
});
