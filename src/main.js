import Vue from "vue";
import App from "./App.vue";
import router from "./router";

//axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

//jquery
import jQuery from 'jquery'
global.jquery = jQuery
global.$ = jQuery
window.$ = window.jQuery = require('jquery')

//bootstrap-vue
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

import './assets/js/common.js'

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
