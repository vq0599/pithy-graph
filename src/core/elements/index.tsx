import { defineComponent, PropType } from 'vue';
import PithyText from './text';
import PithyImage from './image';
import PithyShape from './shape';
// import PithyVideo from './video';
import PithyAvatar from './avatar';
import { IElement } from '../types';
import { parseStyles } from '@/core/utils/parse-styles';
import { useElement } from '../hooks/element';
import './index.scss';

export default defineComponent({
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
    return useElement(props.data);
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
          return <PithyImage {...this.$props} />;
        case 'SHAPE':
          return <PithyShape {...this.$props} />;
        // case 'VIDEO':
        //   return <PithyVideo {...this.$props} />;
        case 'AVATAR':
          return <PithyAvatar {...this.$props} />;
        default:
          return null;
      }
    },
  },
  render() {
    return (
      <div class="pithy-element" ref="element" style={this.styles}>
        {this.renderElement()}
      </div>
    );
  },
});
