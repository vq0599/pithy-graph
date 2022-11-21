import { createApp } from 'vue';
import App from './app';
import { router } from './router';
import { vEditable } from '@/utils/directives/editable';
import 'normalize.css';
import '@/styles/index.scss';
import VueLazyLoad from 'vue-lazyload';
import placeholder from '@/assets/placeholder.png';

const app = createApp(App);

app.use(router);
app.directive('editable', vEditable);
app.use(VueLazyLoad, {
  preLoad: 1,
  loading: placeholder,
});

app.mount('#app');
