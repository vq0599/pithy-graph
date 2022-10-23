import { defineComponent, PropType } from "vue";
import PithyText from './text'
import PithyImage from './image'
import { IElement } from "@/structs";
import { slideStore } from "@/stores/slide";
import { canvasStore } from "@/stores/canvas";
import { editLayerStore } from "@/stores/edit-layer";
import { parseStyles } from "@/utils/parse-styles";
import './index.scss'

export const PithyElement =  defineComponent({
  name: 'PithyElement',
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
  computed: {
    styles() {
      const { x, y, rotate = 0, zIndex, width, height } = this.data
      return parseStyles({
        width,
        height,
        x,
        y,
        rotate,
        zIndex
      })
    }
  },
  methods: {
    renderElement() {
      const { data } = this
      switch (data.type) {
        case 'TEXT':
          return <PithyText payload={data.payload} />
        case 'IMAGE':
          return <PithyImage payload={data.payload} />
        default:
          return null
      }
    },
    handleDragstart(startEvent: MouseEvent) {
      slideStore.focusElement(this.data.id)
      editLayerStore.setRect(
        this.$el.clientWidth,
        this.$el.clientHeight,
      )

      const startX = this.data.x
      const startY = this.data.y
      const callback = (moveEvent: MouseEvent) => {
        slideStore.handler?.setPos(
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
  },
  render() {
    return (
      <div
        class="pithy-element"
        ref="element"
        style={this.styles}
        onMousedown={this.handleDragstart}
      >
        {this.renderElement()}
      </div>
    )
  }
})