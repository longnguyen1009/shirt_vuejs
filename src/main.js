import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// import vue-panzoom
import panZoom from 'vue-panzoom'
Vue.use(panZoom);

//axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

//jquery
import jQuery from 'jquery'
global.jquery = jQuery
global.$ = jQuery
window.$ = window.jQuery = require('jquery')

// //bootstrap-vue
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

// session
import VueSession from 'vue-session'
Vue.use(VueSession)

// vue carousel
import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
