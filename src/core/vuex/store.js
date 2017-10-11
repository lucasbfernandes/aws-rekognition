import Vue from 'vue';
import Vuex from 'vuex';
import Loading from './modules/loading';

Vue.use(Vuex);

const store = new Vuex.Store({
  ...Loading,
});

export default store;