// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Print from '../static/assets/js/print.js'
import ECharts from 'vue-echarts/components/ECharts'

import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
  
// import user from './components/Global'

// Vue.prototype.USER = user
Vue.use(VueAxios, axios);
Vue.use(Print);
Vue.component('v-chart', ECharts)

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})