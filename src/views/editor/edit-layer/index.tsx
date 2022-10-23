import { canvasStore } from "@/stores/canvas";
import { editLayerStore } from "@/stores/edit-layer";
import { slideStore } from "@/stores/slide";
import { parseStyles } from "@/utils/parse-styles";
import { CSSProperties, defineComponent } from "vue";
import "./index.scss"

export default defineComponent({
  computed: {
    styles(): CSSProperties {
      const { width, height } = editLayerStore.data
      const { x, y, rotate } = slideStore.currentElement
      const { scale } = canvasStore
      // console.log({
      //   x,
      //   y,
      //   width,
      //   height,
      //   rotate,
      //   scale
      // })
      return parseStyles({
        width: width * scale,
        height: height * scale,
        x: x * scale,
        y: y * scale,
        rotate,
      })
      // return {
      //   transform: `translate(${x * scale}px, ${y * scale}px) rotate(${rotate}deg)`,
      //   width: `${width * scale}px`,
      //   height: `${height * scale}px`,
      // }
    }
  },
  render() {
    return (
      <div class="pithy-edit-layer">
        {
          slideStore.currentElement && (
            <div class="pithy-edit-box" style={this.styles}></div>
          )
        }
        <div></div>
      </div>
    )
  }
})