import { computed, defineComponent, PropType, ref } from 'vue';
import { JXFlex, JXFlexItem } from '../flex';
import './index.scss';

const options = [
  {
    label: '在线图片',
    value: 'image',
    component: <div>hello 在线图片</div>,
  },
  {
    label: '在线视频',
    value: 'video',
    component: <div>hello 在线视频</div>,
  },
  {
    label: '我上传的',
    value: 'my-upload',
    component: <div>hello 我上传的</div>,
  },
];

interface Options {
  label: string;
  value: string;
  component: JSX.Element;
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
      default: () => options,
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
  },
  setup(props) {
    const currentKey = ref(props.defaultActive || options[0].value);
    const current = computed(() => {
      return props.options.find((option) => option.value === currentKey.value);
    });
    return {
      currentKey,
      current,
    };
  },
  render() {
    const { height, width } = this;
    return (
      <JXFlex class="jx-tabs" style={{ width, height }}>
        <JXFlexItem basis="150px" class="jx-tabs-aside">
          <ul class="jx-tabs-menu">
            {this.options.map(({ value, label }) => (
              <li class={{ active: this.currentKey === value }} key={value}>
                {label}
              </li>
            ))}
          </ul>
        </JXFlexItem>
        <div>{this.current?.component}</div>
      </JXFlex>
    );
  },
});
