import { defineComponent } from 'vue';
import { usePreziStore, useEditorStore } from '@/stores';
import { ElementAPI } from '@/api';
import { memoize, pick } from 'lodash-es';
import './index.scss';

const library = [
  {
    label: '主标题',
    fontSize: 30,
    sample: 4,
  },
  {
    label: '副标题',
    fontSize: 20,
    sample: 5,
  },
  {
    label: '正文',
    fontSize: 14,
    sample: 6,
  },
  {
    label: '列表项',
    fontSize: 14,
    sample: 7,
    list: true,
  },
];

export default defineComponent({
  name: 'jx-text-menu',
  emits: ['select'],
  setup() {
    const preziStore = usePreziStore();
    const editorStore = useEditorStore();
    return {
      preziStore,
      editorStore,
    };
  },
  methods: {
    fetchExample: memoize(async (id: number) => {
      const { data } = await ElementAPI.get(id);
      return data;
    }),
    async handleClick(id: number) {
      const data = await this.fetchExample(id);
      this.preziStore.createElement('TEXT', {
        x: 100,
        y: 500,
        ...pick(data, [
          'payload',
          'enterAnimation',
          'leaveAnimation',
          'shadow',
          'width',
          'height',
        ]),
      });
      this.editorStore.closeMenu('TEXT');
    },
  },
  render() {
    return (
      <div class="jx-text-menu">
        <ul>
          {library.map(({ fontSize, sample, label, list }) => (
            <li
              class={[{ 'list-sample': list }]}
              style={{ fontSize: `${fontSize}px` }}
              onClick={() => this.handleClick(sample)}
            >
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  },
});
