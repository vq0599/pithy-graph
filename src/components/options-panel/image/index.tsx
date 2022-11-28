import { defineComponent } from 'vue';
import { ElInputNumber } from 'element-plus';
import { Edit, Share, Delete } from '@element-plus/icons-vue';
import { IEImage, IEImagePayload } from '@/core';
import { mapStores } from 'pinia';
import { usePreziStore } from '@/stores/pinia';

export default defineComponent({
  name: 'pithy-image-panel',
  components: {
    Delete,
    Share,
    Edit,
  },
  computed: {
    ...mapStores(usePreziStore),
    payload(): IEImagePayload {
      return (this.preziStore.currentElement as IEImage).payload;
    },
  },
  methods: {
    handleUpdatePayload(payload: Partial<IEImagePayload>) {
      const { currentElementId, updateElement } = this.preziStore;
      updateElement(currentElementId, { payload });
    },
  },
  render() {
    return (
      <div class="pithy-common-panel">
        <div class="panel-form">
          <span>圆角</span>
          <ElInputNumber
            modelValue={this.payload.radius || 0}
            onChange={(radius) => this.handleUpdatePayload({ radius })}
            size="small"
            min={0}
            max={1000}
            step={1}
          />
        </div>
      </div>
    );
  },
});
