import { createApp } from 'vue';
import App from './app';
import router from './router';
import { vEditable } from '@/utils/directives/editable';
import 'normalize.css';
import '@/styles/index.scss';

const app = createApp(App);

app.use(router);
app.directive('editable', vEditable);

app.mount('#app');
