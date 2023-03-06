import { computed, defineComponent, PropType, ref } from 'vue';
import { JXFlex, JXFlexItem } from '../flex';
import './index.scss';

interface Options {
  label: string;
  value: string;
  component: JSX.Element | string;
}

export default defineComponent({
  name: 'jx-tabs',
  props: {
    defaultActive: {
      type: String,
      default: '',
    },
    options: {
      type: Array as PropType<Options[]>,
      default: () => [],
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
  },
  setup(props) {
    const currentKey = ref(props.defaultActive || props.options[0].value);
    const current = computed(() => {
      return props.options.find((option) => option.value === currentKey.value);
    });
    return {
      currentKey,
      current,
    };
  },
  methods: {
    handleSelect(value: string) {
      this.currentKey = value;
    },
  },
  render() {
    const { height, width } = this;
    return (
      <JXFlex class="jx-tabs" style={{ width, height }}>
        <JXFlexItem basis="151px" shrink={0} class="jx-tabs-aside">
          <ul class="jx-tabs-menu">
            {this.options.map(({ value, label }) => (
              <li
                class={['event-enable', { active: this.currentKey === value }]}
                key={value}
                onClick={() => this.handleSelect(value)}
              >
                {label}
              </li>
            ))}
          </ul>
          <div>{this.$slots.controller?.()}</div>
        </JXFlexItem>
        <div class="jx-tabs-content">{this.current?.component}</div>
      </JXFlex>
    );
  },
});
