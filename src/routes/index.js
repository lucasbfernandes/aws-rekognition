import Vue from 'vue';
import Router from 'vue-router';
import Main from 'modules/Main';
import Home from 'modules/Home';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
      	{
	      path: '/',
	      name: 'Home',
	      component: Home
	    }
      ]
    }
  ],
});