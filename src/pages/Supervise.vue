<template>
  <div class="tpl-content-wrapper">
    <div class="tpl-content-page-title">
        督学管理
    </div>
    <div class="tpl-portlet-components">
        <div class="portlet-title">
            <div class="caption font-green bold">
                <span class="am-icon-code"></span> 督学列表
            </div>
        </div>
        <div class="tpl-block">
            <div class="am-g">
                <div class="am-u-sm-12">
                    <form class="am-form" >
                        <table class="am-table am-table-striped am-table-hover table-main">
                            <thead>
                                <tr>
                                    <th class="table-id">学工号</th>
                                    <th class="table-title">姓名</th>
                                    <th class="table-author am-hide-sm-only">所属院系</th>
                                    <th class="table-set">任务</th>
                                    <th class="table-set">删除</th>
                                </tr>
                            </thead>
                            <tbody v-for='(item, index) in content'>
                                <tr>
                                    <td class="am-hide-sm-only">{{item.staff_id}}</td>
                                    <td class="am-hide-sm-only">{{item.staff_name}}</td>
                                    <td class="am-hide-sm-only">{{item.college}}</td>
                                    <td class="am-hide-sm-only">
                                        <div class="am-btn-toolbar">
                                            <div class="am-btn-group am-btn-group-xs">
                                                <router-link :to="{path:'/supervise_detail',query:{id:item.staff_id,staff_name:item.staff_name,college:item.college}}">
                                                    <button class="am-btn am-btn-default am-btn-xs am-text-secondary"><span class="am-icon-file-text-o"></span> 查看详情</button>
                                                </router-link>
                                                <router-link :to="{path:'/supervise_setting',query:{id:item.staff_id,staff_name:item.staff_name,college:item.college}}">
                                                    <button class="am-btn am-btn-default am-btn-xs am-text-secondary"><span class="am-icon-user-plus"></span> 分配任务</button>
                                                </router-link>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="am-hide-sm-only"><button @click="edu_clear(index)" class="am-btn am-btn-default am-btn-xs am-hide-sm-only"><span class="am-icon-trash-o"></span> 删除</button></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="am-cf">
                            <div class="am-fr">
                                <ul class="am-pagination tpl-pagination">
                                    <li class="am-disabled"><a href="#">«</a></li>
                                    <li class="am-active"><a href="#">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#">4</a></li>
                                    <li><a href="#">5</a></li>
                                    <li><a href="#">»</a></li>
                                </ul>
                            </div>
                        </div>
                        <hr>
                    </form>
                </div>
            </div>
        </div>

    </div>

</div>
</template>
<script>
import _global from '../components/Global'
export default {
  name: 'Supervise',
  data() {
    return {
        content: {

        }
    }
},
mounted() {
    this.axios.get(_global.baseUrl + 'edu_list').then(res => {
      this.content = res.data.data;
  })
},
methods: {
    edu_clear(index){
        var that=this;
        AMUI.dialog.confirm({
            content:'删除后不可撤回，确定要删除吗?',
            onConfirm(){
                var loading=AMUI.dialog.loading({
                    title:'正在删除，请稍等'
                });
                that.axios.get(_global.baseUrl + 'edu_clear?edu_id='+that.content[index].staff_id).then(res => {
                  if(res.data.status==200){
                    loading.modal('close')
                    AMUI.dialog.alert({
                        content:'移除成功',
                        onConfirm:function(){
                            that.axios.get(_global.baseUrl + 'edu_list').then(res => {
                              that.content = res.data.data;
                          })
                        }
                    });
                }else if(res.data.status==400){
                    loading.modal('close')
                    AMUI.dialog.alert({
                        content: res.data.message
                    });
                }else{
                    loading.modal('close')
                  AMUI.dialog.alert({
                    content: '失败，请重试'
                  });
                }
            })
            }
        });   
    }
}
};
</script>