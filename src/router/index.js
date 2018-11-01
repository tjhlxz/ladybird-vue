import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Chart from '@/pages/Chart'
import Approving from '@/pages/Approved/Approving'
import Approved from '@/pages/Approved/Approved'
import ApprovingDetail from '@/pages/Approved/ApprovingDetail'
import ApprovedDetail from '@/pages/Approved/ApprovedDetail'
import AllApproved from '@/pages/AllApproved'
import FormAmazeui from '@/pages/FormAmazeui'

import Supervise_people from '@/pages/Supervise/Supervise_people'
import Supervise_task from '@/pages/Supervise/Supervise_task'
import Supervise_form from '@/pages/Supervise/Supervise_form'

import College_teacher from '@/pages/College/College_teacher'
import College_room from '@/pages/College/College_room'
import College_staff from '@/pages/College/College_staff'
import College_form from '@/pages/College/College_form'

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
      path: '/supervise-people',
      name: 'Supervise_people',
      component: Supervise_people
    },
    {
      path: '/supervise-task',
      name: 'Supervise_task',
      component: Supervise_task
    },
    {
      path: '/supervise-form',
      name: 'Supervise_form',
      component: Supervise_form
    },
    {
      path: '/college-teacher',
      name: 'College_teacher',
      component: College_teacher
    },
    {
      path: '/college-room',
      name: 'College_room',
      component: College_room
    },
    {
      path: '/college-staff',
      name: 'College_staff',
      component: College_staff
    },
    {
      path: '/college-form',
      name: 'College_form',
      component: College_form
    }
  ]
})
