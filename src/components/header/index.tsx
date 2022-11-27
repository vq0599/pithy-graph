import { defineComponent } from 'vue';
import TextIcon from '@/assets/icons/text.svg?component';
import PicIcon from '@/assets/icons/picture.svg?component';
import ShapeIcon from '@/assets/icons/shape.svg?component';
import GraphIcon from '@/assets/icons/graph.svg?component';
import TableIcon from '@/assets/icons/table.svg?component';
import VideoIcon from '@/assets/icons/video.svg?component';
import RecordIcon from '@/assets/icons/record.svg?component';
import { ElPopover } from 'element-plus';
import TextMenu from '@/components/menus/text';
import ShapeMenu from '@/components/menus/shape';
import ImageMenu from '@/components/menus/image';
import { globalStore } from '@/stores/global';
import { RouterLink } from 'vue-router';
import './index.scss';

const EmptyMenu = () => <div>敬请期待</div>;

const list = [
  {
    key: 'TEXT',
    label: '文字',
    Icon: TextIcon,
    Menu: TextMenu,
  },
  {
    key: 'IMAGE',
    label: '图片',
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
  {
    key: 'GRAPH',
    label: '图表',
    Icon: GraphIcon,
    Menu: EmptyMenu,
  },
  {
    key: 'TABLE',
    label: '表格',
    Icon: TableIcon,
    Menu: EmptyMenu,
  },
  {
    key: 'VIDEO',
    label: '视频',
    Icon: VideoIcon,
    Menu: EmptyMenu,
  },
  {
    key: 'RECORD',
    label: '录制',
    Icon: RecordIcon,
    Menu: EmptyMenu,
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
