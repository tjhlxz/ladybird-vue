// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Print from '../static/assets/js/jQuery.print.js'
  
import user from './components/Global'

Vue.prototype.USER = user;
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;


import router from './router'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})