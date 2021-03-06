import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/icon.css';
import VuePapaParse from 'vue-papa-parse'
Vue.use(VuePapaParse)

import {Button, Form, FormItem, Input, Icon, Select, Option, Message, Menu, MenuItem, Submenu, Tabs, TabPane, Row, Col, Table, Modal, Card, Page, Layout, Sider, Header, Content,Poptip,Upload,Dropdown,DropdownMenu,DropdownItem  } from 'view-design'
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
Vue.component('i-tabs', Tabs)
Vue.component('i-tabPane', TabPane)
Vue.component('i-row', Row)
Vue.component('i-col', Col)
Vue.component('i-table', Table)
Vue.component('i-modal', Modal)
Vue.component('i-card', Card)
Vue.component('i-page', Page)
Vue.component('i-layout', Layout)
Vue.component('i-sider', Sider)
Vue.component('i-header', Header)
Vue.component('i-content', Content)
Vue.component('i-poptip', Poptip)
Vue.component('i-upload', Upload)
Vue.component('i-dropdown', Dropdown)
Vue.component('i-dropdownMenu', DropdownMenu)
Vue.component('i-dropdownItem', DropdownItem)

Vue.prototype.$Message = Message
Vue.prototype.$Message.config({
  top: 50,
  duration: 1
});


Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
