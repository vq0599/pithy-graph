import { computed, defineComponent, ref } from 'vue';
import { usePreziStore, useEditorStore } from '@/stores';
import { SlideAPI } from '@/api';
import { IEShape } from '@/core';
import ShapeEntry from '@/core/elements/shape';
import { JXFlex } from '@/components/base';
import { pick } from 'lodash-es';
import './index.scss';

export default defineComponent({
  setup() {
    const preziStore = usePreziStore();
    const editorStore = useEditorStore();

    const samples = ref<IEShape[]>([]);
    const filterByIds = (ids: number[]) => {
      return computed(() => {
        return ids.map((id) => {
          return samples.value.find((sample) => sample.id === id)!;
        });
      });
    };
    const fillSamples = filterByIds([245, 242, 256, 249, 254]);
    const strokeSamples = filterByIds([243, 244, 255, 248, 253]);
    const lineSamples = filterByIds([252, 250, 251]);
    return {
      samples,
      fillSamples,
      strokeSamples,
      lineSamples,
      preziStore,
      editorStore,
    };
  },
  mounted() {
    this.fetchSample();
  },
  methods: {
    async fetchSample() {
      const { data } = await SlideAPI.get(19);
      this.samples = data.elements;
    },
    handleSelect(shape: IEShape) {
      this.preziStore.createElement('SHAPE', {
        x: 100,
        y: 500,
        ...pick(shape, [
          'payload',
          'enterAnimation',
          'leaveAnimation',
          'width',
          'height',
        ]),
      });
      this.editorStore.closeMenu('SHAPE');
    },
    renderSamples(samples: IEShape[]) {
      return (
        <JXFlex tag="ul" class="element-wrapper" gap="16px" alignItems="center">
          {samples.map((shape) => {
            return (
              <li onClick={() => this.handleSelect(shape)}>
                <ShapeEntry data={shape} />
              </li>
            );
          })}
        </JXFlex>
      );
    },
  },
  render() {
    if (!this.samples.length) return null;
    return (
      <div class="jx-shape-menu">
        <div>
          <span>基础图形</span>
          {this.renderSamples(this.fillSamples)}
          {this.renderSamples(this.strokeSamples)}
        </div>
        <div class="mt-3">
          <span>线条与箭头</span>
          {this.renderSamples(this.lineSamples)}
        </div>
      </div>
    );
  },
});
