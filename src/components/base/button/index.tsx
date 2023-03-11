import { ElIcon } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue';
import { defineComponent, PropType, EmitsOptions } from 'vue';
import './index.scss';

export default defineComponent({
  name: 'jx-button',
  props: {
    type: {
      type: String as PropType<'primary' | 'secondary' | 'action'>,
      default: 'primary',
    },
    width: {
      type: [String, Number],
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    click: (event: MouseEvent) => true,
  },
  render() {
    const { width, type } = this;
    const classnames = [
      'jx-btn',
      `jx-btn-${type}`,
      {
        'jx-btn-active': this.active,
      },
    ];
    return (
      <button
        style={{ width }}
        class={classnames}
        onClick={(ev) => this.$emit('click', ev)}
      >
        {this.$slots.icon?.()}
        {this.$slots.default?.()}
        {this.type === 'action' && (
          <ElIcon class="action-icon">
            <ArrowDown></ArrowDown>
          </ElIcon>
        )}
      </button>
    );
  },
});
