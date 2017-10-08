import Vue from 'vue';
import Router from 'vue-router';
import Home from '@modules/Main/Home';
import Picture from '@modules/Main/Picture';
import About from '@modules/Main/About';
import Result from '@modules/Main/Result';
import Login from '@modules/Login';
import Admin from '@modules/Admin';
import Main from '@modules/Main';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
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
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    }
  ],
});
