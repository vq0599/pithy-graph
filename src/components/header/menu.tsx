import { defineComponent } from 'vue';
import { ElTooltip, ElPopover } from 'element-plus';
import IconText from '@/assets/svg/text.svg?component';
import IconImage from '@/assets/svg/image.svg?component';
import IconShape from '@/assets/svg/shape.svg?component';
import IconVideo from '@/assets/svg/video.svg?component';
import IconRecord from '@/assets/svg/record.svg?component';
import IconMan from '@/assets/svg/man.svg?component';
import TextMenu from '@/components/menus/text';

export default defineComponent({
  name: 'header-menu',
  render() {
    return (
      <ul class="header-menu">
        <ElPopover
          showArrow={false}
          trigger="click"
          offset={8}
          popperStyle={{ padding: '10px' }}
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
        <ElPopover>
          {{
            reference: () => (
              <li>
                <IconImage />
                <span>图片</span>
              </li>
            ),
            default: () => <span>hello world</span>,
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
        <ElTooltip content="敬请期待">
          <li>
            <IconMan />
            <span>数字人</span>
          </li>
        </ElTooltip>
      </ul>
    );
  },
});
