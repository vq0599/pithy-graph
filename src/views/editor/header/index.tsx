import { defineComponent } from "vue";
import TextIcon from '@/assets/icons/text.svg?component'
import PicIcon from '@/assets/icons/picture.svg?component'
import ShapeIcon from '@/assets/icons/shape.svg?component'
import { ElPopover } from 'element-plus'
import TextMenu from "../menu/text";
import ShapeMenu from "../menu/shape";
import PicMenu from "../menu/picture";
import { preziStore } from "@/stores/prezi";
import './index.scss'

const list = [
  {
    label: '文字',
    Icon: TextIcon,
    Menu: TextMenu,
  },
  {
    label: '图片',
    width: 240,
    Icon: PicIcon,
    Menu: PicMenu,
  },
  {
    label: '图形',
    Icon: ShapeIcon,
    Menu: ShapeMenu,
  },
]

export default defineComponent({
  name: 'pithy-editor-header',
  methods: {
    handleSave() {
      console.log(preziStore.currentSlide);
    }
  },
  render() {
    return (
      <header class="pithy-editor-header">
        <ul class="header-menu">
          {
            list.map(({ label, Icon, Menu, width }) => (
              <ElPopover width={width} showArrow={false} v-slots={{
                reference: () => (
                  <li>
                    <Icon />
                    <span>{label}</span>
                  </li>
                )
              }}>
                <Menu />
              </ElPopover>
            ))
          }
        </ul>
        <div>
          <button onClick={this.handleSave}>保存</button>
        </div>
      </header>
    )
  },
})