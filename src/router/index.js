import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '_v/Home/index.vue';
import loadable from '@/utils/loadable';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: loadable(() => import(/* webpackChunkName: "about" */ '_v/About/index.vue')),
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes,
});

export default router;
