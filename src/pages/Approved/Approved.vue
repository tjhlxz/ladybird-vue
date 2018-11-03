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
                                <input type="text" class="form-control form-control-solid" placeholder="搜索..."> </div>
                        </div>
                    </div>
                </div>
                <div class="tpl-block">
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
                                    <tbody v-for='(item, key) in content.history_form'>
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
                                                        <router-link :to="{path:'/approved-detail',query:{id:item.form_id}}">
                                                            <button class="am-btn am-btn-default am-btn-xs am-text-secondary"><span class="am-icon-pencil-square-o"></span> 查看</button>
                                                            <button @click="detail" class="am-btn am-btn-default am-btn-xs am-hide-sm-only"><span class="am-icon-copy"></span> 打印</button>
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
  name: 'Approved',
  data() {
    return {
        content: {
            
        }
    }
  },
  mounted() {
    var staff_id = JSON.parse(localStorage.getItem("data"));
    this.axios.get(_global.baseUrl + 'history?staff_id=' + staff_id).then(body => {
      this.content = body.data.data;
      console.log(this.content)
    })
  },
  methods: {
    detail: function() {
        // this.$router.push({path:'/form-line',query:{id:item.form_id}})
    }
  }
}
</script>