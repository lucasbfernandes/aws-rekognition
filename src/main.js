import Vue from 'vue';
import Vuex from 'vuex';
import store from './core/vuex/store';
import ElementUI from 'element-ui'
import App from './App';
import router from './routes';
import './core/styles/app.scss';

Vue.use(Vuex);
Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});