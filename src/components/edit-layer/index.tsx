import { canvasStore } from '@/stores/canvas';
import { editLayerStore } from '@/stores/edit-layer';
import { preziStore } from '@/stores/prezi';
import { IElement } from '@/structs';
import { parseStyles } from '@/utils/parse-styles';
import { CSSProperties, defineComponent, PropType } from 'vue';
import './index.scss';

export default defineComponent({
  props: {
    canvas: {
      type: Object as PropType<HTMLDivElement>,
    },
  },
  setup() {
    // watch([])
  },
  computed: {
    styles(): CSSProperties {
      if (!preziStore.currentElement) return {};
      const { width, height } = editLayerStore;
      const { x, y, rotate } = preziStore.currentElement;
      const { scale } = canvasStore;
      // +10/-5: 留点空隙更便于看光标
      return parseStyles({
        width: width * scale,
        height: height * scale,
        x: x * scale,
        y: y * scale,
        rotate,
      });
    },
  },
  methods: {
    handleMouseDown(startEvent: MouseEvent) {
      startEvent.stopPropagation();
      if (!preziStore.currentElement) return;
      const { width: oldWidth, height: oldHeight } = editLayerStore;
      const callback = (moveEvent: MouseEvent) => {
        if (!preziStore.currentElement) return;
        const threshold = 10;
        const distX = moveEvent.pageX - startEvent.pageX;
        const distY = moveEvent.pageY - startEvent.pageY;
        if (Math.abs(distX) < threshold && Math.abs(distY) < threshold) {
          return;
        }
        const width = oldWidth + distX / canvasStore.scale;
        const height = oldHeight + distY / canvasStore.scale;
        if (width < 50 || height < 50) return;
        const changes: Partial<Pick<IElement, 'height' | 'width'>> = {};
        switch (preziStore.currentElement.type) {
          case 'TEXT':
            changes.width = width;
            break;
          default:
            changes.width = width;
            changes.height = height;
            break;
        }
        preziStore.updateElement(changes);
      };
      document.onmousemove = callback;
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        preziStore.save();
      };
    },
    renderAlignLines() {
      const { scale } = canvasStore;
      const { vLines, hLines } = editLayerStore;
      const VLines = vLines.map(({ length, value, origin }) => (
        <span
          class="v-line"
          style={{
            transform: `translate(${value * scale}px, ${origin * scale}px)`,
            height: `${length * scale}px`,
          }}
        />
      ));
      const HLines = hLines.map(({ length, value, origin }) => (
        <span
          class="h-line"
          style={{
            transform: `translate(${origin * scale}px, ${value * scale}px)`,
            width: `${length * scale}px`,
          }}
        />
      ));
      return VLines.concat(HLines);
    },
  },
  render() {
    return (
      <div class="pithy-edit-layer">
        {preziStore.currentElement && (
          <div class="pithy-edit-box" style={this.styles}>
            {/* <i class="action-vertical action-vertical-left"></i>
              <i class="action-vertical action-vertical-right"></i>
              <i class="action-horizontal action-horizontal-top"></i>
              <i class="action-horizontal action-horizontal-bottom"></i> */}
            <i
              class="action-vertex action-vertex-bottom-right"
              onMousedown={this.handleMouseDown}
            ></i>
          </div>
        )}
        {this.renderAlignLines()}
      </div>
    );
  },
});
