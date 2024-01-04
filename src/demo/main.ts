import { Component, createApp, h } from 'vue';
import { RouteRecordRaw, RouterView, createRouter, createWebHashHistory } from 'vue-router';
import './style.css';
import App from './App.vue';

const routes: RouteRecordRaw[] = [{ path: '/', component: App }];

const modules = import.meta.glob('./routes/*/page.vue');

for (const [fname, module] of Object.entries(modules)) {
  const name = fname.replace('./routes/', '').replace('/page.vue', '');
  routes.push({
    name,
    path: '/' + name.toLowerCase(),
    component: module as () => Component,
  });
}

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

// 5. Create and mount the root instance.
const app = createApp({
  render: () => h(RouterView),
});
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router);

app.mount('#app');

// Now the app has started!
