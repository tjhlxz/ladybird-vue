<template>
  <div class="am-g">
    <div class="myapp-login-logo-block tpl-login-max" v-if="!userinfo">
      <div class="myapp-login-logo-text">
        <div class="myapp-login-logo-text">
          Amaze UI<span> Login</span> <i class="am-icon-skyatlas"></i>
        </div>
      </div>
      <div class="login-font">
        <i>Log In </i> or <span> Sign Up</span>
      </div>
      <div class="am-u-sm-10 login-am-center">
        <div class="am-form">
          <fieldset>
            <div class="am-form-group">
              <input type="text" v-model='username' class="" id="doc-ipt-email-1" placeholder="输入学工号">
            </div>
            <div class="am-form-group">
              <input type="password" v-model='password' class="" id="doc-ipt-pwd-1" placeholder="输入密码">
            </div>
            <p><button @click='login' class="am-btn am-btn-default">登录</button></p>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _global from '@/components/Global';


  export default {
    name: 'Login',
    data() {
      return {username: '', password: '',userinfo: false}
    },
    
    methods: {
      login: function() {
        var _this = this;
        var loading=AMUI.dialog.loading({
          title:'正在登录'
        });
        var params = new URLSearchParams();
        params.append('staff_id', _this.username);
        params.append('pwd', _this.password);
        _this.axios.post(_global.baseUrl + 'cmsLogin',params).then(res => {

          if(res.data.status==200) {
            _this.userinfo = true;
            loading.modal('close');
            AMUI.dialog.alert({
              content: res.data.message
            });
            
            sessionStorage.setItem('data', JSON.stringify(res.data.data));
            _this.$router.push({name: 'Home'})
          }
          else if(res.data.status==400) {
            loading.modal('close');

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