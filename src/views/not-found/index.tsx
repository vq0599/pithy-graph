import { defineComponent } from 'vue';

export default defineComponent({
  name: 'not-found',
  data() {
    return {
      arrowHeight: 8,
      arrowWidth: 8,
      width: 200,
      height: 20,
    };
  },
  render() {
    return (
      <div>
        <svg
          width="400px"
          height="8px"
          version="2.0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 8"
          // class="shape-block-svg"
          style="overflow: visible; stroke: rgb(21, 21, 21);"
        >
          <g>
            <g>
              <defs>
                <marker
                  id="0b7eab73-0227-497a-9a3b-b5d3d8e98065"
                  // class="fill-with-stroke-color"
                  refX="0.03"
                  refY="3"
                  markerWidth="5"
                  markerHeight="6"
                  orient="auto-start-reverse"
                  style="stroke: none; fill: rgb(21, 21, 21);"
                >
                  <path d="M 0 0 L 5 3 L 0 6 z"></path>
                </marker>
              </defs>
              <line
                x1="360.00799760079974"
                y1="4"
                x2="0"
                y2="4"
                marker-start="url(#0b7eab73-0227-497a-9a3b-b5d3d8e98065)"
                // class="fill-with-stroke-color"
                // style="stroke-width: 8;"
                stroke-width={8}
              ></line>
            </g>
          </g>
        </svg>
      </div>
    );
  },
});
