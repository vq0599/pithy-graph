import { defineComponent } from 'vue';
import { ElTooltip, ElPopover } from 'element-plus';
import IconText from '@/assets/svg/text.svg?component';
import IconImage from '@/assets/svg/image.svg?component';
import IconShape from '@/assets/svg/shape.svg?component';
import IconVideo from '@/assets/svg/video.svg?component';
import IconRecord from '@/assets/svg/record.svg?component';
import IconMan from '@/assets/svg/man.svg?component';
import TextMenu from '@/components/menus/text';
import ImageMenu from '@/components/menus/image';
import AvatarMenu from '@/components/menus/avatar';
import { useEditorStore } from '@/stores';

export default defineComponent({
  name: 'header-menu',
  setup() {
    const editorStore = useEditorStore();
    return {
      editorStore,
    };
  },
  render() {
    const { menuVisible } = this.editorStore;
    return (
      <ul class="header-menu">
        <ElPopover
          showArrow={false}
          trigger="click"
          v-model:visible={menuVisible['TEXT']}
          offset={8}
        >
          {{
            reference: () => (
              <li>
                <IconText />
                <span>文字</span>
              </li>
            ),
            default: () => <TextMenu />,
          }}
        </ElPopover>
        <ElPopover
          width={'auto'}
          trigger="click"
          v-model:visible={menuVisible['IMAGE']}
          popperStyle={{ padding: 0 }}
          showArrow={false}
        >
          {{
            reference: () => (
              <li>
                <IconImage />
                <span>图片</span>
              </li>
            ),
            default: () => <ImageMenu />,
          }}
        </ElPopover>
        <li>
          <IconShape />
          <span>图形</span>
        </li>
        <ElTooltip content="敬请期待">
          <li>
            <IconVideo />
            <span>视频</span>
          </li>
        </ElTooltip>
        <ElTooltip content="敬请期待">
          <li>
            <IconRecord />
            <span>录制</span>
          </li>
        </ElTooltip>
        {/* <ElTooltip content="敬请期待">
          <li>
            <IconMan />
            <span>数字人</span>
          </li>
        </ElTooltip> */}
        <ElPopover
          width={'auto'}
          trigger="click"
          v-model:visible={menuVisible['AVATAR']}
          popperStyle={{ padding: 0 }}
          showArrow={false}
        >
          {{
            reference: () => (
              <li>
                <IconMan />
                <span>数字人</span>
              </li>
            ),
            default: () => <AvatarMenu />,
          }}
        </ElPopover>
      </ul>
    );
  },
});
