import Vue from 'vue'
import VueRouter from 'vue-router'
import Account from '../views/Account.vue'
import Signin from '../components/Signin.vue'
import Signup from '../components/Signup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Account',
    name: 'Account',
    redirect: '/Account/Signin',
    component: Account,
    children: [
      {
        path: 'Signin',
        name: 'Signin',
        component: Signin
      },
      {
        path: 'Signup',
        name: 'Signup',
        component: Signup
      },
      {
        path: '*',
        redirect: 'Signin'
      }
    ]
  },
  {
    path: '/Project',
    name: 'Project',
    redirect: '/Project/Management',
    component: function () {
      return import('../views/Project.vue')
    },
    children: [
      {
        path: 'Management',
        name: 'Management',
        component: function () {
          return import('../components/Management.vue')
        },
      },
      {
        path: '*',
        redirect: 'Management'
      }
    ]
  },
  {
    path: '*',
    redirect: '/Project'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
