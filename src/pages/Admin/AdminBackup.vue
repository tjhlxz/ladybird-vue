<template>
  <div class="tpl-content-wrapper">
    <div class="tpl-content-page-title">
        数据备份
    </div>
    <div class="tpl-portlet-components">
        <button class="am-btn am-btn-success" @click="backups" style="width:150px;height:150px;border-radius:50%;font-size:25px;margin:40px 400px;">一键备份</button>
    </div>
</div>
</template>
<script>
import _global from '../../components/Global'
export default {
  name: 'AdminBackup',
  data() {
    return {

    }
},
mounted() {
},
methods: {
    backups(){
        var loading=AMUI.dialog.loading({
            title:'正在准备数据，请稍等'
        });
            this.axios.get(_global.baseUrl + 'backups').then(body => {
                loading.modal('close');
                if(body.data.status==200){
                    window.location.href = body.data.data;
                }
                else{
                    AMUI.dialog.alert({
                    content: '失败!请重试'
                });
                }
            })
        }
}
};
</script>