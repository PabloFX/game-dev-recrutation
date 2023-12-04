import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';
import { VueQueryPlugin } from '@tanstack/vue-query';

import '@quasar/extras/material-icons/material-icons.css';

import 'quasar/src/css/index.sass';

import App from './App.vue';
import { router } from './router';
import { QUASAR_CONFIG } from './quasar.config';

const app = createApp(App);

app.use(Quasar, QUASAR_CONFIG);
app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);
app.mount('#app');
