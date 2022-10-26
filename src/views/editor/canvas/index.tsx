import { CSSProperties, defineComponent, ref } from "vue";
import { PithyElement } from '@/components/elements'
import { canvasStore } from "@/stores/canvas";
import { preziStore } from "@/stores/prezi";
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
      const { background: { image, color } } = preziStore.currentSlide
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
    document.addEventListener('keydown', this.deleteCurrentElement)
  },
  Unmount() {
    document.removeEventListener('resize', this.setRect)
    document.removeEventListener('keydown', this.deleteCurrentElement)
  },
  methods: {
    setRect() {
      canvasStore.calcRect()
    },
    clearElementFocus(ev: MouseEvent) {
      const target = ev.target as HTMLElement
      if (!this.container?.contains(target) || target === this.container) {
        preziStore.selectElement(-1)
      }
    },
    deleteCurrentElement(ev: KeyboardEvent) {
      // 非编辑状态 & 当前有选中的元素 & 按键为删除
      const continued = !canvasStore.editing && preziStore.currentElement && (ev.code === 'Backspace' || ev.code === 'Delete')
      if (continued) {
        preziStore.deleteElement()
      }
    }
  },
  render() {
    return (
      <div class="pithy-canvas-container">
        <div class="pithy-canvas" style={this.styles}>
          <div ref="container" class='pithy-canvas-inner' style={this.bgStyle}>
            {
              preziStore.elements.map((el, index) => (
                <PithyElement data={el} index={index} key={el.id} />
              ))
            }
          </div>
        </div>
        <EditLayer />
      </div>
    )
  },
})