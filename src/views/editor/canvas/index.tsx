import { defineComponent, ref } from "vue";
import { slideStore } from "@/stores/slide";
import { PithyElement } from '@/elements'
import { canvasStore } from "@/stores/canvas";
import './index.scss'

export default defineComponent({
  name: 'pithy-canvas',
  setup() {
    const container = ref<HTMLDivElement | null>(null)
    return {
      container,
    }
  },
  computed: {
    styles() {
     const { height, width, scale } = canvasStore
      return {
        width: width + 'px',
        height: height + 'px',
        transform: `scale(${scale})`
      }
    }
  },
  mounted() {
    document.addEventListener('mousedown', this.clearElementFocus)
    document.addEventListener('resize', this.setRect)
  },
  Unmount() {
    document.removeEventListener('resize', this.setRect)
  },
  render() {
    return (
      <div class="pithy-canvas" style={this.styles}>
        <div ref="container" class='pithy-canvas-inner'>
          {
            slideStore.elements.map((el, index) => (
              <PithyElement data={el} index={index} />
            ))
          }
        </div>
      </div>
    )
  },
  methods: {
    setRect() {
      canvasStore.calcRect()
    },
    clearElementFocus(ev: MouseEvent) {
      const target = ev.target as HTMLElement
      if (!this.container?.contains(target) || target === this.container) {
        slideStore.focusElement(-1)
      }
    }
  }
})