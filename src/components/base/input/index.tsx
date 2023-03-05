import { computed, defineComponent } from 'vue';
import { JXFlex } from '../flex';
import './index.scss';

export default defineComponent({
  name: 'jx-input',
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    prefix: {
      type: String,
    },
    suffix: {
      type: String,
    },
    width: {
      type: Number,
    },
    numberOnly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(this, props, ctx) {
    const styles = computed(() => {
      return {
        width: props.width ? `${props.width}px` : undefined,
      };
    });
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(v) {
        ctx.emit('update:modelValue', v);
      },
    });

    return {
      styles,
      value,
    };
  },
  emits: ['update:modelValue'],
  methods: {
    handleKeyDown(ev: KeyboardEvent) {
      if (!this.numberOnly) return;
      const whiteList = ['Backspace', 'ArrowRight', 'ArrowLeft'];
      if (!/[\d-.]/.test(ev.key) && !whiteList.includes(ev.key)) {
        ev.preventDefault();
      }
    },
  },
  render() {
    const prefix = this.$slots.prefix?.() || this.prefix;
    const suffix = this.$slots.suffix?.() || this.suffix;
    return (
      <JXFlex
        style={this.styles}
        class={['jx-input-wrapper', { 'jx-input-disabled': this.disabled }]}
        alignItems="center"
      >
        {prefix && (
          <JXFlex tag="span" class="jx-input-prefix">
            {prefix}
          </JXFlex>
        )}
        <input
          class="jx-input"
          disabled={this.disabled}
          onKeydown={this.handleKeyDown}
          v-model={this.value}
          {...this.$attrs}
        ></input>
        {suffix && (
          <JXFlex tag="span" class="jx-input-suffix">
            {suffix}
          </JXFlex>
        )}
      </JXFlex>
    );
  },
});
