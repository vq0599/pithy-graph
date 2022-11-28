import { defineComponent } from 'vue';
import PithyImagePicker from '@/components/image-picker';
import PithyColorPicker from '@/components/color-picker';
import { MediaSelectOptions } from '@/structs';
import { usePreziStore } from '@/stores/pinia';
import { mapStores } from 'pinia';
import './index.scss';

export default defineComponent({
  name: 'pithy-slide-panel',
  computed: {
    ...mapStores(usePreziStore),
  },
  methods: {
    handleSetColor(color: string) {
      if (color) {
        this.preziStore.setSlideBackground({ color });
      }
    },
    handleSetImage(options?: MediaSelectOptions) {
      this.preziStore.setSlideBackground({ image: options?.url });
    },
  },
  render() {
    const {
      background: { color, image },
    } = this.preziStore.currentSlide!;
    return (
      <div class="pithy-slide-panel">
        <div class="panel-form">
          <span>背景色</span>
          <PithyColorPicker color={color} onSelect={this.handleSetColor} />
        </div>
        <div class="panel-form">
          <span>背景图片</span>
          <PithyImagePicker url={image} onSelect={this.handleSetImage} />
        </div>
      </div>
    );
  },
});
