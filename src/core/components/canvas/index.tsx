import { defineComponent, PropType } from 'vue';
import PreziEditLayer from '@/core/components/edit-layer';
import PreziReadLayer from '@/core/components/read-layer';
import { ISlide } from '@/core/types';
import { useProvide, useEditLayerProvide } from '@/core/store';
import { canvasEmits } from '@/core/shared/emits';
import './index.scss';

export default defineComponent({
  inheritAttrs: true,
  name: 'pithy-canvas',
  props: {
    slide: {
      type: Object as PropType<ISlide>,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    readonly: {
      type: Boolean,
      default: true,
    },
    modelValue: {
      type: Number,
      default: -1,
    },
  },
  setup(props, ctx) {
    const { scale, containerIns } = useProvide(props, ctx);
    if (!props.readonly) {
      useEditLayerProvide();
    }
    return {
      scale,
      containerIns,
    };
  },
  emits: canvasEmits,
  computed: {
    styles() {
      const { height, width, scale } = this;
      return {
        // 宽高是为了让容器保持这个区域（transform不会改变元素本身的占位区域）
        // scale是让子元素能缩写到当前的区域大小
        width: width + 'px',
        height: height + 'px',
        transform: `scale(${scale})`,
      };
    },
  },
  render() {
    return (
      <div class="pithy-canvas">
        <div class="pithy-scaler" style={this.styles}>
          <PreziReadLayer ref="containerIns" slide={this.slide} />
        </div>
        {!this.readonly && <PreziEditLayer />}
      </div>
    );
  },
});
