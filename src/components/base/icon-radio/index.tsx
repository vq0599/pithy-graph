import { defineComponent } from 'vue';
import { JXFlex } from '@/components/base';
import IconAlignLeft from '@/assets/svg/align-left.svg?component';
import IconAlignCenter from '@/assets/svg/align-center.svg?component';
import IconAlignRight from '@/assets/svg/align-right.svg?component';
import './index.scss';

const options = [
  { label: '左对齐', value: 'left', Icon: IconAlignLeft },
  { label: '居中对齐', value: 'center', Icon: IconAlignCenter },
  { label: '右对齐', value: 'right', Icon: IconAlignRight },
];

export default defineComponent({
  name: 'jx-icon-group',
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
  emits: ['update:modelValue'],
  methods: {
    handleSelect(value: string | number) {
      this.$emit('update:modelValue', value);
    },
  },
  render() {
    return (
      <JXFlex gap="10px" class="jx-icon-radio">
        {options.map(({ Icon, value, label }) => (
          <JXFlex
            alignItems="center"
            justifyContent="center"
            tag="li"
            class={{ active: value === this.modelValue }}
            // @ts-ignore
            onClick={() => this.handleSelect(value)}
            title={label}
          >
            <Icon />
          </JXFlex>
        ))}
      </JXFlex>
    );
  },
});
