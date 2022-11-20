import { defineComponent, ref } from 'vue';
import {
  ElTabs,
  ElTabPane,
  ElUpload,
  ElButton,
  ElDialog,
  UploadProgressEvent,
  ElProgress,
  ElSpace,
  ElDivider,
  ElScrollbar,
} from 'element-plus';
import { MediaSelectOptions } from '@/structs';
import { http } from '@/api/http';
import { globalStore } from '@/stores/global';
import { Upload } from '@element-plus/icons-vue';
import './index.scss';

export default defineComponent({
  props: {
    withModal: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    useVideo: {
      type: Boolean,
      default: true,
    },
    useImage: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    return {
      progress: ref(-1),
      key: 'images' as 'image' | 'video',
    };
  },
  // 2023年了都不知道还在纠结运行时验证干啥
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (payload: boolean) => true,
    select: (payload: MediaSelectOptions) => {
      if (payload) return true;
    },
  },
  computed: {
    modelVisible: {
      get() {
        return this.modelValue;
      },
      set(v: boolean) {
        this.$emit('update:modelValue', v);
      },
    },
    images() {
      return globalStore.images;
    },
    videos() {
      return globalStore.videos;
    },
  },
  methods: {
    handleUploadStart(key: 'image' | 'video') {
      this.progress = 0;
      this.key = key;
    },
    handleSelectVideo(ev: Event) {
      const {
        videoHeight,
        videoWidth,
        src: url,
      } = ev.target as HTMLVideoElement;
      this.$emit('select', {
        type: 'VIDEO',
        url,
        naturalHeight: videoHeight,
        naturalWidth: videoWidth,
      });
    },
    handleSelectImage(ev: Event) {
      const {
        naturalHeight,
        naturalWidth,
        src: url,
      } = ev.target as HTMLImageElement;
      this.$emit('select', {
        type: 'IMAGE',
        url,
        naturalHeight,
        naturalWidth,
      });
      if (this.withModal) {
        this.$emit('update:modelValue', false);
      }
    },
    handleUploadSuccess(url: string) {
      globalStore[`${this.key}s`].unshift(url);
      setTimeout(() => {
        this.progress = -1;
      }, 1000);
    },
    handleUploadProcess({ percent }: UploadProgressEvent) {
      this.progress = Math.round(percent);
    },
    renderImagePanel() {
      if (!this.useImage) return null;
      return (
        <ElTabPane label="在线图片" lazy={true}>
          <ElScrollbar height="100%">
            <ElSpace>
              <ElUpload
                showFileList={false}
                beforeUpload={() => this.handleUploadStart('image')}
                action={`${http.getUri()}/resource/upload`}
                onSuccess={this.handleUploadSuccess}
                onProgress={this.handleUploadProcess}
                accept="image/*"
              >
                <ElButton type="primary" circle icon={Upload}></ElButton>
              </ElUpload>
              {this.progress > -1 && (
                <ElProgress
                  style={{ width: '280px' }}
                  percentage={this.progress}
                ></ElProgress>
              )}
            </ElSpace>
            <ElDivider />
            <ElSpace class="media-list" wrap>
              {this.images.map((url) => (
                <img src={url} onClick={this.handleSelectImage} />
              ))}
            </ElSpace>
          </ElScrollbar>
        </ElTabPane>
      );
    },
    renderVideoPanel() {
      if (!this.useVideo) return null;
      return (
        <ElTabPane label="在线视频" lazy={true}>
          <ElScrollbar height="100%">
            <ElSpace>
              <ElUpload
                showFileList={false}
                beforeUpload={() => this.handleUploadStart('video')}
                action={`${http.getUri()}/resource/upload`}
                onSuccess={this.handleUploadSuccess}
                onProgress={this.handleUploadProcess}
                accept="video/*"
              >
                <ElButton type="primary" circle icon={Upload}></ElButton>
              </ElUpload>
              {this.progress > -1 && (
                <ElProgress
                  style={{ width: '280px' }}
                  percentage={this.progress}
                ></ElProgress>
              )}
            </ElSpace>
            <ElDivider />
            <ElSpace class="media-list" wrap>
              {this.videos.map((url) => (
                <video
                  preload="metadata"
                  src={url}
                  onClick={this.handleSelectVideo}
                />
              ))}
            </ElSpace>
          </ElScrollbar>
        </ElTabPane>
      );
    },
    renderLibrary() {
      return (
        <div class="pithy-media-library">
          <ElTabs tabPosition="left">
            {this.renderImagePanel()}
            {this.renderVideoPanel()}
          </ElTabs>
        </div>
      );
    },
  },
  render() {
    if (this.withModal) {
      const slots = {
        header: () => null,
      };
      return (
        <ElDialog
          appendToBody
          width={450}
          class="pithy-media-library-modal"
          v-slots={slots}
          v-model={this.modelVisible}
        >
          {this.renderLibrary()}
        </ElDialog>
      );
    }
    return this.renderLibrary();
  },
});
