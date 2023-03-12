import { computed, defineComponent, PropType } from 'vue';
import { IUser } from '@/structs';
import './index.scss';

const defaultUrl = 'https://pretty.jianxing.top/grocery/avatar-placeholder.png';

export default defineComponent({
  name: 'jx-avatar',
  props: {
    user: Object as PropType<IUser>,
  },
  setup(props) {
    const url = computed(() => {
      return props.user?.avatar || defaultUrl;
    });
    return {
      url,
    };
  },
  render() {
    return <img class="jx-avatar" src={this.url} alt="" />;
  },
});
