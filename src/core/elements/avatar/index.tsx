import { defineComponent, PropType, CSSProperties } from 'vue';
import { IEAvatar, IEAvatarDisplay } from '@/core';
import './index.scss';

export default defineComponent({
  name: 'jx-element-avatar',
  props: {
    data: {
      type: Object as PropType<IEAvatar>,
      required: true,
    },
  },
  computed: {
    styles(): CSSProperties {
      const { display, background } = this.data.payload;
      if (display === IEAvatarDisplay.Circle) {
        return {
          background,
        };
      }
      return {};
    },
    src() {
      const { headImageUrl, fullImageUrl, display } = this.data.payload;
      return {
        [IEAvatarDisplay.Circle]: headImageUrl,
        [IEAvatarDisplay.Full]: fullImageUrl,
        [IEAvatarDisplay.Voice]: '',
      }[display];
    },
  },
  render() {
    const { display } = this.data.payload;
    return (
      <div
        style={this.styles}
        class={['jx-element-avatar', `jx-element-avatar-${display}`]}
      >
        {this.src && <img src={this.src} />}
      </div>
    );
  },
});
