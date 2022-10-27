import { CSSProperties, defineComponent, PropType, ref } from "vue";
import { PithyElement } from '@/components/elements'
import { canvasStore } from "@/stores/canvas";
import EditLayer from '../../views/editor/edit-layer'
import { ISlide } from "@/structs";
import './index.scss'

export default defineComponent({
  name: 'pithy-canvas',
  props: {
    slide: {
      type: Object as PropType<ISlide>,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const container = ref<HTMLDivElement | null>(null)
    return {
      container,
    }
  },
  computed: {
    styles() {
     const { height, width } = this
      return {
        // 宽高是为了让容器保持这个区域（transform不会改变元素本身的占位区域）
        width: width + 'px',
        height: height + 'px',
        // scale是让子元素能缩写到当前的区域大小
        transform: `scale(${width / canvasStore.maxWidth})`
      }
    },
    bgStyle(): CSSProperties {
      const { background: { image, color } } = this.slide
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
  render() {
    return (
      <div class="pithy-canvas-container">
        <div class="pithy-canvas" style={this.styles}>
          <div ref="container" class='pithy-canvas-inner' style={this.bgStyle}>
            {
              this.slide.elements.map(el => (
                <PithyElement data={el} key={el.id} readonly={this.readonly} />
              ))
            }
          </div>
        </div>
        {
          !this.readonly && <EditLayer />
        }
      </div>
    )
  },
})