import Vue from 'vue';
import Vuex from 'vuex';
import store from './core/vuex/store';
import ElementUI from 'element-ui'
import App from './App';
import router from './routes';
import AWS from 'aws-sdk';
import './core/styles/app.scss';

require('font-awesome-sass-loader');

AWS.config.region = 'us-east-1';

Vue.use(Vuex);
Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
