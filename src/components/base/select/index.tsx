import { computed, defineComponent, ref } from 'vue';
import JXInput from '../input';
import { ArrowDown } from '@element-plus/icons-vue';
import { ElIcon, ElPopover } from 'element-plus';
import './index.scss';

export default defineComponent({
  name: 'jx-select',
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
    labelKey: {
      type: String,
      default: 'label',
    },
    valueKey: {
      type: String,
      default: 'value',
    },
  },
  setup(props) {
    const visible = ref(false);
    const width = ref(-1);
    const input = ref();
    // const current = ref(null);

    const getValue = (val: any) => {
      if (!val) return null;
      return typeof val === 'object' ? val[props.valueKey] : val;
    };
    const getLabel = (val: any) => {
      if (!val) return null;
      return typeof val === 'object' ? val[props.labelKey] : val;
    };
    const current = computed(() => {
      return props.options.find(
        (option) => getValue(option) === props.modelValue
      );
    });

    return {
      visible,
      width,
      input,
      current,
      getValue,
      getLabel,
    };
  },
  emits: ['update:modelValue'],
  methods: {
    handleFocus() {
      this.width = this.input.$el.offsetWidth;
      this.visible = true;
    },
    handleBlur() {
      this.visible = false;
    },
    handleSelect(option: any) {
      const value = this.getValue(option);
      this.$emit('update:modelValue', value, option);
    },
  },
  render() {
    const { width, placeholder, current } = this;
    const reference = () => (
      <JXInput
        ref="input"
        modelValue={this.getLabel(this.current)}
        // @ts-ignore
        placeholder={placeholder}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        {{
          // {{ prefix: () => <IconAngle></IconAngle> }}
          // {{ prefix: () => <IconAngle></IconAngle> }}:
          prefix: this.$slots.prefix,
          suffix: () => (
            <ElIcon>
              <ArrowDown />
            </ElIcon>
          ),
        }}
      </JXInput>
    );
    const content = () => (
      <ul class="jx-select-dropdown">
        {this.options.map((val) => {
          const value = this.getValue(val);
          const label = this.getLabel(val);
          const content = this.$slots.option ? this.$slots.option(val) : label;
          return (
            <li
              class={{ active: value === this.getValue(current) }}
              key={value}
              onClick={() => this.handleSelect(val)}
            >
              {content}
            </li>
          );
        })}
      </ul>
    );
    return (
      <ElPopover
        visible={this.visible}
        showArrow={false}
        offset={5}
        popperStyle={{ width: `${width}px`, padding: 0, minWidth: '50px' }}
      >
        {{
          reference,
          default: content,
        }}
      </ElPopover>
    );
  },
});
