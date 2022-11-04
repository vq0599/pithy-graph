import { defineComponent, PropType, CSSProperties } from "vue";
import { IEText } from '@/structs'
import { useText } from "@/hooks/text";
import './index.scss'

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
    return useText(props.data, props.readonly)
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
      <div style={this.styles} class="pithy-element-text">
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