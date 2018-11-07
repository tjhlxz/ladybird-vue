<template>
  <div class="tpl-left-nav tpl-left-nav-hover" style="position:fixed">
    <div class="tpl-left-nav-title">
      功能列表
    </div>
    <div class="tpl-left-nav-list">
      <ul class="tpl-left-nav-menu">
        <li class="tpl-left-nav-item">
          <router-link to='/'>
            <a class="nav-link">
              <i class="am-icon-sm am-icon-home"></i>
              <span>首页</span>
            </a>
          </router-link>
        </li>

        <li class="tpl-left-nav-item" v-if="content.staff_level==4">
          <a href="javascript:;" class="nav-link tpl-left-nav-link-list" @click="toggle">
            <i class="am-icon-table"></i>
            <span>审批管理</span>
            <i class="am-icon-angle-right tpl-left-nav-more-ico am-fr am-margin-right"></i>
          </a>
          <ul class="tpl-left-nav-sub-menu">
            <li>
                <router-link to='/approving'>
                  <a href="待审批">
                    <i class="am-icon-angle-right"></i>
                    <span>待审批</span>
                    <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
                  </a>
                </router-link>

               <router-link to='/approved-form'>
                 <a href="审批表查询">
                  <i class="am-icon-angle-right"></i>
                  <span>审批表查询</span>
                </a>
               </router-link>
               
            </li>
          </ul>
        </li>

        <li class="tpl-left-nav-item" v-if="content.staff_level==4">
          
                <router-link to='/intelligence'>
                <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                  <i class="am-icon-graduation-cap"></i>
                  <span>学院请假率</span>
                </a></router-link>

               <router-link to='/intelligence-college'>
                <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                  <i class="am-icon-graduation-cap"></i>
                  <span>教研室请假率</span>
                </a></router-link>
            
        </li>
            <!-- ==========评估中心============================== -->

            <li class="tpl-left-nav-item" v-if="content.staff_level==5"><router-link to='/supervise-people'>
              <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                <i class="am-icon-graduation-cap"></i>
                <span>督学管理</span>
              </a></router-link>
            </li>
            <!-- ====================================== -->
            <li class="tpl-left-nav-item" v-if="content.staff_level==5"><router-link to='/supervise-task'>
              <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                <i class="am-icon-tasks"></i>
                <span>任务管理</span>
              </a></router-link>
            </li>
            <!-- ====================================== -->
            <li class="tpl-left-nav-item" v-if="content.staff_level==5"><router-link to='/supervise-form'>
              <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                <i class="am-icon-wpforms"></i>
                <span>审批表查询</span>
              </a></router-link>
            </li>
            <!-- =====二级教务科========================================== -->
            <li class="tpl-left-nav-item" v-if="content.staff_level==7"><router-link to='/college-teacher'>
              <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                <i class="am-icon-sm am-icon-male"></i>
                <span>教师管理</span>
              </a></router-link>
            </li>
            <li class="tpl-left-nav-item" v-if="content.staff_level==7"><router-link to='/college-room'>
              <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                <i class="am-icon-group"></i>
                <span>教研室管理</span>
              </a></router-link>
            </li>
            <li class="tpl-left-nav-item" v-if="content.staff_level==7"><router-link to='/college-staff'>
              <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                <i class="am-icon-graduation-cap"></i>
                <span>职务管理</span>
              </a></router-link>
            </li>
            <li class="tpl-left-nav-item" v-if="content.staff_level==7"><router-link to='/college-form'>
              <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                <i class="am-icon-table"></i>
                <span>审批表查询</span>
              </a></router-link>
            </li>
            <!-- =====超级管理员========================================== -->
            <li class="tpl-left-nav-item" v-if="content.staff_level==8"><router-link to='/admin_college'>
              <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                <i class="am-icon-fort-awesome"></i>
                <span>机构管理</span>
              </a></router-link>
            </li>
            <li class="tpl-left-nav-item" v-if="content.staff_level==8"><router-link to='/admin_people'>
              <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                <i class="am-icon-user-plus"></i>
                <span>人员管理</span>
              </a></router-link>
            </li>
            <li class="tpl-left-nav-item" v-if="content.staff_level==8"><router-link to='/admin_user'>
              <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                <i class="am-icon-odnoklassniki"></i>
                <span>角色管理</span>
              </a></router-link>
            </li>
            <li class="tpl-left-nav-item" v-if="content.staff_level==8"><router-link to='/admin_backup'>
              <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                <i class="am-icon-database"></i>
                <span>数据备份</span>
              </a></router-link>
            </li>
            <li class="tpl-left-nav-item" v-if="content.staff_level==8"><router-link to='/admin_check'>
              <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                <i class="am-icon-spinner"></i>
                <span>一键检测</span>
              </a></router-link>
            </li>
     </ul>
   </div>
 </div>
</template>

<script>
  export default {
    name: 'Sider',
    data() {
      return {
          content: {
              
          }
      }
    },
    mounted() {
      var _this = this;
      _this.content = JSON.parse(sessionStorage.getItem("data"));
    },
    methods: {
      toggle: function() {
        $('.tpl-left-nav-sub-menu').slideToggle(80)
            .end()
            .find('.tpl-left-nav-more-ico').toggleClass('tpl-left-nav-more-ico-rotate');
      }
    }
  }

</script>