import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import VueOnsen from 'vue-onsenui';

import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: '814988127498-eq6qcj44llof26n4i4t9nn1v58mn97la.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account',
  fetch_basic_profile: true
}
Vue.use(GAuth, gauthOption)
 

Vue.use(VueOnsen); 

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
