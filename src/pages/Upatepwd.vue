<template>
    <div class="tpl-content-wrapper">
        <div class="tpl-content-page-title">
            修改密码
        </div>
        <div class="tpl-portlet-components">
            <div class="portlet-title">
                <div class="caption font-green bold">
                    <span class="am-icon-lock"></span> 修改密码
                </div>
            </div>
            <div style="height:400px;width：100%;padding-top:80px;">
                <center>
                    <div style="padding:10px 0;">
                        <label style="width:100px;letter-spacing:6px;" class="font-green">原密码：</label>
                        <input type="password" name="oldpwd" placeholder="请在此处输入原密码" v-model="oldpwd">
                    </div>
                    <div style="padding:10px 0;">
                        <label style="width:100px;letter-spacing:6px;" class="font-green">新密码：</label>
                        <input type="password" name="newpwd" placeholder="请在此处输入新密码" v-model="newpwd">
                    </div>
                    <div style="padding:10px 0;">
                        <label style="width:100px;letter-spacing:1px;" class="font-green">确认密码：</label>
                        <input type="password" name="newpwdagin" placeholder="请再次确认新密码" v-model="newpwdagin">
                    </div>
                    <button @click="updatepwd" style="margin-top:50px;" class="am-btn am-btn-success am-btn-secondary"><span class="am-icon-check"></span> 修改密码</button>
                </center>
            </div>
        </div>
    </div>
</template>

<script>
import _global from '../components/Global'
export default {
    name: 'Upatepwd',
    data() {
        return {
            oldpwd:'',
            newpwd:'',
            newpwdagin:'',
            staff_id:''
        }
    },
    mounted() {
        this.staff_id = JSON.parse(sessionStorage.getItem("data")).staff_id;
    },
    methods:{
        updatepwd(){
            var _this=this;
            var oldpwd=this.oldpwd;
            var newpwd=this.newpwd;
            var newpwdagin=this.newpwdagin;
            console.log(oldpwd+newpwd+newpwdagin);
            var regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
            if (oldpwd.match(regRule) || newpwdagin.match(regRule) || newpwd.match(regRule)) {
                AMUI.dialog.alert({
                  content: '禁止输入表情'
              });
            } else{
                var re_n = /[^\d]/g;
                var re_t = /[^a-zA-z]/g;
                var n_result = re_n.test(newpwd);
                var t_result = re_t.test(newpwd);
                if (oldpwd === "") {
                   AMUI.dialog.alert({
                      content: '您输入的原密码不正确'
                  });
               } else if (newpwd.length < 6 || newpwd.length > 12) {
                AMUI.dialog.alert({
                  content: '密码由6-12个字符组成'
              });
            } else {
                if (!n_result) {
                    AMUI.dialog.alert({
                      content: '密码不能全为数字'
                  });
                } else if (!t_result) {
                    AMUI.dialog.alert({
                      content: '密码不能全为字母'
                  });
                } else {
                    if (newpwd === newpwdagin) {
                        var loading=AMUI.dialog.loading({
                            title:'正在修改，请稍等...'
                        });
                        var params = new URLSearchParams();
                        params.append('staff_id', this.staff_id);
                        params.append('oldPwd', oldpwd);
                        params.append('newPwd',newpwd);
                        _this.axios.post(_global.baseUrl + 'pwdChange',params).then(res => {
                            loading.modal('close')
                            if (res.data.status==200) {
                                AMUI.dialog.alert({
                                  content: res.data.message,
                                  onConfirm:function(){
                                    sessionStorage.clear();
                                    _this.$router.push({name: 'Main'})
                                }
                            });
                            }
                            else{
                                _this.newpwd='';
                                _this.oldpwd='';
                                _this.newpwdagin='';
                                AMUI.dialog.alert({
                                  content: res.data.message})
                            }
                        })
                    } else {
                        AMUI.dialog.alert({
                          content: '两次输入密码不一样'
                      });
                    }
                }
            }
        }
    }
}
};
</script>