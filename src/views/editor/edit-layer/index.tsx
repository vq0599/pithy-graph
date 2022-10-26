import { canvasStore } from "@/stores/canvas";
import { editLayerStore } from "@/stores/edit-layer";
import { preziStore } from "@/stores/prezi";
import { parseStyles } from "@/utils/parse-styles";
import { CSSProperties, defineComponent } from "vue";
import "./index.scss"

export default defineComponent({
  computed: {
    styles(): CSSProperties {
      if (!preziStore.currentElement) return {}
      const { width, height } = editLayerStore.data
      const { x, y, rotate } = preziStore.currentElement
      const { scale } = canvasStore
      return parseStyles({
        width: width * scale,
        height: height * scale,
        x: x * scale,
        y: y * scale,
        rotate,
      })
    }
  },
  render() {
    return (
      <div class="pithy-edit-layer">
        {
          preziStore.currentElement && (
            <div class="pithy-edit-box" style={this.styles}></div>
          )
        }
        <div></div>
      </div>
    )
  }
})