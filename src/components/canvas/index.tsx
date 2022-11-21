import {
  computed,
  CSSProperties,
  defineComponent,
  PropType,
  provide,
  ref,
} from 'vue';
import { PithyElement } from '@/components/elements';
import { ISlide } from '@/structs';
import { scaleKey } from './provide-keys';
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
      default: false,
    },
  },
  setup(props) {
    const container = ref<HTMLDivElement | null>(null);
    const scale = computed(() => props.width / 1920);
    provide(scaleKey, scale);
    return {
      container,
      scale,
    };
  },
  computed: {
    styles() {
      const { height, width, scale } = this;
      return {
        // 宽高是为了让容器保持这个区域（transform不会改变元素本身的占位区域）
        width: width + 'px',
        height: height + 'px',
        // scale是让子元素能缩写到当前的区域大小
        transform: `scale(${scale})`,
      };
    },
    bgStyle(): CSSProperties {
      const {
        background: { image, color },
      } = this.slide;
      const ret: CSSProperties = {};
      if (image) {
        ret.backgroundImage = `url(${image})`;
        ret.backgroundPosition = 'center';
        ret.backgroundSize = 'cover';
      } else if (color) {
        ret.backgroundColor = color;
      }
      return ret;
    },
  },
  render() {
    return (
      <div class="pithy-canvas-container">
        <div class="pithy-canvas" style={this.styles}>
          <div ref="container" class="pithy-canvas-inner" style={this.bgStyle}>
            {this.slide.elements.map((el) => (
              <PithyElement
                data={el}
                data-id={`${el.id}`}
                data-height={`${el.height}`}
                data-type={`${el.type}`}
                key={el.id}
                readonly={this.readonly}
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
});
