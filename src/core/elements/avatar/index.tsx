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
          transform: `translateX(calc(-50% + ${this.data.width / 2}px))`,
        };
      }
      return {};
    },
    imageStyles(): CSSProperties {
      const { display } = this.data.payload;
      if (display === IEAvatarDisplay.Circle) {
        return {
          transform: `translateX(calc(-50% + ${this.data.width / 2}px))`,
        };
      }
      return {};
    },
  },
  render() {
    const { cover, display } = this.data.payload;
    if (display === IEAvatarDisplay.Voice) return null;
    return (
      <div
        style={this.styles}
        class={['jx-element-avatar', `jx-element-avatar-${display}`]}
      >
        <img style={this.imageStyles} src={cover} />
      </div>
    );
  },
});
