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
import Control from '@modules/Admin/Control';
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
        },
        {
          path: 'about',
          name: 'about',
          component: About,
        },
        {
          path: 'picture',
          name: 'picture',
          component: Picture,
        },
        {
          path: 'result',
          name: 'result',
          component: Result,
        },
        {
          path: '/login',
          name: 'login',
          component: Login,
        },
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      redirect: '/admin/admin-login',
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
        },
        {
          path: 'control',
          name: 'control',
          component: Control
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
