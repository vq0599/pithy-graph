import { defineComponent } from 'vue';
import { IEText, IETextPayload } from '@/core';
import { mapStores } from 'pinia';
import { usePreziStore } from '@/stores/prezi';
import {
  RectAndSizePanel,
  AnimationPanel,
  ZIndexPanel,
  ShadowPanel,
} from '../common';
import FontPanel from './font';
import './index.scss';

export default defineComponent({
  name: 'jx-text-panel',
  computed: {
    ...mapStores(usePreziStore),
    payload(): IETextPayload {
      return (this.preziStore.currentElement as IEText).payload;
    },
  },
  methods: {
    handleUpdatePayload(payload: Partial<IETextPayload>) {
      const { currentElementId, updateElement } = this.preziStore;
      updateElement(currentElementId, { payload });
    },
  },
  render() {
    return (
      <div class="jx-text-panel">
        <RectAndSizePanel />
        <hr />
        <FontPanel />
        <hr />
        <AnimationPanel />
        <hr />
        <ShadowPanel />
        <hr />
        <ZIndexPanel />
      </div>
    );
  },
});
