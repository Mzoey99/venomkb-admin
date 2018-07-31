import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);

// import vSelect from './components/Select.vue'
// Vue.component('v-select', vSelect)


// Specific components
import { ModelListSelect, MultiListSelect  } from 'vue-search-select'
Vue.component('v-select', ModelListSelect )
Vue.component('v-multiple-select', MultiListSelect)

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'

// router setup
import routes from './routes/routes'
// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)

Vue.use

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active',
  mode: 'history'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
