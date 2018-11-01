<template>
  <div class="am-g myapp-login">
  <div class="myapp-login-logo-block  tpl-login-max">
    <div class="myapp-login-logo-text">
      <div class="myapp-login-logo-text">
        Amaze UI<span> Login</span> <i class="am-icon-skyatlas"></i>
      </div>
    </div>
    <div class="login-font">
      <i>登录</i>
    </div>
    <div class="am-u-sm-10 login-am-center">
      <form class="am-form">
        <fieldset>
          <div class="am-form-group">
            <input type="email" v-model='username' class="" id="doc-ipt-email-1" placeholder="输入学工号">
          </div>
          <div class="am-form-group">
            <input type="password" v-model='password' class="" id="doc-ipt-pwd-1" placeholder="请输入您的密码">
          </div>
          <p><button @click='login' class="am-btn am-btn-default">登录</button></p>
        </fieldset>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import _global from '../components/Global'
  export default {
    name: 'Login',
    data() {
      return {
      	username: '', 
      	password: '',

      }
    },
    methods: {
      login: function() {
        // this.axios.post('http://api.komavideo.com/news/list').then(body => {
          this.USER.user = true;
          console.log(this.$router)
          this.$router.push({path: '/'})
        // })
      }
    }
  };
</script>
