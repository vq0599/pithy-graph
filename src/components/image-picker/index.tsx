import { defineComponent, ref } from "vue";
import PithyMediaLibrary from '@/components/media-library'
import { ImageSelectOptions } from '@/structs'
import { Close } from "@element-plus/icons-vue";
import { ElIcon } from "element-plus";
import "./index.scss"

export default defineComponent({
  name: 'pithy-image-picker',
  setup() {
    return {
      modelVisible: ref(false)
    }
  },
  props: {
    url: {
      type: String,
      default: '',
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    select: (payload?: ImageSelectOptions) => true
  },
  methods: {
    handleOpenModal() {
      this.modelVisible = true
    },
    handleSelect(payload?: ImageSelectOptions) {
      this.$emit('select', payload)
    }
  },
  render() {
    return (
      <div class="pithy-image-picker">
        <div class="picker-preview" onClick={this.handleOpenModal}>
          {
            this.url
              ? <img src={this.url} />
              : <div class="picker-preview-placeholder" />
          }
        </div>
        <PithyMediaLibrary
          withModal
          v-model={this.modelVisible}
          onSelect={this.handleSelect}
        />
        <ElIcon
          // @ts-ignore Element的错误
          onClick={this.handleSelect}
          class="picker-reset"
        >
          <Close />
        </ElIcon>
      </div>
    )
  }
})