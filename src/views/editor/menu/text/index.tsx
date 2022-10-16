import { defineComponent } from "vue";
import type { ITextLevel } from '@/structs'
import { slideStore } from "@/stores/slide";
import './index.scss'

interface TextMenuItem {
  label: string,
  fontSize: number,
  /**
   * 需要添加到元素里的属性
   */
  options: {
    level: ITextLevel,
    fontSize: number,
  }
}

const list: TextMenuItem[] = [
  {
    label: '大标题',
    fontSize: 36,
    options: {
      fontSize: 3.6,
      level: 'H1',
    }
  },
  {
    label: '标题',
    fontSize: 28,
    options: {
      fontSize: 3,
      level: 'H2',
    }
  },
  {
    label: '副标题',
    fontSize: 24,
    options: {
      fontSize: 2.4,
      level: 'H3',
    }
  },
  {
    label: '正文',
    fontSize: 14,
    options: {
      fontSize: 1,
      level: 'P',
    }
  },
  {
    label: '小文本',
    fontSize: 12,
    options: {
      fontSize: 0.8,
      level: 'SP',
    }
  },
  {
    label: '有序列表',
    fontSize: 14,
    options: {
      fontSize: 1,
      level: 'OL',
    }
  },
  {
    label: '无序列表',
    fontSize: 14,
    options: {
      fontSize: 1,
      level: 'UL',
    }
  },
]


export default defineComponent({
  name: 'pithy-text-menu',
  emits: ['select'],
  render() {
    return (
      <div class="pithy-text-menu">
        <ul>
          {
            list.map(v => (
              <li
                style={{ fontSize: `${v.fontSize}px` }}
                onClick={() => this.handleClick(v)}
              >{v.label}</li>
            ))
          }
        </ul>
      </div>
    )
  },
  methods: {
    handleClick({ options }: TextMenuItem) {
      slideStore.appendElement({
        type: 'TEXT',
        ...options,
      })
    }
  }
})