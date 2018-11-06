<template>
  <div class="am-topbar am-topbar-inverse admin-header">
        <div class="am-topbar-brand">
            <a href="javascript:;" class="tpl-logo">
                <img src="../../static/assets/img/logo1.jpg" alt="" width="60px" height="60px">
            </a>
        <label>审批系统后台管理</label>
        </div>
        <div class="am-icon-list tpl-header-nav-hover-ico am-fl am-margin-right">

        </div>

        <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only" data-am-collapse="{target: '#topbar-collapse'}"><span class="am-sr-only">导航切换</span> <span class="am-icon-bars"></span></button>

        <div class="am-collapse am-topbar-collapse" id="topbar-collapse">

            <ul class="am-nav am-nav-pills am-topbar-nav am-topbar-right admin-header-list tpl-header-list">
                <li class="am-hide-sm-only"><a href="javascript:;" id="admin-fullscreen" class="tpl-header-list-link"><span class="am-icon-arrows-alt"></span> <span class="admin-fullText">开启全屏</span></a></li>

                <li class="am-dropdown" data-am-dropdown data-am-dropdown-toggle>
                    <a class="am-dropdown-toggle tpl-header-list-link" href="javascript:;">
                        你好，<span class="tpl-header-list-user-nick">{{level}}</span><span class="tpl-header-list-user-ico"></span>
                    </a>
                </li>
                <li @click="logout"><a href="javascript:;" class="tpl-header-list-link">退出登录&nbsp;<span class="am-icon-sign-out tpl-header-list-ico-out-size"></span></a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'Header',
        data() {
            return {
                level: ''
            }
        },
        mounted() {
            this.level = JSON.parse(sessionStorage.getItem("data")).staff_name;
        },
        methods: {

            logout: function() {
                var _this = this;
                AMUI.dialog.confirm({
            content: '确定要退出登录吗？',
            onConfirm: function() {
                sessionStorage.clear();
                _this.$router.push({name: 'Main'})
            }
        })
            }
        }
    }
</script>

<style scoped>

</style>
