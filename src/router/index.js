import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/pages/Main'
import Home from '@/pages/Home'
import Upatepwd from '@/pages/Upatepwd'
import Chart from '@/pages/Chart'
import Approving from '@/pages/Approved/Approving'
import Approving_detail from '@/pages/Approved/Approving_detail'
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
import College_intelligence from '@/pages/College/College_intelligence'

import AdminUser from '@/pages/Admin/AdminUser'
import AdminCollege from '@/pages/Admin/AdminCollege'
import AdminBackup from '@/pages/Admin/AdminBackup'
import AdminPeople from '@/pages/Admin/AdminPeople'
import AdminCheck from '@/pages/Admin/AdminCheck'

import Login from '@/pages/Login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/ladybird_cms/'
    },
    {
      path: '/ladybird_cms/Login',
      name: 'Login',
      component: Login
    },
    {
      meta: {
        requireAuth: true
      },
      path: '/ladybird_cms',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/ladybird_cms',
          name: 'Home',
          component: Home
        },
        {
          path: '/ladybird_cms/approving',
          name: 'Approving',
          component: Approving
        },
        {
          path: '/ladybird_cms/approving-detail',
          name: 'Approving_detail',
          component: Approving_detail
        },
        {
          path: '/ladybird_cms/approved-form',
          name: 'Approved_form',
          component: Approved_form
        },
        {
          path: '/ladybird_cms/approved-form-detail',
          name: 'Approved_form_detail',
          component: Approved_form_detail
        },
        {
          path: '/ladybird_cms/intelligence',
          name: 'Intelligence',
          component: Intelligence
        },
        {
          path: '/ladybird_cms/intelligence-college',
          name: 'Intelligence_college',
          component: Intelligence_college
        },
        {
          path: '/ladybird_cms/all-approved',
          name: 'AllApproved',
          component: AllApproved
        },
        {
          path: '/ladybird_cms/form-amazeui',
          name: 'FormAmazeui',
          component: FormAmazeui
        },
        {
          path: '/ladybird_cms/supervise-people',
          name: 'Supervise_people',
          component: Supervise_people
        },
        {
          path: '/ladybird_cms/supervise-task',
          name: 'Supervise_task',
          component: Supervise_task
        },
        {
          path: '/ladybird_cms/supervise-form',
          name: 'Supervise_form',
          component: Supervise_form
        },
        {
          path: '/ladybird_cms/supervise-form-detail',
          name: 'Supervise_form_detail',
          component: Supervise_form_detail
        },
        {
          path: '/ladybird_cms/supervise-detail',
          name: 'Supervise_detail',
          component: Supervise_detail
        },
        {
          path: '/ladybird_cms/supervise-setting',
          name: 'Supervise_setting',
          component: Supervise_setting
        },
        {
          path: '/ladybird_cms/college-teacher',
          name: 'College_teacher',
          component: College_teacher
        },
        {
          path: '/ladybird_cms/college-room',
          name: 'College_room',
          component: College_room
        },
        {
          path: '/ladybird_cms/college-staff',
          name: 'College_staff',
          component: College_staff
        },
        {
          path: '/ladybird_cms/college-form',
          name: 'College_form',
          component: College_form
        },
        {
          path: '/ladybird_cms/college-form-detail',
          name: 'College_form_detail',
          component: College_form_detail
        },
        {
          path: '/ladybird_cms/college-intelligence',
          name: 'College_intelligence',
          component: College_intelligence
        },
        {
          path: '/ladybird_cms/admin_user',
          name: 'AdminUser',
          component: AdminUser
        },
        {
          path: '/ladybird_cms/admin_college',
          name: 'AdminCollege',
          component: AdminCollege
        },
        {
          path: '/ladybird_cms/admin_backup',
          name: 'AdminBackup',
          component: AdminBackup
        },
        {
          path: '/ladybird_cms/admin_people',
          name: 'AdminPeople',
          component: AdminPeople
        },
        {
          path: '/ladybird_cms/admin_check',
          name: 'AdminCheck',
          component: AdminCheck
        },
        {
          path: '/ladybird_cms/updatepwd',
          name: 'Upatepwd',
          component: Upatepwd
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
         path: '/ladybird_cms/Login'
       })
     }
   } else {
     next()
   }
})

export default router;