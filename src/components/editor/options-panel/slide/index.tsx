import { defineComponent } from 'vue';
import { usePreziStore } from '@/stores/prezi';
import { mapStores } from 'pinia';
import { JXColorPicker, JXFlex, JXButton } from '@/components/base';
import { ISlide } from '@/core';
import JXMediaPicker from '../../media-picker';
import { IResource } from '@/structs';
import SlideTransition from './transition';
import './index.scss';

export default defineComponent({
  name: 'jx-slide-panel',
  computed: {
    ...mapStores(usePreziStore),
  },
  methods: {
    setBackground(options: Partial<ISlide['background']>) {
      this.preziStore.setSlideBackground(options);
    },
    handleSelectMedia({ mimeType, url }: IResource) {
      if (mimeType.startsWith('video')) {
        this.setBackground({ video: url, image: '' });
      } else {
        this.setBackground({ image: url, video: '' });
      }
    },
  },
  render() {
    const {
      background: { color, image },
    } = this.preziStore.currentSlide!;
    return (
      <div class="jx-slide-panel">
        <div>
          <span>背景</span>
          <div class="mt-2 panel-background">
            <JXFlex alignItems="center" justifyContent="space-between">
              <span>颜色</span>
              <JXColorPicker
                color={color}
                onSelect={(color) => this.setBackground({ color })}
              />
            </JXFlex>
            <JXFlex
              class="mt-1"
              alignItems="center"
              justifyContent="space-between"
            >
              <span>图片/视频</span>
              <JXMediaPicker image={image} onSelect={this.handleSelectMedia} />
            </JXFlex>
          </div>
        </div>
        <hr />
        <div>
          <span>背景音乐</span>
          <div class="mt-2">
            <JXButton width="100%" type="action">
              Music
            </JXButton>
          </div>
        </div>
        <hr />
        <div>
          <span>转场动画</span>
          <div class="mt-2">
            <SlideTransition />
          </div>
        </div>
      </div>
    );
  },
});
