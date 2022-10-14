import { defineComponent } from "vue";

// level: 'H1' | 'H2' | 'H3' | 'P' | 'SP' | 'OL' | 'UL'

const list = [
  {
    label: '大标题',
    type: 'H1',
    size: 28,
  },
  {
    label: '标题',
    type: 'H2',
    size: 20,
  },
  {
    label: '副标题',
    type: 'H3',
    size: 20,
  },
  {
    label: '正文',
    type: 'P',
    size: 14,
  },
  {
    label: '小文本',
    type: 'SP',
    size: 12,
  },
  {
    label: '有序列表',
    type: 'OL',
    size: 12,
  },
  {
    label: '无序列表',
    type: 'UL',
    size: 12,
  },
]


export default defineComponent({
  name: 'ss-text-menu',
  emits: ['select'],
  render() {
    return (
      <div class="ss-text-menu">
        <ul>
          {
            list.map(v => (
              <li
                style={{ fontSize: `${v.size}px` }}
                onClick={() => this.handleClick(v)}
              >{v.label}</li>
            ))
          }
        </ul>
      </div>
    )
  },
  methods: {
    handleClick(v: any) {
      this.$emit('select', v)
    }
  }
})