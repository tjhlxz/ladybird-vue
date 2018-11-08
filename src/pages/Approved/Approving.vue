<template>
  <div class="tpl-content-wrapper">
        <div class="tpl-content-page-title">
          待审批
        </div>
            <div class="tpl-portlet-components">
                <div class="portlet-title">
                    <div class="caption font-green bold">
                        <span class="am-icon-code"></span> 待审批列表
                    </div>
                </div>
                <div class="tpl-block">

                    <div class="am-g">
                        <div class="am-u-sm-12">
                            <div class="am-form" >
                                <table class="am-table am-table-striped am-table-hover table-main">
                                    <thead>
                                        <tr>
                                            <th >id</th>
                                            <th >姓名</th>
                                            <th >表单类别</th>
                                            <th >所属院系</th>
                                            <th >申请日期</th>
                                            <th >操作</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for='(item, key) in content.approve_forms_deal'>
                                        <tr>
                                            <td>{{item.form_id}}</td>
                                            <td><a href="#">{{item.form_proposer_name}}</a></td>
                                            <td v-if='item.form_type-1'>调串</td>
                                            <td v-else>变更</td>
                                            <!-- <td>{{item.form_type}}</td> -->
                                            <td class="am-hide-sm-only">{{item.form_college}}</td>
                                            <td class="am-hide-sm-only">{{item.create_time}}</td>
                                            <td>
                                                <div class="am-btn-toolbar">
                                                    <div class="am-btn-group am-btn-group-xs">
                                                        <router-link :to="{path:'/approving-detail',query:{id:item.form_id}}">
                                                            <button class="am-btn am-btn-default am-btn-xs am-text-secondary"><span class="am-icon-pencil-square-o"></span> 查看</button>
                                                        
                                                            <button class="am-btn am-btn-default am-btn-xs am-hide-sm-only"><span class="am-icon-copy"></span> 附件</button>
                                                        </router-link>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <hr>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tpl-alert"></div>
            </div>
        </div>
</template>

<script>
import _global from '../../components/Global'
export default {
  name: 'Approving',
  data() {
    return {
        content: {
            sub_forms_deal: [],
            approve_forms_deal: []
        }
    }
  },
  mounted() {
    var loading=AMUI.dialog.loading({
            title:'正在加载，请稍等'
        });
    var staff_id = JSON.parse(sessionStorage.getItem("data")).staff_id;
    this.axios.get(_global.baseUrl + 'onload?staff_id=' + staff_id).then(body => {
        loading.modal('close')
      this.content = body.data.data;
    })
  },
  methods: {
    
  }
}
</script>