import { InjectionKey, ComputedRef } from 'vue';

/**
 * 缩放比例
 */
export const scaleKey = Symbol() as InjectionKey<ComputedRef<number>>;
