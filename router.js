import Vue from 'vue'
import Router from 'vue-router'

import Home from './pages/index'
import Login from './pages/login'
import Register from './pages/register'
import Groups from './pages/groups'
import Students from './pages/students'
import CreateGroup from './pages/create-group'
import Group from './pages/group'
import Student from './pages/student'
import FormBuilder from './pages/form-builder'

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
        name: 'groups',
        path: '/groups',
        component: Groups
      },
      {
        name: 'form-builder',
        path: '/form-builder',
        component: FormBuilder
      },
      {
        name: 'create-group',
        path: '/create-group',
        component: CreateGroup
      },
      {
        name: 'group',
        path: '/group/:id',
        component: Group
      },
      {
        name: 'student',
        path: '/student/:id',
        component: Student
      },
      {
        name: 'students',
        path: '/students',
        component: Students
      },
      {
        name: 'register',
        path: '/new-student/:groupId?',
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
