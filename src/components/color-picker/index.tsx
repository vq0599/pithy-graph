import { defineComponent } from 'vue';
import { Chrome as ColorPicker } from '@ckpack/vue-color';
import { ElPopover } from 'element-plus';
import './index.scss';

export default defineComponent({
  name: 'PithyColorPicker',
  props: {
    color: {
      type: String,
      default: 'rgba(255, 255, 255, 0)',
    },
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    select: (color: string) => true,
  },
  methods: {
    createSlots() {
      const { color } = this;
      return {
        reference: () => (
          <div
            class="pithy-picker-trigger"
            style={{ backgroundColor: color }}
          ></div>
        ),
      };
    },
    handleChange({ rgba: { r, g, b, a } }: any) {
      this.$emit('select', `rgba(${r},${g},${b},${a})`);
    },
  },
  render() {
    const { color } = this;
    return (
      <ElPopover
        width={'auto'}
        trigger="click"
        showArrow={false}
        teleported={false}
        v-slots={this.createSlots()}
      >
        <ColorPicker
          modelValue={color}
          onUpdate:modelValue={this.handleChange}
        />
      </ElPopover>
    );
  },
});
