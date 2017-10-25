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
  created: function() {
    var _this = this;

    window.fbAsyncInit = function() {

      FB.init({
        appId      : '275688566274356',
        cookie     : true,
        xfbml      : true,
        status     : true,
        version    : 'v2.10'
      });
      FB.AppEvents.logPageView();

      if (_this.$route.name.indexOf('admin') === -1) {
        FB.getLoginStatus(function(response) {
          document.querySelector('#authentication-loader').style.display = "none";
          if (response.status === 'connected') {
            window.localStorage.setItem('FBLogin', JSON.stringify(response));
          }
          if (_this.$route.name === 'login') {
            if (response.status === 'connected') {
              _this.$router.push({ path: '/home' });
            }
          } else {
            if (response.status !== 'connected') {
              _this.$router.push({ path: '/login' });
            } else if (_this.$route.name !== 'home') {
              _this.$router.push({ path: '/home' });
            }
          }
        });
      } else {
        document.querySelector('#authentication-loader').style.display = "none";
      }
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  },
  router,
  store,
  template: '<App/>',
  components: { App }
});
