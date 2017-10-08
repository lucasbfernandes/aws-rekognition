import Vue from 'vue';
import Router from 'vue-router';
import Home from '@modules/Main/Home';
import Picture from '@modules/Main/Picture';
import Login from '@modules/Main/Login';
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
          path: 'picture',
          name: 'picture',
          component: Picture,
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    }
  ],
});
