<template>
  <div class="tpl-content-wrapper">
    <div class="tpl-content-page-title">
        任务管理
    </div>
    <div class="tpl-portlet-components">
        <div class="portlet-title">
            <div class="caption font-green bold">
                <span class="am-icon-code"></span> 分配任务
            </div>
        </div>
        <div class="tpl-block">
            <div class="am-g">
                <div class="am-u-sm-12">
                    <div class="am-form" >
                        <table class="am-table am-table-striped am-table-hover table-main">
                            <thead>
                                <tr>
                                    <th class="table-title">学工号</th>
                                    <th class="table-title">姓名</th>
                                    <th class="table-author am-hide-sm-only">所属院系</th>
                                    <th class="table-set">任务详情</th>
                                    <!-- <th class="table-set">分配</th> -->
                                </tr>
                            </thead>
                            <tbody v-for='(item, index) in content'>
                                <tr>
                                    <td class="am-hide-sm-only">{{item.staff_id}}</td>
                                    <td class="am-hide-sm-only">{{item.staff_name}}</td>
                                    <td class="am-hide-sm-only">{{item.college}}</td>
                                    <td class="am-hide-sm-only">
                                        <router-link :to="{path:'/supervise-detail',query:{id:item.staff_id,staff_name:item.staff_name,college:item.college}}">
                                            <button class="am-btn am-btn-default am-btn-xs am-text-secondary"><span class="am-icon-file-text-o"></span> 任务详情</button>
                                        </router-link>
                                    </td>
                                    <!-- <td>
                                        <router-link :to="{path:'/supervise_setting',query:{id:item.staff_id,staff_name:item.staff_name,college:item.college}}">
                                            <button class="am-btn am-btn-default am-btn-xs am-text-secondary"><span class="am-icon-user-plus"></span> 分配任务</button>
                                        </router-link>
                                    </td> -->
                                </tr>
                            </tbody>
                        </table>
                        <hr>
                    </div>
                </div>
            </div>
        </div>

    </div>

</div>
</template>
<script>
import _global from '../../components/Global'
export default {
  name: 'Supervise_task',
  data() {
    return {
        content: {

        }
    }
},
mounted() {
    var loading=AMUI.dialog.loading({
            title:'正在加载，请稍等'
        });
    this.axios.get(_global.baseUrl + 'edu_list').then(res => {
        if(res.data.status==200){
            loading.modal('close');
      this.content = res.data.data;
        }
        else{
            loading.modal('close');
            AMUI.dialog.alert({
          content: body.data.message
      });
        }
        
  })
},
methods: {

}
};
</script>