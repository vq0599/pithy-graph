import { defineComponent, ref } from 'vue';
import { ElDialog } from 'element-plus';
import { ElTabs, ElTabPane, ElUpload, ElButton } from 'element-plus';
import { ImageSelectOptions } from '@/structs';
import { ImageAPI } from '@/api';
import './index.scss';
import { http } from '@/api/http';

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
  },
  setup() {
    return {
      images: ref<string[]>([]),
      uploadImages: ref<string[]>([]),
    };
  },
  // 2023年了都不知道还在纠结运行时验证干啥
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (payload: boolean) => true,
    select: (payload: ImageSelectOptions) => {
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
  },
  async mounted() {
    const { data: images } = await ImageAPI.getAll();
    this.images = images;
  },
  methods: {
    handleSelect(ev: Event) {
      const {
        naturalHeight,
        naturalWidth,
        src: url,
      } = ev.target as HTMLImageElement;
      this.$emit('select', {
        url,
        naturalHeight,
        naturalWidth,
      });
      if (this.withModal) {
        this.$emit('update:modelValue', false);
      }
    },
    handleUpload(url: string) {
      this.uploadImages.push(url);
    },
    renderLibrary() {
      return (
        <div class="pithy-media-library">
          <ElTabs tabPosition="left">
            <ElTabPane label="在线图片">
              <div class="library-content">
                {this.images.map((url) => (
                  <img src={url} onClick={this.handleSelect} />
                ))}
              </div>
            </ElTabPane>
            <ElTabPane label="我的图片">
              <div class="library-content">
                {this.uploadImages.map((url) => (
                  <img src={url} onClick={this.handleSelect} />
                ))}
              </div>
              <hr />
              <ElUpload
                showFileList={false}
                action={`${http.getUri()}/images/upload`}
                onSuccess={this.handleUpload}
              >
                <ElButton>上传图片</ElButton>
              </ElUpload>
            </ElTabPane>
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
          width={435}
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
