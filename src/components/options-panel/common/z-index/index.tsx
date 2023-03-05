import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import { usePreziStore, ZIndexOptions } from '@/stores/prezi';
import { JXFlex } from '@/components/base';
import IconHigher from '@/assets/svg/higher.svg';
import IconHighest from '@/assets/svg/highest.svg';
import IconLower from '@/assets/svg/lower.svg';
import IconLowest from '@/assets/svg/lowest.svg';
import './index.scss';

const list = [
  { label: '上移一层', value: ZIndexOptions.higher, Icon: IconHigher },
  { label: '下移一层', value: ZIndexOptions.lower, Icon: IconLower },
  { label: '移到顶层', value: ZIndexOptions.highest, Icon: IconHighest },
  { label: '移到低层', value: ZIndexOptions.lowest, Icon: IconLowest },
];

export default defineComponent({
  name: 'jx-z-index-panel',
  computed: {
    ...mapStores(usePreziStore),
  },
  methods: {
    handleSetZIndex(step: ZIndexOptions) {
      this.preziStore.updateZIndex(step);
    },
  },
  render() {
    return (
      <div class="jx-z-index-panel">
        <JXFlex justifyContent="space-between">
          {list.map(({ value, label, Icon }) => (
            <JXFlex
              class="panel-item event-enable"
              direction="column"
              alignItems="center"
              justifyContent="space-between"
              // @ts-ignore
              onClick={() => this.handleSetZIndex(value)}
            >
              <Icon />
              <span>{label}</span>
            </JXFlex>
          ))}
        </JXFlex>
      </div>
    );
  },
});
