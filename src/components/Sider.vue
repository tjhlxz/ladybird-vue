<template>
  <div class="tpl-left-nav tpl-left-nav-hover">
    <div class="tpl-left-nav-title">
      功能列表
    </div>
    <div class="tpl-left-nav-list">
      <ul class="tpl-left-nav-menu">
        <li class="tpl-left-nav-item">
          <router-link to='/'>
            <a class="nav-link">
              <i class="am-icon-home"></i>
              <span>首页</span>
            </a>
          </router-link>
        </li>

        <li class="tpl-left-nav-item" v-if="content.staff_level==4">
          <a href="javascript:void(0);" class="nav-link tpl-left-nav-link-list">
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
                </a></router-link>

                <router-link to='/approved'>
                 <a href="已审批">
                  <i class="am-icon-angle-right"></i>
                  <span>已审批</span>
                  <i class="tpl-left-nav-content tpl-badge-primary">
                   5
                 </i></a></router-link>

                 <router-link to='/approved-form'>
                   <a href="form-news-list.html">
                    <i class="am-icon-angle-right"></i>
                    <span>审批表查询</span>

                  </a></router-link>
                </li>
              </ul>
        </li>
            <!-- ==========评估中心============================== -->

            <li class="tpl-left-nav-item" v-if="content.staff_level==5"><router-link to='/supervise-people'>
              <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                <i class="am-icon-table"></i>
                <span>督学管理</span>
              </a></router-link>
            </li>
            <!-- ====================================== -->
            <li class="tpl-left-nav-item" v-if="content.staff_level==5"><router-link to='/supervise-task'>
              <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                <i class="am-icon-table"></i>
                <span>任务管理</span>
              </a></router-link>
            </li>
            <!-- ====================================== -->
            <li class="tpl-left-nav-item" v-if="content.staff_level==5"><router-link to='/supervise-form'>
              <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                <i class="am-icon-table"></i>
                <span>审批表查询</span>
              </a></router-link>
            </li>
            <!-- =====二级教务科========================================== -->
            <li class="tpl-left-nav-item" v-if="content.staff_level==7"><router-link to='/college-teacher'>
              <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                <i class="am-icon-table"></i>
                <span>教师管理</span>
              </a></router-link>
            </li>
            <li class="tpl-left-nav-item" v-if="content.staff_level==7"><router-link to='/college-room'>
              <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                <i class="am-icon-table"></i>
                <span>教研室管理</span>
              </a></router-link>
            </li>
            <li class="tpl-left-nav-item" v-if="content.staff_level==7"><router-link to='/college-staff'>
              <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                <i class="am-icon-table"></i>
                <span>职务管理</span>
              </a></router-link>
            </li>
            <li class="tpl-left-nav-item" v-if="content.staff_level==7"><router-link to='/college-form'>
              <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
                <i class="am-icon-table"></i>
                <span>审批表查询</span>
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
      $(function() {

        $('.tpl-left-nav-link-list').on('click', function() {
          $(this).siblings('.tpl-left-nav-sub-menu').slideToggle(80)
              .end()
              .find('.tpl-left-nav-more-ico').toggleClass('tpl-left-nav-more-ico-rotate');
        })
        $('.tpl-left-nav-item').on('click', function() {

            // $(this).siblings('li').find('a').removeClass('active');
            // $(this).find('a').addClass('active')

            // if($(this).hasClass('active')){
            //     e.target.addClass('active')
            // }
            // console.log($(e.target.className.split(' ')[0]).hasClass('active'))
        })

        var $fullText = $('.admin-fullText');
        $('#admin-fullscreen').on('click', function() {
            $.AMUI.fullscreen.toggle();
        });

        
        $(document).on($.AMUI.fullscreen.raw.fullscreenchange, function() {
            $fullText.text($.AMUI.fullscreen.isFullscreen ? '退出全屏' : '开启全屏');
        });


        var dataType = $('body').attr('data-type');
        for (var key in pageData) {
            if (key == dataType) {
                pageData[key]();
            }
        }

        $('.tpl-switch').find('.tpl-switch-btn-view').on('click', function() {
            $(this).prev('.tpl-switch-btn').prop("checked", function() {
                    if ($(this).is(':checked')) {
                        return false
                    } else {
                        return true
                    }
            })
        })

        // ==========================
        // 侧边导航下拉列表
        // ==========================
        

        // ==========================
        // 头部导航隐藏菜单
        // ==========================
        $('.tpl-header-nav-hover-ico').on('click', function() {
            $('.tpl-left-nav').toggle();
            $('.tpl-content-wrapper').toggleClass('tpl-content-wrapper-hover');
        })
      })
    }
  }

</script>