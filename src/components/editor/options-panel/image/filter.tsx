import { usePreziStore } from '@/stores';
import { computed, defineComponent } from 'vue';
import { JXFlex } from '@/components/base';
import { IEImagePayload } from '@/core';
import { ElSwitch } from 'element-plus';

const filterLibrary = [
  {
    type: 'inkwell',
    filter:
      'blur(0px) sepia(30%) brightness(110%) contrast(110%) grayscale(100%)',
  },
  {
    type: 'Amaro',
    filter: 'blur(0px) brightness(110%) contrast(90%) saturate(150%)',
  },
  {
    type: 'Brannan',
    filter: 'blur(0px) sepia(50%) contrast(140%)',
  },
  {
    type: 'Maven',
    filter: 'blur(0px) sepia(25%) brightness(95%) contrast(95%) saturate(150%)',
  },
  {
    type: 'Helena',
    filter: 'blur(0px) sepia(15%) saturate(130%) hue-rotate(-30deg)',
  },
  { type: 'Gaussian', filter: 'blur(1px)' },
];

export default defineComponent({
  name: 'jx-image-filter-panel',
  setup(this) {
    const preziStore = usePreziStore();
    const payload = computed(() => {
      return preziStore.currentElement?.payload as IEImagePayload;
    });
    return {
      payload,
      preziStore,
    };
  },
  methods: {
    setImage(payload: Partial<IEImagePayload>) {
      const { currentElementId, updateElement } = this.preziStore;
      updateElement(currentElementId, { payload });
    },
    handleFilterChange(val: boolean) {
      this.setImage({ filter: val ? 'inkwell' : '' });
    },
    handleSelect(filter: string) {
      this.setImage({ filter });
    },
  },
  render() {
    return (
      <div class="jx-image-filter-panel">
        <JXFlex class="mb-2" justifyContent="space-between" alignItems="center">
          <span>滤镜</span>
          <ElSwitch
            modelValue={!!this.payload.filter}
            // @ts-ignore
            onChange={this.handleFilterChange}
          ></ElSwitch>
        </JXFlex>
        {this.payload.filter && (
          <JXFlex tag="ul" wrap="wrap" class="panel-images">
            {filterLibrary.map(({ type, filter }) => (
              <li
                class={{ active: type === this.payload.filter }}
                key={type}
                onClick={() => this.handleSelect(type)}
              >
                <img
                  style={{ filter }}
                  title={type}
                  src={this.payload.url}
                ></img>
              </li>
            ))}
          </JXFlex>
        )}
      </div>
    );
  },
});
