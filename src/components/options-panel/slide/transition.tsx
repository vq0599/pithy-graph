import { computed, defineComponent, ref } from 'vue';
import { JXButton } from '@/components/base';
import { ElPopover } from 'element-plus';
import IconFade from '@/assets/svg/animation/fade.svg?component';
import IconSlideLeft from '@/assets/svg/animation/slide-left.svg?component';
import IconSlideRight from '@/assets/svg/animation/slide-right.svg?component';
import { usePreziStore } from '@/stores';
import './index.scss';

const library = [
  {
    type: 'fade',
    label: '渐隐/渐显',
    Icon: IconFade,
  },
  {
    type: 'slideInLeft',
    label: '往左推出',
    Icon: IconSlideLeft,
  },
  {
    type: 'slideInRight',
    label: '往右推出',
    Icon: IconSlideRight,
  },
];

export default defineComponent({
  name: 'jx-slide-panel-transition',
  setup() {
    const preziStore = usePreziStore();
    const transition = computed(() => {
      return preziStore.workspace.transition;
    });
    const label = computed(() => {
      const target = library.find(({ type }) => type === transition.value);
      return target?.label || '无';
    });

    const visible = ref(false);
    return {
      label,
      transition,
      preziStore,
      visible,
    };
  },
  methods: {
    setTransition(transition: string) {
      this.preziStore.updateWorkspace({ transition });
    },
    renderAnimationGrid() {
      return (
        <div class="jx-transition-panel">
          <ul>
            {library.map(({ type, label, Icon }) => (
              <li
                key={type}
                class={[
                  'event-enable',
                  {
                    active: type === this.transition,
                  },
                ]}
                onClick={() => this.setTransition(type)}
              >
                <Icon />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    },
  },
  render() {
    return (
      <ElPopover
        v-model:visible={this.visible}
        // trigger="focus"
        trigger="click"
        showArrow={false}
        placement="left"
        hideAfter={0}
        width={290}
        popperStyle={{ padding: 0 }}
      >
        {{
          reference: () => (
            <JXButton width="100%" type="action">
              {this.label}
            </JXButton>
          ),
          default: this.renderAnimationGrid,
        }}
      </ElPopover>
    );
  },
});
