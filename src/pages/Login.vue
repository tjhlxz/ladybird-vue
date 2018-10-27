<template>
  <div class="am-g myapp-login">
  <div class="myapp-login-logo-block  tpl-login-max">
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
            <input type="email" v-model='username' class="" id="doc-ipt-email-1" placeholder="输入电子邮件">
          </div>
          <div class="am-form-group">
            <input type="password" v-model='password' class="" id="doc-ipt-pwd-1" placeholder="设置个密码吧">
          </div>
          <p><button @click='login' class="am-btn am-btn-default">登录</button></p>
        </fieldset>
      </form>
    </div>
  </div>
</div>
</template>

<script>

  export default {
    name: 'Login',
    data() {
      return {username: '', password: ''}
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
  }
</script>
</template>