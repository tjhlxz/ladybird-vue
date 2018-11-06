<template>
  <div class="tpl-content-wrapper">
    <div class="tpl-content-page-title">
        机构管理
    </div>
    <div class="tpl-portlet-components">
      <div class="portlet-title">
        <div class="caption font-green bold">
          <span class="am-icon-plus"></span> 添加机构
      </div>
  </div>
  <div class="tpl-block ">
    <div class="am-g tpl-amazeui-form">
      <div class="am-u-sm-12 am-u-md-9">
        <div class="am-form am-form-horizontal">

          <div class="am-form-group">
            <label for="user-name" class="am-u-sm-3 am-form-label">机构</label>
            <div class="am-u-sm-9">
              <input type="text" id="user-name" v-model="college_name" maxlength="10" placeholder="请在此处填写机构名称">
          </div>
      </div>

      <div class="am-form-group">
        <div class="am-u-sm-9 am-u-sm-push-3">
          <input type="submit" value="添加" @click="add_college" class="am-btn am-btn-success">
      </div>
  </div>
</div>
</div>
</div>
</div>

<div class="am-g">
    <div class="portlet-title">
        <div class="caption font-green bold">
          <span class="am-icon-code"></span> 机构列表
      </div>
  </div>
  <div class="am-u-sm-12">

    <div class="am-form" >
        <table class="am-table am-table-striped am-table-hover table-main">
            <thead>
                <tr>
                    <th>id</th>
                    <th>学院名</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody v-for="(item,index) in content" :key="index">
                <tr>
                    <td>{{item.id}}</td>
                    <td>{{item.college}}</td>
                    <td>
                        <div class="am-btn-toolbar">
                            <div class="am-btn-group am-btn-group-xs">
                                <button class="am-btn am-btn-default am-btn-xs am-text-secondary" @click="change($event, index)"><span class="am-icon-pencil-square-o"></span>修改</button>
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
<div class="tpl-alert">

</div>
<div class="am-modal am-modal-prompt" tabindex="-1" id="my-prompt2">
  <div class="am-modal-dialog">
    <div class="am-modal-hd">修改</div>
    <div class="am-modal-bd">
      将 {{college_old}} 修改为
      <input type="text" v-model="college_new" class="am-modal-prompt-input">
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
        content: [],
        college_name:'',
        college_old:'',
        college_new:''
    }
},
mounted() {
    var loading=AMUI.dialog.loading({
                            title:'正在加载，请稍等'
                        });
    this.axios.get(_global.baseUrl + 'allCollege').then(res => {
        loading.modal('close');
        if(res.data.status == 200) {
            this.content = res.data.data;
        }else{
             AMUI.dialog.alert({
                    content: res.data.message
                })
        }
    })
},
methods: {
    add_college(){
        var _this=this;
        var loading=AMUI.dialog.loading({
            title:'正在添加，请稍等'
        });
        this.axios.get(_global.baseUrl +'addCollege?college_name='+_this.college_name).then(res=>{
            _this.college_name='';
            loading.modal('close');
            if(res.data.status==200){
                AMUI.dialog.alert({
                    content: res.data.message,
                    onConfirm: function() {
                        var loading=AMUI.dialog.loading({
                            title:'正在刷新列表，请稍等'
                        });
                        _this.axios.get(_global.baseUrl + 'allCollege').then(res => {
                            loading.modal('close');
                            if(res.data.status == 200) {
                                _this.content = res.data.data;
                            }else{
                                AMUI.dialog.alert({
                                    content:res.data.message
                                })
                            }
                        })
                    }
                });
            }else{
                AMUI.dialog.alert({
                    content: res.data.message
                })
            }
        })
    },
    change: function(e, index) {
        var _this = this;
        var college_old = _this.content[index].college;
        _this.college_old = college_old;

        $('#my-prompt2').modal({
            onConfirm: function(e) {
                // var params = new URLSearchParams();
                // params.append('college_old', _this.college_old);
                // params.append('college_new', _this.college_new);
                AMUI.dialog.confirm({
                    title: '提示',
                    content: '修改学院名称将会使该学院的所有职工个人信息被修改，是否继续？',
                    onConfirm: function(e) {
                        _this.axios.get(_global.baseUrl + 'reviseCollege?college_new='+_this.college_new+'&college_old='+_this.college_old).then(res => {
                            _this.college_old='';
                            _this.college_new='';
                            if(res.status==200){
                                AMUI.dialog.alert({
                                    content: res.data.message,
                                    onConfirm:function(){
                                        var loading=AMUI.dialog.loading({
                                            title:'正在刷新列表，请稍等'
                                        });
                                        _this.axios.get(_global.baseUrl + 'allCollege').then(res => {
                                            loading.modal('close');
                                            if(res.data.status == 200) {
                                                _this.content = res.data.data;
                                            }else{
                                                AMUI.dialog.alert({
                                                    content:res.data.message
                                                })
                                            }
                                        })
                                    }
                                })

                            }
                        })
                    },
                    onCancel: function() {
                        _this.college_old='';
                        _this.college_new='';
                    }
                })
            }      
        })
    }
}
};
</script>