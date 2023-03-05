import { defineComponent } from 'vue';
import {
  RectAndSizePanel,
  AnimationPanel,
  ZIndexPanel,
  ShadowPanel,
  AlphaPanel,
} from '../common';
import FilterPanel from './filter';
import './index.scss';

export default defineComponent({
  name: 'jx-image-panel',
  render() {
    return (
      <div class="jx-image-panel">
        <RectAndSizePanel />
        <hr />
        <FilterPanel />
        <hr />
        <AlphaPanel />
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
