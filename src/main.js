import Vue from 'vue';
import ElementUI from 'element-ui'
import App from './App';
import router from './routes';
import './core/styles/app.scss';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});