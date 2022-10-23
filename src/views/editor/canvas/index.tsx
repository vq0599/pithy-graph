import { CSSProperties, defineComponent, ref } from "vue";
import { PithyElement } from '@/components/elements'
import { slideStore } from "@/stores/slide";
import { canvasStore } from "@/stores/canvas";
import EditLayer from '../edit-layer'
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
    },
    bgStyle(): CSSProperties {
      const { background: { image, color } } = slideStore
      const ret: CSSProperties = {}
      if (image) {
        ret.backgroundImage = `url(${image})`
        ret.backgroundPosition = 'center';
        ret.backgroundSize = 'cover';
      } else if (color) {
        ret.backgroundColor = color
      }
      return ret
    }
  },
  mounted() {
    document.addEventListener('mousedown', this.clearElementFocus)
    window.addEventListener('resize', this.setRect)
  },
  Unmount() {
    document.removeEventListener('resize', this.setRect)
  },
  render() {
    return (
      <div class="pithy-canvas-container">
        <div class="pithy-canvas" style={this.styles}>
          <div ref="container" class='pithy-canvas-inner' style={this.bgStyle}>
            {
              slideStore.elements.map((el, index) => (
                <PithyElement data={el} index={index} />
              ))
            }
          </div>
        </div>
        <EditLayer />
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
        console.log(1);
      }
    }
  }
})