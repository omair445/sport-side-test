import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthGuard from './utils/auth.guard';
import { adminRoot } from './constants/config';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "dashboards" */ './views/app/dashboards'),
    redirect: `${adminRoot}/dashboards/default`,
  },
  {
    path: adminRoot,
    component: () => import(/* webpackChunkName: "app" */ './views/app'),
    redirect: `${adminRoot}/dashboards`,
    meta: { loginRequired: true },
    children: [
      {
        path: 'dashboards',
        component: () => import(/* webpackChunkName: "dashboards" */ './views/app/dashboards'),
        redirect: `${adminRoot}/dashboards/default`,
        children: [
          {
            path: 'default',
            component: () => import(/* webpackChunkName: "dashboards" */ './views/app/dashboards/Default'),
          },
          {
            path: 'sportdetail/:id',
            component: () => import(/* webpackChunkName: "components" */ './views/app/ui/components/Jumbotron'),
            props: true,
          },
          {
            path: 'user/liked/sports',
            component: () => import(/* webpackChunkName: "dashboards" */ './views/app/dashboards/UserLikedDefault'),
            props: true,
          },
        ],
      },
    ],
  },
  {
    path: '/error',
    component: () => import(/* webpackChunkName: "error" */ './views/Error'),
  },
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "user" */ './views/user'),
    redirect: '/user/login',
    children: [
      {
        path: 'login',
        component: () => import(/* webpackChunkName: "user" */ './views/user/Login'),
      },
      {
        path: 'register',
        component: () => import(/* webpackChunkName: "user" */ './views/user/Register'),
      },
    ],
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "error" */ './views/Error'),
  },
];

const router = new VueRouter({
  linkActiveClass: 'active',
  routes,
  mode: 'history',
});
router.beforeEach(AuthGuard);
export default router;
