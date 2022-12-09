import { defineComponent } from 'vue';
import './index.scss';

export default defineComponent({
  name: 'not-found',
  data() {
    return {
      // arrowHeight: 8,
      width: 400,
      strokeWidth: 8,
      // width: 200,
      // height: 20,
    };
  },
  mounted() {
    // const a = document.getElementById('keke');
    // console.dir(a);
    // console.log(a?.clientWidth, a?.clientHeight);
  },

  methods: {
    renderArrow() {
      const markerWidth = 5;
      const markerHeight = 6;
      const lineLength = this.width - markerWidth * this.strokeWidth;
      const height = markerHeight * this.strokeWidth;
      const { width } = this;
      return (
        <svg
          width={`${width}`}
          height={`${height}`}
          version="2.0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${width} ${height}`}
        >
          <g>
            <defs>
              <marker
                id="triangle"
                refX="0"
                refY={markerHeight / 2}
                // 这个的height/width会实际渲染会乘以line的stroke-width
                markerWidth={markerWidth}
                markerHeight={markerHeight}
                stroke="none"
                // origin="auto"
                orient="auto-start-reverse"
                fill="green"
              >
                <path
                  d={`M 0,0 L 0,${markerHeight} L ${markerWidth},${
                    markerHeight / 2
                  } z`}
                ></path>
              </marker>
            </defs>
            <line
              x1="0"
              y1={height / 2}
              x2={lineLength}
              y2={height / 2}
              marker-end="url(#triangle)"
              // marker-start="url(#triangle)"
              stroke-width={this.strokeWidth}
              stroke="red"
            ></line>
          </g>
        </svg>
      );
    },
    renderDoubleArrow() {
      const markerWidth = 5;
      const markerHeight = 6;
      const arrowWidth = markerWidth * this.strokeWidth;
      const lineLength = this.width - arrowWidth;
      const height = markerHeight * this.strokeWidth;
      const { width } = this;
      return (
        <svg
          width={`${width}`}
          height={`${height}`}
          version="2.0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${width} ${height}`}
        >
          <g>
            <defs>
              <marker
                id="triangle"
                refX="0"
                refY={markerHeight / 2}
                // 这个的height/width会实际渲染会乘以line的stroke-width
                markerWidth={markerWidth}
                markerHeight={markerHeight}
                stroke="none"
                // origin="auto"
                orient="auto-start-reverse"
                fill="green"
              >
                <path
                  d={`M 0,0 L 0,${markerHeight} L ${markerWidth},${
                    markerHeight / 2
                  } z`}
                ></path>
              </marker>
            </defs>
            <line
              x1={arrowWidth}
              y1={height / 2}
              x2={lineLength}
              y2={height / 2}
              marker-end="url(#triangle)"
              marker-start="url(#triangle)"
              stroke-width={this.strokeWidth}
              stroke="red"
            ></line>
          </g>
        </svg>
      );
    },
  },
  render() {
    return (
      <div class="keke-container">
        {this.renderArrow()}
        <hr />
        {this.renderDoubleArrow()}
        <hr />
        <svg
          width="600"
          height="50"
          viewBox="0 0 600 50"
          version="2.0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0"
            y1="10"
            x2="600"
            y2="10"
            stroke-width="20"
            stroke="rgba(191,22,122,1)"
          ></line>
        </svg>
      </div>
    );
  },
});
