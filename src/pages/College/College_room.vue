<template>
  <div class="tpl-content-wrapper">
            
            <div class="tpl-portlet-components">
                <div class="portlet-title">
                    <div class="caption font-green bold">
                        <span class="am-icon-code"></span> 教研室管理
                    </div>
                </div>
                <div class="tpl-block">
                    <div class="am-g" >
                        <div class="am-u-sm-12 am-u-md-6">
                            <div class="am-btn-toolbar">
                                <div class="am-btn-group am-btn-group-xs" @click="add" >
                                    <button type="button" class="am-btn am-btn-default am-btn-success" id="doc-prompt-toggle"><span class="am-icon-plus"></span> 新增教研室</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="am-g">
                        <div class="am-u-sm-12">
                            <div class="am-form" >
                                <table class="am-table am-table-striped am-table-hover table-main">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>id</th>
                                            <th>院系</th>
                                            <th>教研室</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for='(item, index) in content.data' :key="index">
                                        <tr>
                                            <td></td>
                                                <td>{{item.id}}</td>
                                                <td><a href="#">{{item.college}}</a></td>
                                                <td>{{item.staff_room}}</td>
                                            <td>
                                                <div class="am-btn-toolbar">
                                                    <div class="am-btn-group am-btn-group-xs">
                                                        <button class="am-btn am-btn-default am-btn-xs am-text-secondary" @click="change($event, index)"><span class="am-icon-pencil-square-o"></span> 修改</button>
                                                    
                                                        <button class="am-btn am-btn-default am-btn-xs am-text-secondary" @click="del($event, index)"><span class="am-icon-copy"></span> 删除</button>
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
                <div class="am-modal am-modal-prompt" tabindex="-1" id="my-prompt">
                  <div class="am-modal-dialog">
                    <div class="am-modal-hd">添加教研室</div>
                    <div class="am-modal-bd">
                      请输入你新增教研室的名字
                      <input type="text" class="am-modal-prompt-input">
                    </div>
                    <div class="am-modal-footer">
                      <span class="am-modal-btn" data-am-modal-cancel>取消</span>
                      <span class="am-modal-btn" data-am-modal-confirm>提交</span>
                    </div>
                  </div>
                </div>
                <div class="am-modal am-modal-prompt" tabindex="-1" id="my-prompt2">
                  <div class="am-modal-dialog">
                    <div class="am-modal-hd">修改教研室</div>
                    <div class="am-modal-bd">
                      将 {{staff_room_old}} 修改为
                      <input type="text" class="am-modal-prompt-input">
                    </div>
                    <div class="am-modal-footer">
                      <span class="am-modal-btn" data-am-modal-cancel>取消</span>
                      <span class="am-modal-btn" data-am-modal-confirm>提交</span>
                    </div>
                  </div>
                </div>
                
            </div>
        </div>
</template>

<script>
import _global from '../../components/Global'
export default {
  name: 'College_room',
  data() {
    return {
        content: {

        },
        college: '',
        staff_room_old: ''
    }
  },
  mounted() {
    var loading=AMUI.dialog.loading({
            title:'正在加载，请稍等'
        });
    var college = JSON.parse(sessionStorage.getItem("data")).college;
    this.college = college;
    this.axios.get(_global.baseUrl + 'staff_room_list?college=' + college).then(res => {
        loading.modal('close');
        if(res.data.status == 200) {
            this.content = res.data;
        }
    })
    
  },
  methods: {
    add: function(e) {
        var _this = this;
        $('#my-prompt').modal({
          relatedTarget: this,
          onConfirm: function(e) {
            if(e.data){
                var loading=AMUI.dialog.loading({
            title:'正在加载，请稍等'
        });
                _this.axios.get(_global.baseUrl + 'staff_room_add?college=' + _this.college + '&staff_room=' + e.data).then(res => {
                    loading.modal('close');
                    if(res.data.status == 200 || res.data.status == 400) {
                        AMUI.dialog.alert({
                          title: ' ',
                          content: res.data.message
                        });
                        _this.axios.get(_global.baseUrl + 'staff_room_list?college=' + _this.college).then(res => {
                            if(res.data.status == 200) {
                                _this.content = res.data;
                            }
                        })
                    }
                })
            }
          },
          // onCancel: function(e) {
            
          // }
        })
    },
    change: function(e, index) {
        var _this = this;
        var staff_room_old = _this.content.data[index].staff_room;
        _this.staff_room_old = staff_room_old;

        $('#my-prompt2').modal({

            onConfirm: function(e) {

                var params = new URLSearchParams();
                params.append('college', _this.college);
                params.append('staff_room_old', staff_room_old);
                params.append('staff_room_new', e.data);
                AMUI.dialog.confirm({
                    title: ' ',
                    content: '修改教研室将会使该教研室的所有职工个人信息被修改，是否继续？',
                    onConfirm: function(e) {
                        _this.axios.post(_global.baseUrl + 'staff_room_revise',params).then(res => {

                              if(res.status==200){
                                console.log(res.data)

                                AMUI.dialog.alert({
                                  content: res.data.message
                                })
                                _this.axios.get(_global.baseUrl + 'staff_room_list?college=' + _this.college).then(res => {
                                    if(res.data.status == 200) {
                                        _this.content = res.data;
                                    }
                                })
                              }
                        })
                    },
                    onCancel: function() {}
                })
            }      
        })
    },
    del: function(e, index) {
        var _this = this;
        var staff_room = _this.content.data[index].staff_room;

        var params = new URLSearchParams();
        params.append('college', _this.college);
        params.append('staff_room', staff_room);
        AMUI.dialog.confirm({
            title: ' ',
            content: '删除教研室将会删除教研室下所有老师的教研室信息，是否继续？',
            onConfirm: function(e) {
                _this.axios.post(_global.baseUrl + 'staff_room_del',params).then(res => {

                      if(res.status==200){
                        console.log(res.data)

                        AMUI.dialog.alert({
                          content: res.data.message
                        })
                        _this.axios.get(_global.baseUrl + 'staff_room_list?college=' + _this.college).then(res => {
                            if(res.data.status == 200) {
                                _this.content = res.data;
                            }
                        })
                      }
                })
            }  
        })
    }
  }
}
</script>