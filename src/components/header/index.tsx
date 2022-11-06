import { defineComponent } from 'vue';
import TextIcon from '@/assets/icons/text.svg?component';
import PicIcon from '@/assets/icons/picture.svg?component';
import ShapeIcon from '@/assets/icons/shape.svg?component';
import { ElPopover } from 'element-plus';
import TextMenu from '@/components/menus/text';
import ShapeMenu from '@/components/menus/shape';
import PicMenu from '@/components/menus/picture';
import { IElementTypes } from '@/structs';
import { globalStore } from '@/stores/global';
import './index.scss';

const list = [
  {
    key: 'TEXT' as IElementTypes,
    label: '文字',
    Icon: TextIcon,
    Menu: TextMenu,
  },
  {
    key: 'IMAGE' as IElementTypes,
    label: '图片',
    Icon: PicIcon,
    Menu: PicMenu,
  },
  {
    key: 'SHAPE' as IElementTypes,
    label: '图形',
    Icon: ShapeIcon,
    Menu: ShapeMenu,
  },
];

export default defineComponent({
  name: 'pithy-editor-header',
  methods: {},
  render() {
    return (
      <header class="pithy-editor-header">
        <ul class="header-menu">
          {list.map(({ label, Icon, Menu, key }) => (
            <ElPopover
              trigger="click"
              hideAfter={0}
              v-model:visible={globalStore.menuVisible[key]}
              width="auto"
              showArrow={false}
              v-slots={{
                reference: () => (
                  <li>
                    <Icon />
                    <span>{label}</span>
                  </li>
                ),
              }}
            >
              <Menu />
            </ElPopover>
          ))}
        </ul>
        <div></div>
      </header>
    );
  },
});
