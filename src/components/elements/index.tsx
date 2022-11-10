import { defineComponent, PropType } from 'vue';
import PithyText from './text';
import PithyImage from './image';
import PithyShape from './shape';
import { IElement } from '@/structs';
import { parseStyles } from '@/utils/parse-styles';
import { useElement } from '@/hooks/element';
import './index.scss';

export const PithyElement = defineComponent({
  name: 'PithyElement',
  props: {
    data: {
      type: Object as PropType<IElement>,
      required: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return useElement(props.data, props.readonly);
  },
  computed: {
    styles() {
      const {
        x,
        y,
        rotate = 0,
        zIndex,
        width,
        height,
        type,
        payload,
      } = this.data;
      const base: Record<string, any> = {
        width,
        height,
        x,
        y,
        rotate,
        zIndex,
      };
      if (type === 'TEXT') {
        delete base.height;
      }
      if (payload.free) {
        delete base.height;
        delete base.width;
      }
      return parseStyles(base);
    },
  },
  methods: {
    renderElement() {
      const { data } = this;
      switch (data.type) {
        case 'TEXT':
          return <PithyText {...this.$props} />;
        case 'IMAGE':
          return <PithyImage data={data} />;
        case 'SHAPE':
          return <PithyShape data={data} />;
        default:
          return null;
      }
    },
  },
  render() {
    return (
      <div
        class="pithy-element"
        ref="element"
        style={this.styles}
        onMousedown={this.handleMousedown}
      >
        {this.renderElement()}
      </div>
    );
  },
});
