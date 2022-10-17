import { defineComponent, PropType, CSSProperties, ref } from "vue";
import { IText } from '@/structs'
import { slideStore } from "@/stores/slide";
import './index.scss'

export default defineComponent({
  name: 'pithy-element-text',
  props: {
    data: {
      type: Object as PropType<IText>,
      required: true
    },
  },
  setup(props) {
    const content = ref<HTMLDivElement | null>(null)
    const editable = ref(false)
    return {
      editable,
      content,
      html: props.data.content
    }
  },
  computed: {
    styles(): CSSProperties {
      const { fontSize, fontFamily, italic, bold, alignment, color } = this.data
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
      return this.data.id === slideStore.currentElement?.id
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
      }
    },
    handleBlur() {
      this.content!.contentEditable = 'false'
      this.editable = false
    },
    handleInput() {
      slideStore.setContent(this.content?.innerHTML)
    }
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
        <div
          ref="content"
          onBlur={this.handleBlur}
          innerHTML={this.html}
          onInput={this.handleInput}
        />
      </div>
    )
  },
})