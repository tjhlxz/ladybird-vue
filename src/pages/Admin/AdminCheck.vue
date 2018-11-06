<template>
  <div class="tpl-content-wrapper">
    <div class="tpl-content-page-title">
        一键检测
    </div>
    <div class="tpl-portlet-components">
        <button class="am-btn am-btn-warning" @click="backups" style="width:150px;height:150px;border-radius:50%;font-size:25px;margin:40px 400px;">一键检测</button>
        <div class="portlet-title">
        <div class="caption font-green bold">
          <span class="am-icon-file"></span> 检测结果
      </div>
  </div>
    <div v-html="content">
        {{content}}
    </div>
    </div>
</div>
</template>
<script>
import _global from '../../components/Global'
export default {
  name: 'AdminCheck',
  data() {
    return {
        content:''
    }
},
mounted() {
},
methods: {
    backups(){
        var loading=AMUI.dialog.loading({
            title:'正在检测，请稍等...'
        });
            this.axios.get(_global.baseUrl + 'one_key_detection').then(body => {
                loading.modal('close');
                if(body.status==200){
                    this.content=body.data;
                }
                else{
                    AMUI.dialog.alert({
                        title:'提示',
                        content:'失败，请重试！'
                    })
                }
            })
        }
}
};
</script>