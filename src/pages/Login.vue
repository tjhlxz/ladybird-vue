<template>
  <div class="am-g">
    <div class="myapp-login-logo-block  tpl-login-max" v-if="!user">
      <div class="myapp-login-logo-text">
        <div class="myapp-login-logo-text">
          Amaze UI<span> Login</span> <i class="am-icon-skyatlas"></i>
        </div>
      </div>
      <div class="login-font">
        <i>Log In </i> or <span> Sign Up</span>
      </div>
      <div class="am-u-sm-10 login-am-center">
        <form class="am-form">
          <fieldset>
            <div class="am-form-group">
              <input type="text" v-model='username' class="" id="doc-ipt-email-1" placeholder="输入学工号">
            </div>
            <div class="am-form-group">
              <input type="password" v-model='password' class="" id="doc-ipt-pwd-1" placeholder="输入密码">
            </div>
            <p><button @click='login' class="am-btn am-btn-default">登录</button></p>
          </fieldset>
        </form>
      </div>
    </div>
    <Header class="hidden" style="visibility: hidden;"></Header>
    <Sider class="hidden" style="visibility: hidden;margin-top: 90px;"></Sider>
    <router-view v-if="user" style="background-color: #E9EDF3;"></router-view>
  </div>
</template>

<script>
  import Header from '@/components/Header';
  import Sider from '@/components/Sider';
  import _global from '@/components/Global';


  export default {
    name: 'Login',
    data() {
      return {username: '', password: '',user: false}
    },
    components: {Header, Sider},
    methods: {
      login: function() {
        var loading=AMUI.dialog.loading({
          title:'正在登录'
        });
        var params = new URLSearchParams();
        params.append('staff_id', this.username);
        params.append('pwd', this.password);
        this.axios.post(_global.baseUrl + 'cmsLogin',params).then(res => {

          if(res.data.status==200){
            loading.modal('close')
            AMUI.dialog.alert({
              content: res.data.message
            });
            
            localStorage.setItem('data',JSON.stringify(res.data.data));
            // var list = JSON.parse(localStorage.getItem("data"));
            // console.log(list);
            this.user = true;
            $('.hidden').css('visibility','visible');
          }
          else if(res.data.status==400){
            loading.modal('close')

            AMUI.dialog.alert({
              content: res.data.message
            });
          };
          // this.USER.user = true;
          // console.log(this.$router)
          // this.$router.push({path: '/'})
        })
      }
    }
  };
</script>