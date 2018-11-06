import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/pages/Main'
import Home from '@/pages/Home'
import Chart from '@/pages/Chart'
import Approving from '@/pages/Approved/Approving'
import Approved from '@/pages/Approved/Approved'
import Approving_detail from '@/pages/Approved/Approving_detail'
import Approved_detail from '@/pages/Approved/Approved_detail'
import Approved_form from '@/pages/Approved/Approved_form'
import Approved_form_detail from '@/pages/Approved/Approved_form_detail'
import Intelligence from '@/pages/Approved/Intelligence'
import Intelligence_college from '@/pages/Approved/Intelligence_college'
import AllApproved from '@/pages/AllApproved'
import FormAmazeui from '@/pages/FormAmazeui'

import Supervise_people from '@/pages/Supervise/Supervise_people'
import Supervise_task from '@/pages/Supervise/Supervise_task'
import Supervise_form from '@/pages/Supervise/Supervise_form'
import Supervise_detail from '@/pages/Supervise/Supervise_detail'
import Supervise_setting from '@/pages/Supervise/Supervise_setting'
import Supervise_form_detail from '@/pages/Supervise/Supervise_form_detail'

import College_teacher from '@/pages/College/College_teacher'
import College_room from '@/pages/College/College_room'
import College_staff from '@/pages/College/College_staff'
import College_form from '@/pages/College/College_form'
import College_form_detail from '@/pages/College/College_form_detail'

import AdminUser from '@/pages/Admin/AdminUser'
import AdminCollege from '@/pages/Admin/AdminCollege'
import AdminHelp from '@/pages/Admin/AdminHelp'
import AdminBackup from '@/pages/Admin/AdminBackup'
import AdminPeople from '@/pages/Admin/AdminPeople'
import AdminCheck from '@/pages/Admin/AdminCheck'

import Login from '@/pages/Login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      meta: {
        requireAuth: true
      },
      path: '/',
      name: 'Main',
      component: Main,
      children: [
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
          name: 'Approving_detail',
          component: Approving_detail
        },
        {
          path: '/approved-detail',
          name: 'Approved_detail',
          component: Approved_detail
        },
        {
          path: '/approved-form',
          name: '/Approved_form',
          component: Approved_form
        },
        {
          path: '/approved-form-detail',
          name: '/Approved_form_detail',
          component: Approved_form_detail
        },
        {
          path: '/intelligence',
          name: '/Intelligence',
          component: Intelligence
        },
        {
          path: '/intelligence-college',
          name: '/Intelligence_college',
          component: Intelligence_college
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
          path: '/supervise-form-detail',
          name: 'Supervise_form_detail',
          component: Supervise_form_detail
        },
        {
          path: '/supervise-detail',
          name: 'Supervise_detail',
          component: Supervise_detail
        },
        {
          path: '/supervise-setting',
          name: 'Supervise_setting',
          component: Supervise_setting
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
        },
        {
          path: '/college-form-detail',
          name: 'College_form_detail',
          component: College_form_detail
        },
        {
          path: '/admin_user',
          name: 'AdminUser',
          component: AdminUser
        },
        {
          path: '/admin_college',
          name: 'AdminCollege',
          component: AdminCollege
        },
        {
          path: '/admin_backup',
          name: 'AdminBackup',
          component: AdminBackup
        },
        {
          path: '/admin_help',
          name: 'AdminHelp',
          component: AdminHelp
        },
        {
          path: '/admin_people',
          name: 'AdminPeople',
          component: AdminPeople
        },
        {
          path: '/admin_check',
          name: 'AdminCheck',
          component: AdminCheck
        }
      ]
    },
    ]
})

router.beforeEach((to, from, next) => {
   if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
     if (sessionStorage.getItem('data')) {// 判断是否登录
       next()
     } else {// 没登录则跳转到登录界面
       next({
         path: '/Login'
       })
     }
   } else {
     next()
   }
})

export default router;