import { computed, defineComponent, PropType, ref } from 'vue';
import { ResourceAPI } from '@/api';
import { IResource } from '@/structs';
import './index.scss';

export default defineComponent({
  name: 'JXUserMediaList',
  props: {
    fileType: {
      type: String as PropType<'image' | 'video' | 'media'>,
      default: 'media',
    },
  },
  setup(props) {
    const resourceList = ref<IResource[]>([]);
    const fetchFn = computed(() => {
      switch (props.fileType) {
        case 'media':
          return ResourceAPI.getMediaList;
        case 'image':
          return ResourceAPI.getImageList;
        case 'video':
          return ResourceAPI.getVideoList;
      }
      return ResourceAPI.getMediaList;
    });
    return {
      fetchFn,
      resourceList,
    };
  },
  mounted() {
    this.fetchResourceList();
  },
  emits: {
    select: (
      _resource: IResource,
      _payload: { naturalHeight: number; naturalWidth: number }
    ) => true,
  },
  methods: {
    async fetchResourceList() {
      const { data: resourceList } = await this.fetchFn();
      this.resourceList = resourceList.reverse();
    },
    reload() {
      this.fetchResourceList();
    },
    handleSelect(ev: MouseEvent, resource: IResource) {
      let naturalHeight: number, naturalWidth: number;
      if (resource.mimeType.startsWith('video')) {
        naturalHeight = (ev.target as HTMLVideoElement).videoHeight;
        naturalWidth = (ev.target as HTMLVideoElement).videoWidth;
      } else {
        naturalHeight = (ev.target as HTMLImageElement).naturalHeight;
        naturalWidth = (ev.target as HTMLImageElement).naturalWidth;
      }
      this.$emit('select', resource, { naturalHeight, naturalWidth });
    },
  },
  render() {
    return (
      <div class="jx-user-media-list">
        {this.resourceList.map((resource) => {
          const props = {
            onClick: (ev: MouseEvent) => this.handleSelect(ev, resource),
            key: resource.id,
            src: resource.url,
          };
          const Tag = resource.mimeType.startsWith('video') ? 'video' : 'img';
          return <Tag {...props} />;
        })}
      </div>
    );
  },
});
