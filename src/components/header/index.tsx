import { defineComponent } from 'vue';
import TextIcon from '@/assets/icons/text.svg?component';
import PicIcon from '@/assets/icons/picture.svg?component';
import ShapeIcon from '@/assets/icons/shape.svg?component';
import { ElPopover } from 'element-plus';
import TextMenu from '@/components/menus/text';
import ShapeMenu from '@/components/menus/shape';
import ImageMenu from '@/components/menus/image';
import { globalStore } from '@/stores/global';
import { RouterLink } from 'vue-router';
import './index.scss';

const list = [
  {
    key: 'TEXT',
    label: '文字',
    Icon: TextIcon,
    Menu: TextMenu,
  },
  {
    key: 'IMAGE',
    label: '素材',
    Icon: PicIcon,
    Menu: ImageMenu,
    popperClass: 'px-0',
  },
  {
    key: 'SHAPE',
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
        <RouterLink class="header-logo" to="/">
          <img src="/logo.png" alt="logo" />
        </RouterLink>
        <ul class="header-menu">
          {list.map(({ label, Icon, Menu, key, popperClass }) => (
            <ElPopover
              persistent={false}
              popperClass={popperClass}
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
      </header>
    );
  },
});
