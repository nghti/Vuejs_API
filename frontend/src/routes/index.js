import Vue from 'vue'
import Router from 'vue-router'

import Helpers from '../utils/helpers'
import BaseLayout from '../layouts/BaseLayout'
import DashboardRoute from './modules/dashboard'
import AuthRoute from './modules/auth'

Vue.use(Router)

const AdminRoutes = [
  {
    path: '/',
    // redirect: 'dashboard',
    name: 'root.index',
    component: BaseLayout,
    children: [
      DashboardRoute,
    ]
  },
  AuthRoute,
  {
    path: '*',
    redirect: '/404',
  },
  {
    path: '/404',
    component: () => import('../views/errors/404')
  }
]

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: AdminRoutes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public)
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
  const loggedIn = !!Helpers.getToken()

  if (!isPublic && !loggedIn) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    return next('/')
  }

  to.meta.transitionName = null

  next()
})

router.beforeResolve((to, from, next) => {
  if (to.name) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }

  next()
})

export default router
