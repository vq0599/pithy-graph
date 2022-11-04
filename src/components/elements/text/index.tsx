import { defineComponent, PropType, CSSProperties } from "vue";
import { IEText } from '@/structs'
import { useText } from "@/hooks/text";
import './index.scss'

const defaultText = '<p><br></p>'

export default defineComponent({
  name: 'pithy-element-text',
  props: {
    data: {
      type: Object as PropType<IEText>,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const ret = {
      html: props.data.payload.content || defaultText
    }

    if (props.readonly) {
      return Object.assign(ret, {
        handleMousedown: undefined,
        handleMousemove: undefined,
        handleMouseup: undefined,
        handleBlur: undefined,
        handleInput: undefined,
        showPlaceholder: false,
      })
    } 
    
    return Object.assign(ret, useText(props.data))
  },
  computed: {
    styles(): CSSProperties {
      const { fontSize, fontFamily, italic, bold, alignment, color, letterSpacing, lineSpacing, paragraphSpacing } = this.data.payload
      return {
        fontSize: `${fontSize}em`,
        fontFamily: fontFamily,
        fontStyle: italic ? 'italic' : undefined,
        fontWeight: bold ? 'bold' : undefined,
        textAlign: alignment,
        color,
        letterSpacing: `${letterSpacing}em`,
        '--paragraph-spacing': `${paragraphSpacing || 0}em`,
        lineHeight: `${lineSpacing}`,
      }
    },
  },
  render() {
    return (
      <div
        style={this.styles}
        class="pithy-element-text"
        onMousedown={this.handleMousedown}
        // TODO: 不直接加在元素上，而是改为类似拖拽的实现，mousedown之后再加事件
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
          v-html={this.html}
          onBlur={this.handleBlur}
          onInput={this.handleInput}
        />
      </div>
    )
  },
})