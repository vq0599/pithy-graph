import { defineComponent } from "vue";
import { ElDialog } from 'element-plus'
import { ElTabs, ElTabPane } from 'element-plus'
import './index.scss'

const list = [
    'https://images.pexels.com/photos/3805983/pexels-photo-3805983.jpeg',
    'https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg',
    'https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg',
    'https://images.pexels.com/photos/3608056/pexels-photo-3608056.jpeg',
    "https://hellorfimg.zcool.cn/provider_image/preview260/hi2242052247.jpg",
    "https://hellorfimg.zcool.cn/provider_image/preview260/hi2242061081.jpg",
    "https://hellorfimg.zcool.cn/provider_image/preview260/hi2242027171.jpg",
    "https://ali.image.hellorf.com/images/a7156c66d446a2a03bb380878b0f4dd1.jpeg",
    "https://ali.image.hellorf.com/images/53ab5c48fab1450ea405d9e002a8c155.jpeg",
    "https://ali.image.hellorf.com/images/32d9954cbc35dadad044ce2e9cfb8f77.jpeg",
    "https://ali.image.hellorf.com/images/96b7faa42b5d064b996638fbe0605fad.jpeg",
    "https://ali.image.hellorf.com/images/8af4d6b284d0a292eed67ac6435e881a.jpeg",
]

export default defineComponent({
  props: {
    withModal: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'select'],
  computed: {
    modelVisible: {
      get() {
        return this.modelValue
      },
      set(v: boolean) {
        this.$emit('update:modelValue', v)
      }
    }
  },
  methods: {
    handleSelect(ev: Event) {
      const { naturalHeight, naturalWidth, src: url } = (ev.target as HTMLImageElement)
      this.$emit('select', {
        url,
        naturalHeight,
        naturalWidth,
      })
      if (this.withModal) {
        this.$emit('update:modelValue', false)
      }
    },
    renderLibrary() {
      return (
        <div class="pithy-media-library">
          <ElTabs tabPosition="left">
            <ElTabPane label="在线图片">
              <div class="library-content">
              {
                list.map(url => (
                  <img src={url} onClick={this.handleSelect} />
                ))
              }
              </div>
            </ElTabPane>
            <ElTabPane label="我的图片">暂无</ElTabPane>
          </ElTabs>
        </div>
      )
    }
  },
  render() {
    if (this.withModal) {
      const slots = {
        header: () => <div>A</div>,
      };
      return (
        <ElDialog width={435} class="pithy-media-library-modal" v-slots={slots} v-model={this.modelVisible}>
          {this.renderLibrary()}
        </ElDialog>
      )
    }
    return this.renderLibrary()
  }
})