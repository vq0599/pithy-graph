import { defineComponent } from 'vue';
import SlidePanel from './slide';
import TextPanel from './text';
import ShapePanel from './shape';
import ImagePanel from './image';
// import CommonPanel from './common';
import { IElementTypes } from '@/core';
import { mapStores } from 'pinia';
import { usePreziStore } from '@/stores/prezi';
import './index.scss';

export default defineComponent({
  name: 'pithy-options-panel',
  computed: {
    ...mapStores(usePreziStore),
    currentName(): IElementTypes | 'SLIDE' {
      const { currentElement } = this.preziStore;
      return currentElement?.type || 'SLIDE';
    },
  },
  methods: {
    renderChildPanel() {
      switch (this.currentName) {
        case 'SLIDE':
          return <SlidePanel />;
        case 'TEXT':
          return <TextPanel />;
        case 'IMAGE':
          return <ImagePanel />;
        case 'SHAPE':
          return <ShapePanel />;
        default:
          return null;
      }
    },
  },

  render() {
    const { currentElement } = this.preziStore;
    return (
      <div class="pithy-options-panels">
        {this.renderChildPanel()}
        {/* <ElTabs stretch={true}>
          <ElTabPane label={this.currentName}>
            {this.renderChildPanel()}
          </ElTabPane>
          {currentElement && (
            <ElTabPane label="通用">
              <CommonPanel />
            </ElTabPane>
          )}
        </ElTabs> */}
      </div>
    );
  },
});
