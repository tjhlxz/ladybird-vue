<template>
  <div class="tpl-content-wrapper">
            
            <div class="tpl-portlet-components">
                <div class="portlet-title">
                    <div class="caption font-green bold">
                        <span class="am-icon-code"></span> 列表
                    </div>
                    <div class="tpl-portlet-input tpl-fz-ml">
                        <div class="portlet-input input-small input-inline">
                            <div class="input-icon right">
                                <i class="am-icon-search"></i>
                                <input type="text" class="form-control form-control-solid" placeholder="搜索..."></div>
                        </div>
                    </div>
                </div>
                <div class="tpl-block">
                    <div class="am-g">
                        <div class="am-u-sm-12 am-u-md-6">
                            <div class="am-btn-toolbar">
                                <div class="am-btn-group am-btn-group-xs">
                                    <button type="button" class="am-btn am-btn-default am-btn-success"><span class="am-icon-plus"></span> 新增</button>
                                    <button type="button" class="am-btn am-btn-default am-btn-secondary"><span class="am-icon-save"></span> 保存</button>
                                    <button type="button" class="am-btn am-btn-default am-btn-warning"><span class="am-icon-archive"></span> 审核</button>
                                    <button type="button" class="am-btn am-btn-default am-btn-danger"><span class="am-icon-trash-o"></span> 删除</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="am-g">
                        <div class="am-u-sm-12">
                            <form class="am-form" >
                                <table class="am-table am-table-striped am-table-hover table-main">
                                    <thead>
                                        <tr>
                                            <th class="table-check"><input type="checkbox" class="tpl-table-fz-check"></th>
                                            <th class="table-id">id</th>
                                            <th class="table-title">姓名</th>
                                            <th class="table-type">表单类别</th>
                                            <th class="table-author am-hide-sm-only">所属院系</th>
                                            <th class="table-date am-hide-sm-only">申请日期</th>
                                            <th class="table-set">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for='(item, key) in content.approve_forms_deal'>
                                        <tr>
                                            <td><input type="checkbox"></td>
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
    this.axios.get(_global.baseUrl + 'onload?staff_id=2002803437').then(body => {
      this.content = body.data.data;
      console.log(this.content)
    })
  },
  methods: {
    
  }
}
</script>