<template>
  <div class="tpl-content-wrapper">
    <div class="tpl-content-page-title">
      角色管理
    </div>
    <div class="tpl-portlet-components">
      <div class="tpl-block ">
        <div class="portlet-title">
          <div class="caption font-green bold">
            <span class="am-icon-code"></span> 职务列表
          </div>
        </div>
        <div class="am-g">
          <div class="am-u-sm-12">
            <table class="am-table am-table-striped am-table-hover table-main">
              <thead>
                <tr>
                  <th>学工号</th>
                  <th>姓名</th>
                  <th>所属院系</th>
                  <th>职务</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody v-for='(item, index) in content'>
                <tr>
                  <td>{{item.staff_id}}</td>
                  <td>{{item.staff_name}}</td>
                  <td>{{item.college}}</td>
                  <td>{{item.staff_level}}</td>
                  <td><button @click="change($event,index)" class="am-btn am-btn-default am-btn-xs"><span class="am-icon-pencil-square-o"></span> 设置</button></td>
                </tr>
              </tbody>
            </table>
            <hr>
          </div>
        </div>
        <!-- 针对于二级学院教务科修改 -->
        <div class="am-popup" id="my-popup" style="height:400px;margin-top:-150px">
          <div class="am-popup-inner">
            <div class="am-popup-hd">
              <h4 class="am-popup-title">教师列表</h4>
              <span data-am-modal-close
              class="am-close" @click="clear" style="color: red">&times;</span>
            </div>
            <div>
              <div class="am-u-md-8 am-u-sm-centered">
                <div class="am-form">
                  <div class="input-icon left">
                    <i class="am-icon-search"></i>
                    <input type="text" v-model="staffname" @keyup.enter="search" class="form-control form-control-solid" placeholder="输入姓名搜索..." style="margin-top: 45px;">
                  </div>
                </div>
              </div>
              <br/>
              <br/>
              <table class="am-table am-table-striped am-table-hover table-main">
                <thead>
                  <tr>
                    <th>教工号</th>
                    <th>姓名</th>
                    <th>学院</th>
                    <th>教研室</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody v-for='(item, index) in teacher' :key="index">
                  <tr>
                    <td>{{item.staff_id}}</td>
                    <td>{{item.staff_name}}</td>
                    <td>{{item.college}}</td>
                    <td>{{item.staff_room}}</td>
                    <td>
                      <div class="am-btn-toolbar">
                        <div class="am-btn-group am-btn-group-xs">
                          <button class="am-btn am-btn-default am-btn-xs am-text-secondary" @click="selectok($event,index)"><span class="am-icon-check"></span> 选择他</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 针对于教务处和教学质量评估中心修改 -->
        <div class="am-popup" id="my-popup1" style="height:300px;margin-top:-150px;width:500px;">
          <div class="am-popup-inner">
            <div class="am-popup-hd">
              <h4 class="am-popup-title font-green">修改职位</h4>
              <span data-am-modal-close class="am-close" @click="clear" style="color: red">&times;</span>
            </div>
            <div class="am-u-md-8 am-u-sm-centered">
              <div class="am-form">
                <div class="am-u-sm-12 am-u-md-9">
                  <div class="am-form-group">
                    <label for="user-id" class="font-green">教工号:</label>
                    <div>
                      <input type="text" id="user-id" maxlength="10" v-model="staff_id" placeholder="请在此处填写教工号">
                    </div>
                  </div>
                  <div class="am-form-group">
                    <label for="user-name" class="font-green">姓名:</label>
                    <div class="">
                      <input type="text" id="user-name" maxlength="10" v-model="staff_name" placeholder="请在此处填写姓名">
                    </div>
                  </div>
                  <div class="am-form-group">
                    <div class="am-u-sm-9 am-u-sm-push-3">
                      <button @click="add_special" class="am-btn am-btn-success">添加</button>
                    </div>
                  </div>
                </div>
              </div>
              <br/>
              <br/>
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
  name: 'AdminUser',
  data() {
    return {
      content:[],
      college:'',
      staffname:'',
      teacher:[],
      staff_name:'',
      staff_id:'',
      level_sepecial:'',
      id:''
    }
  },
  mounted() {
    var _this = this;
    var loading=AMUI.dialog.loading({
      title:'正在加载，请稍等'
    });
    _this.axios.get(_global.baseUrl + 'allTeacherForManager').then(res => {
      loading.modal('close');
      if(res.data.status==200){
        _this.content=res.data.data;


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
        AMUI.dialog.alert({
          content: res.data.message
        });
      }
    })
  },
  methods: {
    clear(){
      this.teacher=[];
      this.staff_name='';
      this.staff_id='';
    },
    search(){
      var params = new URLSearchParams();
      params.append('staffname', this.staffname);
      params.append('college', this.college);
      this.axios.get(_global.baseUrl + 'staff_generalForCollege?college='+this.college+'&name='+this.staffname).then(res =>{
        this.staffname='';
        if(res.data.status==200){
          this.teacher=res.data.data          
        }
        else{
          this.teacher=[]
          AMUI.dialog.alert({
            title: '提示',
            content: '暂无数据'
          });
        }
      })
    },
    selectok(e,index){
      var _this=this;
      AMUI.dialog.confirm({
        title: '提示',
        content: '您确定要将'+_this.teacher[index].staff_name+'设置成'+_this.teacher[index].college+'的二级学院教务科吗？将覆盖掉原来的二级教务科！',
        onConfirm(){
          var loading=AMUI.dialog.loading({
            title:'正在设置，请稍等'
          });
          var params = new URLSearchParams();
          params.append('staff_id', _this.teacher[index].staff_id);
          params.append('staff_name', _this.teacher[index].staff_name);
          params.append('gzh_openid',_this.teacher[index].gzh_openid);
          params.append('id',_this.id);
          _this.axios.post(_global.baseUrl + 'setJobForCollege',params).then(res => {
            loading.modal('close')

            if(res.data.status==200){
              AMUI.dialog.alert({
                title: '提示',
                content:res.data.message,
                onConfirm(){
                  $('#my-popup').modal('close');
                  var loading=AMUI.dialog.loading({
                    title:'正在刷新，请稍等'
                  });
                  _this.axios.get(_global.baseUrl + 'allTeacherForManager').then(res => {
                    loading.modal('close');
                    if(res.data.status==200){
                      _this.content=res.data.data;


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
                      AMUI.dialog.alert({
                        content: res.data.message
                      });
                    }
                  })
                }
              });
            }else{
             AMUI.dialog.alert({
              title: '提示',
              content:res.data.message
            });
           }
         })
        }
      });
    },
    change(e,index){
      var _this = this;
      _this.college = _this.content[index].college;
      _this.level_sepecial = _this.content[index].staff_level;
      _this.id = _this.content[index].id;
      if(_this.college==='教务处'||_this.college==='教学质量评估中心'){
        $('#my-popup1').modal();
      }
      else
        $('#my-popup').modal();
    },
    add_special(){
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
            content: '教工号为纯数字'
          });
        }else{
          if(this.staff_name==''){
            AMUI.dialog.alert({
              title: '提示',
              content: '请填写姓名'
            });
          }else{
            var loading=AMUI.dialog.loading({
              title:'正在添加，请稍等'
            });
            var params = new URLSearchParams();
            params.append('staff_id', this.staff_id);
            params.append('staff_name', this.staff_name);
            params.append('college',this.college);
            params.append('staff_level_str',this.level_sepecial);
            this.axios.post(_global.baseUrl + 'addBigManager',params).then(res => {
              loading.modal('close')
              _this.staff_id='';
              _this.staff_name='';
              _this.college='';
              _this.level_sepecial='';
              if(res.data.status==200||res.data.status==201){
                AMUI.dialog.alert({
                  content: res.data.message,
                  onConfirm(){
                    $('#my-popup1').modal('close');
                    var loading=AMUI.dialog.loading({
                      title:'正在刷新数据，请稍等'
                    });
                    _this.axios.get(_global.baseUrl + 'allTeacherForManager').then(res => {
                      loading.modal('close');
                      if(res.data.status==200){
                        _this.content=res.data.data;
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
                        AMUI.dialog.alert({
                          content: res.data.message
                        });
                      }
                    })
                  }
                })
              }else{
                AMUI.dialog.alert({
                  content: res.data.message
                });
              }
            })
          }
        }
      }
    }
  }
};
</script>