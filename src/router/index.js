import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Chart from '@/pages/Chart'
import Approving from '@/pages/Approving'
import Approved from '@/pages/Approved'
import ApprovingDetail from '@/pages/ApprovingDetail'
import ApprovedDetail from '@/pages/ApprovedDetail'
import AllApproved from '@/pages/AllApproved'
import FormAmazeui from '@/pages/FormAmazeui'
import Supervise from '@/pages/Supervise'
import Supervise_add from '@/pages/Supervise_add'
import Supervise_detail from '@/pages/Supervise_detail'
import Supervise_setting from '@/pages/Supervise_setting'
import Supervise_wait from '@/pages/Supervise_wait'
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
      path: '/all-approved',
      name: 'AllApproved',
      component: AllApproved
    },
    {
      path: '/form-amazeui',
      name: 'FormAmazeui',
      component: FormAmazeui
    },
    {
      path: '/supervise',
      name: 'Supervise',
      component: Supervise
    },
    {
      path: '/supervise_add',
      name: 'Supervise_add',
      component: Supervise_add
    },
    {
      path: '/supervise_detail',
      name: 'Supervise_detail',
      component: Supervise_detail
    },
    {
      path: '/supervise_setting',
      name: 'Supervise_setting',
      component: Supervise_setting
    },
    {
      path: '/supervise_wait',
      name: 'Supervise_wait',
      component: Supervise_wait
    }
  ]
})
