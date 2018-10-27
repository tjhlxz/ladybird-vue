import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Chart from '@/pages/Chart'
import Approving from '@/pages/Approving'
import Approved from '@/pages/Approved'
import ApprovingDetail from '@/pages/ApprovingDetail'
import ApprovedDetail from '@/pages/ApprovedDetail'
import FormNewsList from '@/pages/FormNewsList'
import FormAmazeui from '@/pages/FormAmazeui'
import Login from '@/pages/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/chart',
      name: 'Charts',
      component: Chart
    },
    {
      path: '/approving',
      name: 'Approving',
      component: Approving
    },
    {
      path: '/approved',
      name: 'Approved',
      component: Approved
    },
    {
      path: '/approving-detail',
      name: 'ApprovingDetail',
      component: ApprovingDetail
    },
    {
      path: '/approved-detail',
      name: 'ApprovedDetail',
      component: ApprovedDetail
    },
    {
      path: '/form-news-list',
      name: 'FormNewsList',
      component: FormNewsList
    },
    {
      path: '/form-amazeui',
      name: 'FormAmazeui',
      component: FormAmazeui
    },
  ]
})
