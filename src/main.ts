import { createApp } from 'vue';
import App from './app';
import { router } from './router';
import 'normalize.css';
import '@/styles/index.scss';
import VueLazyLoad from 'vue-lazyload';
import placeholder from '@/assets/placeholder.png';
import { createPinia } from 'pinia';
import ContextMenu from '@imengyu/vue3-context-menu';

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(VueLazyLoad, {
  preLoad: 1,
  loading: placeholder,
});
app.use(ContextMenu);

app.mount('#app');
