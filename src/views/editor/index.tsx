import { defineComponent, ref } from "vue";
import Canvas from "../../components/canvas";
import Sidebar from "./sidebar";
import Header from "./header";
import SlideMenu from './slide-menu'
import { preziStore } from "@/stores/prezi";
import "./index.scss"
import { canvasStore } from "@/stores/canvas";

export default defineComponent({
  setup() {
    // 这个要记牢
    const canvas = ref<InstanceType<typeof Canvas>>()
    return {
      ready: ref(false),
      canvas
    }
  },
  mounted() {
    this.initialize()
    window.addEventListener('resize', this.setRect)
    document.addEventListener('mousedown', this.clearElementFocus)
    document.addEventListener('keydown', this.deleteCurrentElement)
  },
  unmounted() {
    window.removeEventListener('resize', this.setRect)
    document.removeEventListener('mousedown', this.clearElementFocus)
    document.removeEventListener('keydown', this.deleteCurrentElement)
  },
  methods: {
    async initialize() {
      await preziStore.initialize(+this.$route.params.id)
      this.ready = true
    },
    setRect() {
      canvasStore.calcRect()
    },
    clearElementFocus(ev: MouseEvent) {
      const target = ev.target as HTMLElement
      const [container] = (this.canvas?.$el as HTMLElement).getElementsByClassName('pithy-canvas-inner')
      if (!container?.contains(target) || target === container) {
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
    if (!this.ready) return null
    const { width, height } = canvasStore
    return (
      <div class="pithy-editor-page" >
        <Header />
        <div>
          <Sidebar />
          <main>
            <Canvas
              ref="canvas"
              slide={preziStore.currentSlide}
              width={width}
              height={height}
            />
            <SlideMenu />
          </main>
        </div>
      </div>
    )
  }
})