<template>
  <div class="tpl-content-wrapper">
    <div class="tpl-portlet-components">
            <div class="portlet-title">
              <div class="caption font-green bold">
                  <span class="am-icon-code"></span> 职务管理
              </div>
            </div>
            <div class="am-g">
              <div class="am-u-sm-12">
                <div class="am-form" >
                    <table class="am-table am-table-striped am-table-hover table-main">
                        <thead>
                            <tr>
                                <th></th>
                                <th>姓名</th>
                                <th>所属教研室</th>
                                <th>职务</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody v-for='(item, index) in content' :key="index">
                            <tr>
                                <td></td>
                                <td :class="item.staff_name=='无'?'red':'default'">{{item.staff_name}}</td>
                                <td>{{item.staff_room}}</td>
                                <td v-if="item.staff_level-1">教学院长</td>
                                <td v-else>教研室主任</td>
                                <td>
                                    <div class="am-btn-toolbar">
                                        <div class="am-btn-group am-btn-group-xs">
                                            <button @click="popup($event, index)" class="am-btn am-btn-default am-btn-xs am-text-secondary"><span class="am-icon-pencil-square-o"></span> 设置</button>
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

    <div class="am-popup" id="my-popup" style="height: 400px;margin-top: -150px;">
      <div class="am-popup-inner">
        <div class="am-popup-hd">
          <h4 class="am-popup-title">教师列表</h4>
          <span data-am-modal-close
                class="am-close" style="color: red;">&times;</span>
        </div>
        <div>
            <div class="am-u-md-8 am-u-sm-centered">
                <div class="am-form">
                    <div class="input-icon left">
                        <i class="am-icon-search"></i>
                        <input type="text" v-model="search_value" @keyup.enter="search" class="form-control form-control-solid" placeholder="搜索..." style="margin-top: 45px;">
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <table class="am-table am-table-striped am-table-hover table-main">
                <thead>
                    <tr>
                        <th></th>
                        <th>id</th>
                        <th>姓名</th>
                        <th>所属教研室</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody v-for='(tea, index) in teacher' :key="index">
                    <tr>
                        <td></td>
                        <td>{{tea.staff_id}}</td>
                        <td>{{tea.staff_name}}</td>
                        <td>{{tea.staff_room}}</td>
                        <td>
                            <div class="am-btn-toolbar">
                                <div class="am-btn-group am-btn-group-xs">
                                    <button @click="set_staff($event, index)" class="am-btn am-btn-default am-btn-xs am-text-secondary"><span class="am-icon-pencil-square-o"></span> 选择他</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import _global from '../../components/Global'
export default {
    name: 'College_staff',
    data() {
        return {
            content: {
            },
            teacher: {
            },
            search_value: '',
            staff_room_old: '',
            staff_room: '',
            staff_name: '',
            college: '',
            _id: 0,
            gzh_openid: 0
        }
    },
    mounted() {
        var _this = this;
        var loading=AMUI.dialog.loading({
            title:'正在加载，请稍等'
        });
        _this.college = JSON.parse(sessionStorage.getItem("data")).college;
        _this.axios.get(_global.baseUrl + 'staff_mange_list' + '?college=' + _this.college).then(res => {

                loading.modal('close')
            if(res.data.status==200){
                _this.content = res.data.data;
            }
        })
    },
    methods: {
        popup: function(e, index) {
            var _this = this;
            _this._id = _this.content[index].id;
            _this.staff_name = _this.content[index].staff_name;
            $('#my-popup').modal();
        },
        search: function() {
            var _this = this;

             _this.axios.get(_global.baseUrl + 'staff_generalForCollege' + '?college=' + _this.college + '&name=' + _this.search_value).then(res => {
                if(res.data.status==200){
                    _this.teacher = res.data.data;
                }else {
                    AMUI.dialog.alert({
                        content: res.data.message
                    })
                }
            })
        },
        set_staff: function(e, index) {
            var _this = this;
            var staff_id = _this.teacher[index].staff_id;
            var staff_name = _this.teacher[index].staff_name;
            var gzh_openid = _this.teacher[index].gzh_openid ? _this.teacher[index].gzh_openid : '';
            if(_this.staff_name == '无'){
                var message = '是否选择' + staff_name+'?'
            }else {
                var message = '该职务当前为 '+_this.staff_name+' 是否变更?'
            }


            AMUI.dialog.confirm({
                
                content: message,
                onConfirm: function(e) {

                    var params = new URLSearchParams();
                    params.append('id', _this._id);
                    params.append('staff_id', staff_id);
                    params.append('staff_name', staff_name);
                    params.append('gzh_openid', gzh_openid);
                    _this.axios.post(_global.baseUrl + 'setJobForCollege', params).then(res => {

                          if(res.status==200){
                            $('#my-popup').modal('close');

                            _this.college = JSON.parse(sessionStorage.getItem("data")).college;
                            _this.axios.get(_global.baseUrl + 'staff_mange_list' + '?college=' + _this.college).then(res => {

                                if(res.data.status==200){
                                    _this.content = res.data.data;
                                }else {
                                    AMUI.dialog.alert({
                                      content: res.data.message
                                    })
                                }
                            })

                            AMUI.dialog.alert({
                              content: res.data.message
                            })
                          }else {
                            AMUI.dialog.alert({
                              content: res.data.message
                            })
                          }
                    })
                }  
            })
        }
    }
}

</script>

<style scoped>
    .red {
        color: red;
    }
</style>