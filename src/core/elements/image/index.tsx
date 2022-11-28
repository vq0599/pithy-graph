import { defineComponent, PropType, CSSProperties } from 'vue';
import { IEImage } from '@/structs';
import './index.scss';

export default defineComponent({
  name: 'pithy-element-image',
  props: {
    data: {
      type: Object as PropType<IEImage>,
      required: true,
    },
  },
  computed: {
    styles(): CSSProperties {
      const { radius } = this.data.payload;
      return {
        borderRadius: `${radius}px`,
      };
    },
  },
  render() {
    const { url } = this.data.payload;
    return (
      <div style={this.styles} class="pithy-element-image">
        <img src={url} />
      </div>
    );
  },
});
