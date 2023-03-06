import { defineComponent, ref } from 'vue';
// import MediaLibrary from '@/components/media-library';
// import { IElementTypes } from '@/core';
import { usePreziStore, useEditorStore } from '@/stores';
import { JXTabs, JXButton } from '@/components/base';
import JXMediaList from '@/components/media-list';
import { IResource } from '@/structs';
import { ElUpload } from 'element-plus';
import { http } from '@/api';
import './index.scss';

export default defineComponent({
  name: 'jx-image-menu',
  setup() {
    const preziStore = usePreziStore();
    const editorStore = useEditorStore();
    const contentRef = ref<InstanceType<typeof JXMediaList>>();
    return {
      preziStore,
      editorStore,
      contentRef,
    };
  },
  methods: {
    handleUploadSuccess() {
      this.contentRef?.reload();
    },
    handleSelect({ url }: IResource, payload: any) {
      const { naturalWidth, naturalHeight } = payload;
      this.preziStore.createElement('IMAGE', {
        x: 100,
        y: 500,
        width: 500,
        height: (500 / naturalWidth) * naturalHeight,
        payload: {
          url,
          naturalHeight,
          naturalWidth,
        },
      });
      this.editorStore.closeMenu('IMAGE');
    },
  },
  render() {
    const list = [
      {
        label: '在线图片库',
        value: 'image',
        component: '敬请期待（图片）',
      },
      {
        label: '贴纸',
        value: 'video',
        component: '敬请期待（贴纸）',
      },
      {
        label: '动图',
        value: 'gif',
        component: '敬请期待（动图库）',
      },
      {
        label: '图标',
        value: 'icon',
        component: '敬请期待（动图库）',
      },
      {
        label: '我上传的',
        value: 'my',
        component: (
          <JXMediaList
            fileType="image"
            ref="contentRef"
            onSelect={this.handleSelect}
          />
        ),
      },
    ];
    return (
      <JXTabs width="541px" height="450px" options={list}>
        {{
          controller: () => (
            <ElUpload
              showFileList={false}
              action={`${http.getUri()}/resource/upload`}
              onSuccess={this.handleUploadSuccess}
              accept="image/*"
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
});
