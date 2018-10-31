<template>
  <div class="tpl-left-nav tpl-left-nav-hover">
    <div class="tpl-left-nav-title">
      Amaze UI 列表
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
        <li class="tpl-left-nav-item"><a href="#"></a>
          <router-link to='chart'>
            <a class="nav-link tpl-left-nav-link-list">
              <i class="am-icon-bar-chart"></i>
              <span>数据表</span>
              <i class="tpl-left-nav-content tpl-badge-danger">
               12
             </i>
           </a>
         </router-link>
       </li>

       <li class="tpl-left-nav-item"><a href="#"></a>

        <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
          <i class="am-icon-graduation-cap"></i>
          <span>督学管理</span>
          <i class="am-icon-angle-right tpl-left-nav-more-ico am-fr am-margin-right"></i>
        </a>
        <ul class="tpl-left-nav-sub-menu">
          <li>
            <router-link to='/supervise'>
              <a href="督学列表">
                <i class="am-icon-angle-right"></i>
                <span>督学列表</span>
              </a></router-link>
            </li>
            <li>
              <router-link to='/supervise_add'>        
               <a href="添加督学">
                <i class="am-icon-angle-right"></i>
                <span>添加督学</span>
              </a></router-link>
            </li>
            <li>
              <router-link to='/supervise_wait'>        
               <a href="暂未分配">
                <i class="am-icon-angle-right"></i>
                <span>暂未分配</span>
                <i class="tpl-left-nav-content tpl-badge-danger">
                 20
               </i>
              </a></router-link>
            </li>
          </ul>
        </router-link>
      </li>

      <li class="tpl-left-nav-item">
        <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
          <i class="am-icon-table"></i>
          <span>审核管理</span>
          <i class="am-icon-angle-right tpl-left-nav-more-ico am-fr am-margin-right"></i>
        </a>
        <ul class="tpl-left-nav-sub-menu">
          <li>
            <router-link to='/approving'>
              <a href="待审核">
                <i class="am-icon-angle-right"></i>
                <span>待审核</span>
                <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
              </a></router-link>

              <router-link to='/approved'>
               <a href="已审核">
                <i class="am-icon-angle-right"></i>
                <span>已审核</span>
                <i class="tpl-left-nav-content tpl-badge-primary">
                 5
               </i></a></router-link>

               <router-link to='/form-news-list'>
                 <a href="form-news-list.html">
                  <i class="am-icon-angle-right"></i>
                  <span>文字列表</span>

                </a></router-link>
              </li>
            </ul>
          </li>

          <li class="tpl-left-nav-item">
            <a href="javascript:;" class="nav-link tpl-left-nav-link-list">
              <i class="am-icon-wpforms"></i>
              <span>表单</span>
              <i class="am-icon-angle-right tpl-left-nav-more-ico am-fr am-margin-right"></i>
            </a>
            <ul class="tpl-left-nav-sub-menu" style="display: none;">
              <li>
                <router-link to='/form-amazeui'>
                  <a href="form-amazeui.html">
                    <i class="am-icon-angle-right"></i>
                    <span>Amaze UI 表单</span>
                    <i class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
                  </a></router-link>

                  <router-link to='/form-line'>
                    <a href="form-line.html">
                      <i class="am-icon-angle-right"></i>
                      <span>线条表单</span>
                    </a></router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </template>
