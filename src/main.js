import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store';

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
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// Vue.use(BootstrapVue)

// vue carousel
import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

//VueLazyload
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

new Vue({
  router,store,
  render: (h) => h(App),
}).$mount("#app");
