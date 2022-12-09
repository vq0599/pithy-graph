import { useRecordRect } from '@/core/hooks';
import { computed, defineComponent } from 'vue';

// 定义箭头的比例
const markerWidth = 5;
const markerHeight = 6;

export default defineComponent({
  name: 'pithy-shape-arrow',
  inheritAttrs: false,
  props: {
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
    markerId: {
      type: Number,
      required: true,
    },
    double: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    // 箭头高，也是整个shape的高
    const height = computed(() => props.strokeWidth * markerHeight);
    // 箭头宽
    const arrowWidth = computed(() => props.strokeWidth * markerWidth);
    // 线的长度
    const lineLength = computed(() => props.width - arrowWidth.value);
    const id = computed(() => `triangle-${props.markerId}`);
    useRecordRect(props.markerId, () => props.strokeWidth);

    return {
      height,
      arrowWidth,
      lineLength,
      id,
    };
  },
  methods: {
    renderArrayMarker() {
      return (
        <marker
          id={this.id}
          refX="0"
          refY={markerHeight / 2}
          markerWidth={markerWidth}
          markerHeight={markerHeight}
          stroke="none"
          orient="auto-start-reverse"
          fill={this.stroke}
        >
          <path
            d={`M 0,0 L 0,${markerHeight} L ${markerWidth},${
              markerHeight / 2
            } z`}
          ></path>
        </marker>
      );
    },
  },
  render() {
    const {
      width,
      height,
      lineLength,
      strokeWidth,
      stroke,
      arrowWidth,
      id,
      double,
    } = this;
    return (
      <svg
        width={width}
        height={height}
        version="2.0"
        viewBox={`0 0 ${width} ${height}`}
        ref="root"
      >
        <g>
          <defs>{this.renderArrayMarker()}</defs>
          <line
            x1={double ? arrowWidth : 0}
            y1={height / 2}
            x2={lineLength}
            y2={height / 2}
            marker-end={`url(#${id})`}
            marker-start={double ? `url(#${id})` : undefined}
            stroke-width={strokeWidth}
            stroke={stroke}
          ></line>
        </g>
      </svg>
    );
  },
});
