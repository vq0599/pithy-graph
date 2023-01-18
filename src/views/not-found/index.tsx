import { defineComponent, ref } from 'vue';
import './index.scss';
import { schema } from 'prosemirror-schema-basic';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

export default defineComponent({
  name: 'not-found',
  setup() {
    const editor = ref();
    return {
      editor,
    };
  },
  methods: {},
  mounted() {
    console.log(schema);

    const state = EditorState.create({ schema });
    const view = new EditorView(this.editor, { state });
  },
  render() {
    return (
      <div class="keke-container">
        <div ref="editor" class="editor" />
      </div>
    );
  },
});
