import Vue from 'vue';
import Router from 'vue-router';
import Home from '@modules/Main/Home';
import Single from '@modules/Single';
import Picture from '@modules/Main/Picture';
import About from '@modules/Main/About';
import Result from '@modules/Main/Result';
import Login from '@modules/Main/Login';
import Admin from '@modules/Admin';
import Slider from '@modules/Admin/Slider';
import AdminLogin from '@modules/Admin/AdminLogin';
import Main from '@modules/Main';
import AuthGuard from '@core/utils/AuthGuard';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      redirect: '/login',
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home,
          beforeEnter: AuthGuard.innerPagesAuthentication,
        },
        {
          path: 'about',
          name: 'about',
          component: About,
          beforeEnter: AuthGuard.innerPagesAuthentication,
        },
        {
          path: 'picture',
          name: 'picture',
          component: Picture,
          beforeEnter: AuthGuard.innerPagesAuthentication,
        },
        {
          path: 'result',
          name: 'result',
          component: Result,
          beforeEnter: AuthGuard.innerPagesAuthentication,
        },
        {
          path: '/login',
          name: 'login',
          component: Login,
          beforeEnter: AuthGuard.loginPageAuthentication,
        },
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      redirect: '/admin-login',
      children: [
        {
          path: 'slider',
          name: 'slider',
          component: Slider
        },
        {
          path: 'admin-login',
          name: 'admin-login',
          component: AdminLogin
        }
      ]
    },
    {
      path: '/single/:id',
      name: 'single',
      component: Single,
    }
  ],
});
