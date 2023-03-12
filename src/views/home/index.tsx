import { JXImg } from '@/components/base';
import { defineComponent } from 'vue';
import JXAuthBox from '@/components/auth-box';
import './index.scss';

export default defineComponent({
  setup() {
    return {};
  },
  methods: {},
  render() {
    return (
      <div class="jx-home-page">
        <header>
          <JXImg
            src="https://pretty.jianxing.top/brand/black-name-slogan-logo.png"
            max={400}
          />
        </header>
        <main>
          <JXAuthBox />
        </main>
      </div>
    );
  },
});
