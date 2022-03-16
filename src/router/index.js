import Vue from 'vue'
import Router from 'vue-router'
import childRoutes from '@/utils/getRoutes';
import testData from '@/utils/getTestRoutes';

const getPage = (page) => resolve => require([`@/pages/${page}/${page}`], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: getPage('home'),
      redirect: '/home',
      children: [{
        path: '/home',
        name: 'IndexPage',
        component: getPage('indexPage')
      }, {
        path: '/main',
        name: 'Main',
        component: getPage('main'),
        redirect: childRoutes[0].path,
        children: childRoutes
      },
      ...testData
      ]
    }, {
      path: '*',
      name: 'NotFound',
      component: getPage('404'),
    }
  ]
})
