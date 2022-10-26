import { defineComponent, PropType } from "vue";
import PithyText from './text'
import PithyImage from './image'
import PithyShape from './shape'
import { IElement } from "@/structs";
import { canvasStore } from "@/stores/canvas";
import { editLayerStore } from "@/stores/edit-layer";
import { parseStyles } from "@/utils/parse-styles";
import { preziStore } from "@/stores/prezi";
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
    },
    active() {
      return this.data.id === preziStore.currentElementId
    },
  },
  watch: {
    active(active: boolean) {
      if (active) {
        this.setEditLayerRect()
      }
    }
  },
  mounted() {
    if(this.active) {
      this.setEditLayerRect()
    }
  },
  methods: {
    renderElement() {
      const { data } = this
      switch (data.type) {
        case 'TEXT':
          return <PithyText data={data} />
        case 'IMAGE':
          return <PithyImage data={data} />
        case 'SHAPE':
            return <PithyShape data={data} />
        default:
          return null
      }
    },
    setEditLayerRect() {
      editLayerStore.setRect(
        this.$el.clientWidth,
        this.$el.clientHeight,
      )
    },
    handleDragstart(startEvent: MouseEvent) {
      preziStore.selectElement(this.data.id)
      if (canvasStore.editing) return
      const startX = this.data.x
      const startY = this.data.y
      const threshold = 10
      const callback = (moveEvent: MouseEvent) => {
        const distX = moveEvent.pageX - startEvent.pageX
        const distY = moveEvent.pageY - startEvent.pageY
        if (Math.abs(distX) < threshold && Math.abs(distY) < threshold) {
          return
        }
        preziStore.updateElement({
          x: startX + distX / canvasStore.scale,
          y: startY + distY / canvasStore.scale,
        })
      }
      document.onmousemove = callback
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        preziStore.save()
      }
    },
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