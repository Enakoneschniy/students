import Vue from 'vue'
import Router from 'vue-router'

import Home from './pages/index'
import Login from './pages/login'
import Register from './pages/register'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        name: 'login',
        path: '/login',
        component: Login
      },
      {
        name: 'register',
        path: '/register',
        component: Register
      },
      {
        name: 'home',
        path: '/',
        component: Home
      }
    ]
  })
}
