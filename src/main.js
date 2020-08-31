import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button, Form, FormItem, Input, Icon, Select, Option, Message, Menu, MenuItem, Submenu, Divider } from 'view-design'
import 'view-design/dist/styles/iview.css'

Vue.component('i-button', Button)
Vue.component('i-form', Form)
Vue.component('i-formItem', FormItem)
Vue.component('i-input', Input)
Vue.component('i-icon', Icon)
Vue.component('i-select', Select)
Vue.component('i-option', Option)
Vue.component('i-menu', Menu)
Vue.component('i-menuItem', MenuItem)
Vue.component('i-submenu', Submenu)
Vue.component('i-divider', Divider)
Vue.prototype.$Message = Message
Vue.prototype.$Message.config({
  top: 50,
  duration: 1
});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
