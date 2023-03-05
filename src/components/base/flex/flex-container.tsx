import { defineComponent, PropType, computed, CSSProperties } from 'vue';

export default defineComponent({
  name: 'FlexComponent',
  props: {
    tag: {
      type: String as PropType<keyof JSX.IntrinsicElements>,
      default: 'div',
    },
    inline: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String as PropType<
        'column' | 'column-reverse' | 'row' | 'row-reverse'
      >,
      default: undefined,
    },
    gap: {
      type: String,
      default: undefined,
    },
    wrap: {
      type: String as PropType<'wrap' | 'nowrap' | 'wrap-reverse'>,
      default: undefined,
    },
    justifyContent: {
      type: String as PropType<
        | 'space-around'
        | 'space-between'
        | 'center'
        | 'flex-end'
        | 'flex-start'
        | 'stretch'
      >,
      default: undefined,
    },
    alignItems: {
      type: String as PropType<
        'flex-end' | 'flex-start' | 'center' | 'stretch'
      >,
      default: undefined,
    },
  },
  setup(props) {
    const styles = computed(() => {
      return {
        display: props.inline ? 'inline-flex' : 'flex',
        flexDirection: props.direction,
        flexWrap: props.wrap,
        justifyContent: props.justifyContent,
        alignItems: props.alignItems,
        gap: props.gap,
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
