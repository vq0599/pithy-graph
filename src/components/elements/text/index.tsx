import { defineComponent, PropType, CSSProperties, ref } from "vue";
import { IEText } from '@/structs'
import { editLayerStore } from "@/stores/edit-layer";
import { preziStore } from "@/stores/prezi";
import { canvasStore } from "@/stores/canvas";
import './index.scss'

const defaultText = '<p><br></p>'

export default defineComponent({
  name: 'pithy-element-text',
  props: {
    data: {
      type: Object as PropType<IEText>,
      required: true
    },
  },
  setup(props) {
    const content = ref<HTMLDivElement>()
    const editable = ref(false)
    return {
      editable,
      content,
      html: props.data.payload.content || defaultText,
      showPlaceholder: ref(!props.data.payload.content),
      resizeObserver: new ResizeObserver(([{ contentRect }]) => {
        const { width, height } = contentRect
        editLayerStore.setRect(width, height)
      })
    }
  },
  computed: {
    styles(): CSSProperties {
      const { fontSize, fontFamily, italic, bold, alignment, color } = this.data.payload
      return {
        fontSize: `${fontSize}em`,
        fontFamily: fontFamily,
        fontStyle: italic ? 'italic' : undefined,
        fontWeight: bold ? 'bold' : undefined,
        textAlign: alignment,
        color,
      }
    },
    active() {
      return this.data.id === preziStore.currentElementId
    },
  },
  methods: {
    // 点击初始为active状态，标记允许进入编辑模式
    handleMousedown() {
      if (this.active) {
        this.editable = true
      }
    },
    // 如果有发生拖动，则取消编辑模式标记
    handleMousemove() {
      this.editable = false
    },
    // 实际进入编辑模式
    handleMouseup() {
      if (this.editable) {
        this.content!.contentEditable = 'true'
        this.content?.focus()
        // 按键(Delete)不可删除元素
        canvasStore.editing = true
        // 输入时监听元素大小变化，同步给编辑框
        this.resizeObserver.observe(this.$el)
      }
    },
    handleBlur() {
      this.content!.contentEditable = 'false'
      this.editable = false
      canvasStore.editing = false
      this.resizeObserver.unobserve(this.$el)
      preziStore.save(this.data.id)
    },
    handleInput(ev: Event) {
      const html = (ev.target as HTMLDivElement).innerHTML
      const text = (ev.target as HTMLDivElement).innerText.replace('\n', '')
      console.log({
        html,
        text
      });
      if (!text) {
        (ev.target as HTMLDivElement).innerHTML = '<p><br></p>'
        this.showPlaceholder = true
      } else if (this.showPlaceholder) {
        this.showPlaceholder = false
      }
      preziStore.updateElementPayload({ content: html })
    },
  },
  render() {
    return (
      <div
        style={this.styles}
        class="pithy-element-text"
        onMousedown={this.handleMousedown}
        onMousemove={this.handleMousemove}
        onMouseup={this.handleMouseup}
      >
        {
          this.showPlaceholder &&
          <div class="text-placeholder">
            <p>Add Text</p>
          </div>
        }
        <div
          class="text-editor"
          ref="content"
          onBlur={this.handleBlur}
          v-html={this.html}
          onInput={this.handleInput}
        />
      </div>
    )
  },
})