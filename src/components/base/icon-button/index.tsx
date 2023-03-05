import { defineComponent, PropType } from 'vue';
import './index.scss';

export default defineComponent({
  name: 'jx-icon-button',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<'s' | 'm' | 'l'>,
      default: 'm',
    },
  },
  methods: {},
  render() {
    const classNames = [
      'jx-icon-btn',
      `jx-icon-btn-${this.size}`,
      {
        active: this.active,
      },
    ];
    return <button class={classNames}>{this.$slots.default?.()}</button>;
  },
});
