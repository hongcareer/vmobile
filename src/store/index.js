import Vue from 'vue';
import Vuex from 'vuex';
import dashbord from './modules/dashbord'
Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    dashbord,
  }
})

