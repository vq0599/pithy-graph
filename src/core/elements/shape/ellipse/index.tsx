import { defineComponent } from 'vue';

export default defineComponent({
  name: 'pithy-shape-ellipse',
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
  render() {
    const { width, height, fill, strokeWidth, stroke } = this;
    // const half = strokeWidth / 2;
    // const points = [
    //   `${strokeWidth},${strokeWidth}`,
    //   `${width - strokeWidth},${strokeWidth}`,
    //   `${width - strokeWidth},${height - strokeWidth}`,
    //   `${strokeWidth},${height - strokeWidth}`,
    // ];

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
          <ellipse cx={width / 2} cy={ height / 2 } rx={ width / 2 - strokeWidth / 2 } ry={ height / 2 - strokeWidth / 2 }></ellipse>
        </g>
      </svg>
    );
  },
});
