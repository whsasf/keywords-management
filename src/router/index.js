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
        redirect: '/Account/Signin'
      }
    ]
  },
  {
    path: '/Main',
    name: 'Main',
    redirect: '/Main/Management',
    component: function () {
      return import('../views/Main.vue')
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
        path: 'Project/:project',
        name: 'project',
        redirect: '/Main/Project/:project/Url',
        component: function () {
          return import('../components/Project.vue')
        },
        children: [
          {
            path: 'Url',
            name: 'Url',
            component: function () {
              return import('../components/Url.vue')
            }
          },
          {
            path: 'Articles',
            name: 'Articles',
            component: function () {
              return import('../components/Articles.vue')
            }
          },
          {
            path: 'basicWords',
            name: 'basicWords',
            component: function () {
              return import('../components/basicWords.vue')
            }
          },
          {
            path: 'extendedWords',
            name: 'extendedWords',
            component: function () {
              return import('../components/extendedWords.vue')
            }
          },
          {
            path: 'ignoreDict',
            name: 'ignoreDict',
            component: function () {
              return import('../components/ignoreDict.vue')
            }
          },

          {
            path: 'userDict',
            name: 'userDict',
            component: function () {
              return import('../components/userDict.vue')
            }
          },
          {
            path: 'invalidDict',
            name: 'invalidDict',
            component: function () {
              return import('../components/invalidDict.vue')
            }
          },
          {
            path: 'usageTag',
            name: 'usageTag',
            component: function () {
              return import('../components/usageTag.vue')
            }
          },
          {
            path: '*',
            redirect: '/Main/Project/:project/Url'
          },
        ]
      },
      {
        path: '*',
        redirect: 'Management'
      }
    ]
  },
  {
    path: '*',
    redirect: '/Main'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
