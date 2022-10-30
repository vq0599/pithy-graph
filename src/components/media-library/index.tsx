import { defineComponent } from "vue";
import { ElDialog } from 'element-plus'
import { ElTabs, ElTabPane } from 'element-plus'
import { ImageSelectOptions } from '@/structs'
import './index.scss'

const list = [
  'http://39.96.206.161/static/images/9e87c2e3-b784-4538-a3ce-6c4a949415b7.jpeg',
  'http://39.96.206.161/static/images/1b5dabbe-9465-444f-9039-24988b4fd6e4.jpg',
  'http://39.96.206.161/static/images/97b834db-d52d-456c-a408-5e9a346482f3.jpeg',
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
  // 2023年了都不知道还在纠结运行时验证干啥
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (payload: boolean) => true,
    select: (payload: ImageSelectOptions) => {
      if (payload) return true
    }
  },
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
      )
    }
    return this.renderLibrary()
  }
})