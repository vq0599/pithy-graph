import { defineComponent } from "vue";
import type { IText } from '@/structs'
import { slideStore } from "@/stores/slide";
import * as textCase from './case'
import './index.scss'

interface TextMenuItem {
  label: string,
  fontSize: number,
  /**
   * 需要添加到元素里的属性
   */
  options: Partial<IText>
}

const list: TextMenuItem[] = [
  {
    label: '大标题',
    fontSize: 36,
    options: textCase.H1,
  },
  {
    label: '标题',
    fontSize: 28,
    options: textCase.H2,
  },
  {
    label: '副标题',
    fontSize: 24,
    options: textCase.H3,
  },
  {
    label: '正文',
    fontSize: 14,
    options: textCase.P,
  },
  {
    label: '小文本',
    fontSize: 12,
    options: textCase.SP,
  },
  {
    label: '有序列表',
    fontSize: 14,
    options: textCase.OL,
  },
  {
    label: '无序列表',
    fontSize: 14,
    options: textCase.UL,
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
            list.map(({ fontSize, options, label }) => (
              <li
                style={{ fontSize: `${fontSize}px` }}
                onClick={() => this.handleClick(options)}
              >{label}</li>
            ))
          }
        </ul>
      </div>
    )
  },
  methods: {
    handleClick(options:  Partial<IText>) {
      slideStore.appendElement({
        type: 'TEXT',
        ...options,
      })
    }
  }
})