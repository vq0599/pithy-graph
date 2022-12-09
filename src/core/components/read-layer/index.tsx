import { CSSProperties, defineComponent, PropType } from 'vue';
import PithyElement from '@/core/elements';
import { ISlide } from '@/core/types';
import './index.scss';
import { useBackgroundHandle } from '@/core/hooks';

export default defineComponent({
  inheritAttrs: true,
  name: 'pithy-read-layer',
  props: {
    slide: {
      type: Object as PropType<ISlide>,
      required: true,
    },
  },
  setup() {
    return useBackgroundHandle();
  },
  computed: {
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
      <div ref="root" class="pithy-read-layer" style={this.bgStyle}>
        {this.slide.elements.map((el) => (
          <PithyElement
            data={el}
            data-id={`${el.id}`}
            data-type={`${el.type}`}
            data-height={`${el.height}`}
            data-width={`${el.width}`}
            data-x={`${el.x}`}
            data-y={`${el.y}`}
            key={el.id}
          />
        ))}
      </div>
    );
  },
});
