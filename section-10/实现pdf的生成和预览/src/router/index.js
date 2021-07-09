import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter)

const a = {template: '<div>a</div>'}
const b = {template: '<div>b</div>'}
const Layout = {template: '<router-view></router-view>'}

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'dashboard',
      }
    ],
  },
  {
    path: '/preview',
    component: () => import('@/views/preview/index.vue'),
  },
  {
    path: '/generate',
    component: () => import('@/views/generate/index.vue'),
  },
  {
    path: '/a', component: a,
  },
  {
    path: '/b', component: b,
  },
];

const router = new VueRouter({
  routes
})

export default router;
