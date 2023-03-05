import { defineComponent } from 'vue';
import { ElPopover } from 'element-plus';
import './index.scss';
import { JXTabs } from '..';

export default defineComponent({
  name: 'JXImagePicker',
  props: {
    image: {
      type: String,
    },
  },
  setup() {
    const tab = 'current';
  },
  // emits: {
  //   select: (_color: string) => true,
  // },
  methods: {
    createSlots() {
      return {
        reference: () => (
          <div
            class="jx-image-picker"
            style={{ backgroundImage: `url(${this.image})` }}
          ></div>
        ),
      };
    },
    renderModal() {
      const list = [
        {
          label: '在线图片',
          value: 'image',
          component: <div>hello image</div>,
        },
        {
          label: '在线视频',
          value: 'video',
          component: <div>hello 在线视频</div>,
        },
        { label: '我上传的', value: 'my', component: <div>hello 上传</div> },
      ];
      return <JXTabs width="540px" height="330px" options={list} />;
    },
  },
  render() {
    return (
      <ElPopover
        width={'auto'}
        placement="left-start"
        trigger="click"
        showArrow={false}
        v-slots={this.createSlots()}
      >
        {this.renderModal()}
      </ElPopover>
    );
  },
});
