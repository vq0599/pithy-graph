import { CSSProperties, defineComponent, PropType } from "vue";
import { IElement } from "@/structs";
import { slideStore } from "@/stores/slide";
import "./index.scss"
import { canvasStore } from "@/stores/canvas";

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<IElement>,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup() {
    return {}
  },
  computed: {
    styles(): CSSProperties {
      const { x, y, rotate, order, width, height } = this.data
      return {
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
        zIndex: order
      }
    }
  },
  render() {
    const { id } = this.data
    return (
      <div
        style={this.styles}
        class={['pithy-element', { 'pithy-element-active': id === slideStore.currentElement?.id }]}
        onMousedown={this.handleDragstart}
      >
        { this.$slots.default?.() }
      </div>
    )
  },
  methods: {
    handleDragstart(startEvent: MouseEvent) {
      slideStore.focusElement(this.index)
      const startX = this.data.x
      const startY = this.data.y
      const callback = (moveEvent: MouseEvent) => {
        slideStore.setPos(
          startX + (moveEvent.pageX - startEvent.pageX) / canvasStore.scale,
          startY + (moveEvent.pageY - startEvent.pageY) / canvasStore.scale,
        )
      }
      document.onmousemove = callback
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})