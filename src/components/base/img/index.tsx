import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
    webp: {
      type: Boolean,
      default: true,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    max: {
      type: Number,
    },
  },
  setup(props) {
    const url = computed(() => {
      if (!props.webp && !props.width && !props.height && !props.max) {
        return props.src;
      }
      let ret = 'x-oss-process=image';
      if (props.max) {
        ret += `/resize,l_${props.max}`;
      } else if (props.width || props.height) {
        ret += '/resize';
        if (props.width) {
          ret += `,w_${props.width}`;
        }
        if (props.height) {
          ret += `,h_${props.height}`;
        }
      }
      if (props.webp) {
        ret += '/format,webp';
      }
      return `${props.src}?${ret}`;
    });

    return {
      url,
    };
  },
  render() {
    return <img src={this.url} />;
  },
});
