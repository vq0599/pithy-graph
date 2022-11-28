import { provide, computed, ref, inject, SetupContext, toRef } from 'vue';
import { IElement, ISlide } from '@/core/types';
import { CanvasEmits } from '@/core/shared/emits';
import PreziReadLayer from '@/core/components/read-layer';

const STORE_KEY = Symbol();

interface Props {
  width: number;
  height: number;
  readonly: boolean;
  modelValue: number;
  slide: ISlide;
}

export const useProvide = (props: Props, ctx: SetupContext<CanvasEmits>) => {
  const scale = computed(() => props.width / 1920);
  const containerIns = ref<InstanceType<typeof PreziReadLayer>>();
  const container = computed(() => containerIns.value?.$el);
  const current = computed(() =>
    props.slide.elements.find((el) => el.id === props.modelValue)
  );
  const currentIndex = computed(() =>
    props.slide.elements.findIndex((el) => el.id === props.modelValue)
  );

  const emitChange = (id: number, changes: Partial<IElement>) =>
    ctx.emit('change', id, changes);
  const emitSelect = (id: number) => ctx.emit('update:modelValue', id);
  const emitDelete = (id: number) => ctx.emit('delete', id);
  const emitPaste = (id: number) => ctx.emit('paste', id);

  const ret = {
    container,
    scale,
    moving: ref(false),
    readonly: toRef(props, 'readonly'),
    current,
    currentIndex,
    emitChange,
    emitSelect,
    emitDelete,
    emitPaste,
  };

  provide(STORE_KEY, ret);
  return Object.assign(ret, { containerIns });
};

export const useInject = () => {
  return inject(STORE_KEY) as Exclude<
    ReturnType<typeof useProvide>,
    'containerIns' // 这个不需要存入provide
  >;
};
