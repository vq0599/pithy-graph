import { defineComponent, ref } from 'vue';
import { ElPopover, ElUpload } from 'element-plus';
import { JXButton, JXTabs } from '../base';
import { http } from '@/api';
import JXMediaList from '@/components/media-list';
import { IResource } from '@/structs';
import './index.scss';

export default defineComponent({
  name: 'JXImagePicker',
  props: {
    image: {
      type: String,
    },
  },
  setup() {
    const contentRef = ref<InstanceType<typeof JXMediaList>>();
    return {
      contentRef,
    };
  },
  emits: {
    select: (_resource: IResource) => true,
  },
  methods: {
    handleUploadSuccess() {
      this.contentRef?.reload();
    },
    handleSelect(resource: IResource) {
      this.$emit('select', resource);
    },
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
          component: '敬请期待（图片）',
        },
        {
          label: '在线视频',
          value: 'video',
          component: '敬请期待（视频）',
        },
        {
          label: '我上传的',
          value: 'my',
          component: (
            <JXMediaList ref="contentRef" onSelect={this.handleSelect} />
          ),
        },
      ];
      return (
        <JXTabs width="541px" height="330px" options={list}>
          {{
            controller: () => (
              <ElUpload
                showFileList={false}
                action={`${http.getUri()}/resource/upload`}
                onSuccess={this.handleUploadSuccess}
                accept="image/*,video/*"
              >
                <JXButton width="118px" type="primary">
                  上传
                </JXButton>
              </ElUpload>
            ),
          }}
        </JXTabs>
      );
    },
  },
  render() {
    return (
      <ElPopover
        width={'auto'}
        placement="left-start"
        trigger="click"
        popperStyle={{ padding: 0 }}
        showArrow={false}
        v-slots={this.createSlots()}
      >
        {this.renderModal()}
      </ElPopover>
    );
  },
});
