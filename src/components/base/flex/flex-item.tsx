import { defineComponent, PropType, computed, CSSProperties } from 'vue';

export default defineComponent({
  name: 'jx-flex-Item',
  props: {
    tag: {
      type: String as PropType<keyof JSX.IntrinsicElements>,
      default: 'div',
    },
    flex: {
      type: Number,
      default: 0,
    },
    order: {
      type: Number,
      default: 0,
    },
    grow: {
      type: Number,
      default: 0,
    },
    shrink: {
      type: Number,
      default: 1,
    },
    basis: {
      type: String,
      default: undefined,
    },
  },
  setup(props) {
    const styles = computed(() => {
      return {
        flex: props.flex,
        order: props.order,
        flexShrink: props.shrink,
        flexGrow: props.grow,
        flexBasis: props.basis,
      } as CSSProperties;
    });
    return {
      styles,
    };
  },
  render() {
    const Container = this.tag as any;
    return <Container style={this.styles}>{this.$slots.default?.()}</Container>;
  },
});
