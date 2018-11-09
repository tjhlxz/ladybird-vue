<template>
  <div class="tpl-content-wrapper">
    <div class="tpl-content-page-title">
      人员管理
  </div>
  <div class="tpl-portlet-components">
      <div class="portlet-title">
        <div class="caption font-green bold">
          <span class="am-icon-plus"></span> 添加人员
      </div>
  </div>
  <div class="tpl-block ">

    <div class="am-g tpl-amazeui-form">

      <div class="am-u-sm-12 am-u-md-9">
        <form class="am-form am-form-horizontal" @submit.prevent="addStaff">
          <div class="am-form-group">
            <label for="user-id" class="am-u-sm-3 am-form-label">教工号</label>
            <div class="am-u-sm-9">
              <input type="text" id="user-id" maxlength="10" v-model="staff_id" placeholder="请在此处填写教工号">
          </div>
      </div>
      <div class="am-form-group">
        <label for="user-name" class="am-u-sm-3 am-form-label">姓名</label>
        <div class="am-u-sm-9">
          <input type="text" id="user-name" maxlength="10" v-model="staff_name" placeholder="请在此处填写姓名">
      </div>
  </div>
  <div class="am-form-group">
    <label for="user-name" class="am-u-sm-3 am-form-label">学院</label>
    <div class="am-u-sm-9">
        <select data-am-selected="{maxHeight:50px}" v-model="college_select2" @change="select_college">
            <option v-for="(item,index) in college" :value="item.college" name="college_select2">{{item.college}}</option>
        </select>
    </div>
</div>
<div class="am-form-group">
    <label for="user-name" class="am-u-sm-3 am-form-label">教研室</label>
    <div class="am-u-sm-9">
      <select data-am-selected="{maxHeight:50px}" v-model="staff_romm_select">
        <option v-for="(item,index) in room" :value="item.staff_room" name="staff_romm_select">{{item.staff_room}}</option>
    </select>
</div>
</div>
<div class="am-form-group">
    <div class="am-u-sm-9 am-u-sm-push-3">
      <input type="submit" value="添加" class="am-btn am-btn-success">
  </div>
</div>
</form>
</div>
</div>
<div class="portlet-title">
  <div class="caption font-green bold">
    <span class="am-icon-code"></span> 人员列表
</div>
<div class="caption  font-green  bold" style="margin-left:300px;">按学院查看：</div>
<div class="caption bold">
  <select data-am-selected="{maxHeight:50px}" v-model="college_select" @change="select">
    <option v-for="(item,index) in college" :value="item.college" name="college_select">{{item.college}}</option>
</select>
</div>
</div>

<div class="am-u-sm-12">
    <div class="am-form" >
      <table class="am-table am-table-striped am-table-hover table-main">
        <thead>
          <tr>
            <th>教工号</th>
            <th>姓名</th>
            <th>所属院系</th>
            <th>教研室</th>
            <th>职位等级</th>
        </tr>
    </thead>
    <tbody v-for="(staff,index) in content">
      <tr>
        <td class="am-hide-sm-only">{{staff.staff_id}}</td>
        <td class="am-hide-sm-only">{{staff.staff_name}}</td>
        <td>{{staff.college}}</td>
        <td class="am-hide-sm-only">{{staff.staff_room}}</td>
        <td>{{staff.staff_level}}</td>
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
  name: 'AdminPeople',
  data(){
     return {
        content:[],
        college:[],
        college_select2:'',
        college_select:'矿业学院',
        staff_id:'',
        staff_name:'',
        room:[],
        staff_romm_select:''
    }
},
mounted() {
    var _this=this;
    var loading=AMUI.dialog.loading({
        title:'正在加载，请稍等'
    });
    this.axios.get(_global.baseUrl + 'allCollege').then(res => {
        if(res.status==200){
          this.college = res.data.data;
      }else{
          AMUI.dialog.alert({
            content: res.data.message
        });
      }
  })
    this.axios.get(_global.baseUrl + 'allTeahcerForCollege?college='+_this.college_select).then(res => {
        if(res.status==200){
          loading.modal('close');
          this.content = res.data.data;
          for(var i=0;i<this.content.length;i++){
            switch(this.content[i].staff_level){
                case 0:
                this.content[i].staff_level='普通职工';
                break;
                case 1:
                this.content[i].staff_level='教研室主任';
                break;
                case 2:
                this.content[i].staff_level='教学院长';
                break;
                case 3:
                this.content[i].staff_level='教务处处长';
                break;
                case 4:
                this.content[i].staff_level='教务科';
                break;
                case 5:
                this.content[i].staff_level='评估中心';
                break;
                case 6:
                this.content[i].staff_level='督导';
                break;
                case 7:
                this.content[i].staff_level='二级学院教务科';
                break;
            }
        }
    }else{
      loading.modal('close');
      AMUI.dialog.alert({
        content: res.data.message
    });
  }
})

},
methods: {
  select(){
    var _this=this;
    var loading=AMUI.dialog.loading({
        title:'正在加载，请稍等'
    });
    this.axios.get(_global.baseUrl + 'allTeahcerForCollege?college='+_this.college_select).then(res => {
        if(res.status==200){
          loading.modal('close');
          this.content = res.data.data;
          for(var i=0;i<this.content.length;i++){
            switch(this.content[i].staff_level){
                case 0:
                this.content[i].staff_level='普通职工';
                break;
                case 1:
                this.content[i].staff_level='教研室主任';
                break;
                case 2:
                this.content[i].staff_level='教学院长';
                break;
                case 3:
                this.content[i].staff_level='教务处处长';
                break;
                case 4:
                this.content[i].staff_level='教务科';
                break;
                case 5:
                this.content[i].staff_level='评估中心';
                break;
                case 6:
                this.content[i].staff_level='督导';
                break;
                case 7:
                this.content[i].staff_level='二级学院教务科';
                break;
            }
        }
    }else{
      loading.modal('close');
      AMUI.dialog.alert({
        content: res.data.message
    });
  }})
},
addStaff(e){
    var _this=this;
  if(this.staff_id==''){
    AMUI.dialog.alert({
      title: '提示',
      content: '请填写教工号'
  });
}
else{
    var regex="^\\d+$";
    if(/^[0-9]+$/.test(this.staff_id)==false){
      AMUI.dialog.alert({
        title: '提示',
        content: '教工号只能是纯数字'
    });
  }else{
      if(this.staff_name==''){
        AMUI.dialog.alert({
          title: '提示',
          content: '请填写姓名'
      });
    }else{
        if(this.college_select2==''){
            AMUI.dialog.alert({
              title: '提示',
              content: '请选择学院'
          });
        }else{
            var loading=AMUI.dialog.loading({
              title:'正在添加，请稍等'
          });
            var params = new URLSearchParams();
            params.append('staff_id', this.staff_id);
            params.append('staff_name', this.staff_name);
            params.append('college',this.college_select2);
            params.append('staff_room',this.staff_romm_select);
            this.axios.post(_global.baseUrl + 'addStaff',params).then(res => {
              loading.modal('close')
              
              if(res.data.status==200){
                AMUI.dialog.alert({
                    content: '添加成功',
                    onConfirm(){
                        var loading=AMUI.dialog.loading({
                            title:'正在刷新数据，请稍等'
                        });
                        _this.axios.get(_global.baseUrl + 'allTeahcerForCollege?college='+_this.college_select2).then(res => {
                            _this.college_select=_this.college_select2
                            _this.college_select2='';
                            _this.staff_id='';
                            _this.staff_name='';
                            _this.staff_romm_select='';
                            if(res.status==200){
                              loading.modal('close');
                              _this.content = res.data.data;
                              for(var i=0;i<_this.content.length;i++){
                                switch(_this.content[i].staff_level){
                                    case 0:
                                    _this.content[i].staff_level='普通职工';
                                    break;
                                    case 1:
                                    _this.content[i].staff_level='教研室主任';
                                    break;
                                    case 2:
                                    _this.content[i].staff_level='教学院长';
                                    break;
                                    case 3:
                                    _this.content[i].staff_level='教务处处长';
                                    break;
                                    case 4:
                                    _this.content[i].staff_level='教务科';
                                    break;
                                    case 5:
                                    _this.content[i].staff_level='评估中心';
                                    break;
                                    case 6:
                                    _this.content[i].staff_level='督导';
                                    break;
                                    case 7:
                                    _this.content[i].staff_level='二级学院教务科';
                                    break;
                                }
                            }
                        }else{
                          loading.modal('close');
                          AMUI.dialog.alert({
                            content: res.data.message
                        });
                      }})
                    }
                });
            }
        })
        }
    }
}
}
},
select_college(){
    var _this=this;
    _this.room=[];
    this.axios.get(_global.baseUrl + 'staff_room_list?college='+_this.college_select2).then(res => {
        if(res.data.status==200){
            _this.room=res.data.data
        }
    })
}
}
};
</script>