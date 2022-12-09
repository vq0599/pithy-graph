import { defineComponent, PropType, CSSProperties } from 'vue';
import { IEText } from '@/core/types';
import { useText } from '@/core/hooks';
import './index.scss';

export default defineComponent({
  name: 'pithy-element-text',
  props: {
    data: {
      type: Object as PropType<IEText>,
      required: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return useText(props.data);
  },
  computed: {
    styles(): CSSProperties {
      const {
        fontSize,
        fontFamily,
        italic,
        bold,
        alignment,
        color,
        letterSpacing,
        lineSpacing,
        paragraphSpacing,
      } = this.data.payload;
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
      };
    },
  },
  render() {
    return (
      <div style={this.styles} class="pithy-element-text" ref="root">
        {this.showPlaceholder && (
          <div class="text-placeholder">
            <p>Add Text</p>
          </div>
        )}
        <div class="text-editor" ref="editor" v-html={this.html} />
      </div>
    );
  },
});
