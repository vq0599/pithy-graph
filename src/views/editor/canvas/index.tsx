import { defineComponent, ref } from "vue";
import {
  canvasRatio,
  sidebarWidth,
  headerWidth,
  canvasNaturalWidth,
  canvasNaturalHeight,
} from "@/styles/export.module.scss"

const maxWidth = parseInt(canvasNaturalWidth)
const maxHeight = parseInt(canvasNaturalHeight)
const calcRect = () => {
  const containerWidth = window.innerWidth - parseInt(sidebarWidth) - 12 * 2
  const containerHeight = window.innerHeight - parseInt(headerWidth) - 12 * 2
  
  let width, height
  // 4K屏幕，需要考虑最大值不能对于maxWidth * maxHeight
  if (containerWidth >= maxWidth && containerHeight / maxHeight) {
    width = maxWidth
    height = maxHeight
  } else if (containerWidth / maxWidth < containerHeight / maxHeight) {
    width = containerWidth
    height = containerWidth / canvasRatio
  } else {
    width = containerHeight * canvasRatio
    height = containerHeight
  }
  return {
    width: width,
    height: height,
    scale: width / maxWidth
  }
}

export default defineComponent({
  name: 'ss-canvas',
  setup() {
    const rect = ref(calcRect())
    return {
      rect
    }
  },
  computed: {
    styles() {
     const { height, width } = this.rect
      return {
        width: width + 'px',
        height: height + 'px',
        transform: `scale(${width / maxWidth})`
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.setRect)
  },
  Unmount() {
    window.removeEventListener('resize', this.setRect)
  },
  render() {
    return (
      <div class="ss-canvas" style={this.styles}>
        <div class='ss-canvas-inner'></div>
      </div>
    )
  },
  methods: {
    setRect() {
      this.rect = calcRect()
    }
  }
})