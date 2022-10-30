import { defineComponent } from "vue";
import { ElColorPicker } from 'element-plus'
import { preziStore } from "@/stores/prezi";
import PithyImagePicker from "@/components/image-picker";
import { ImageSelectOptions } from "@/structs";
import "./index.scss"

export default defineComponent({
  name: 'pithy-slide-panel',
  methods: {
    handleSetColor(color: string | null) {
      if (color) {
        preziStore.setSlideBackground({ color })
      }
    },
    handleSetImage(options?: ImageSelectOptions) {
      preziStore.setSlideBackground({ image: options?.url })
    }
  },
  render() {
    const { background: { color, image } } = preziStore.currentSlide
    return (
      <div class="pithy-slide-panel" >
        <div class="panel-form">
          <span>背景色</span>
          <ElColorPicker
            showAlpha
            modelValue={color}
            onActiveChange={this.handleSetColor}
          />
        </div>
        <div class="panel-form">
          <span>背景图片</span>
          <PithyImagePicker url={image} onSelect={this.handleSetImage} />
        </div>
      </div>
    )
  }
})