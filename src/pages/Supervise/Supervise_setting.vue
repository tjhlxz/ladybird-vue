<template>

  <div class="tpl-content-wrapper">
    <div class="tpl-content-page-title">
      任务管理
    </div>
    <div class="tpl-portlet-components">
      <div class="portlet-title">
        <div class="caption font-green bold">
          <span class="am-icon-plus"></span> 添加任务
        </div>
        
      </div>
      <div class="portlet-title">
        <div class="caption font-black bold">
          督学信息：
        </div>
        <div class="caption bold">
          <label class="font-green">{{edu.staff_name}}&nbsp;{{edu.id}}&nbsp;{{edu.college}}&nbsp;&nbsp;&nbsp;&nbsp;</label>
        </div>

        <div class="caption font-black bold">按学院选择：</div>
        <div class="caption bold">
          <select data-am-selected="{maxHeight: 200}" v-model="teacher_college" @change="select">
            <option value="矿业学院" name="teacher_college">矿业学院</option>
            <option value="环化学院" name="teacher_college">环化学院</option>
            <option value="安全工程学院" name="teacher_college">安全工程学院</option>
            <option value="电气学院" name="teacher_college">电气学院</option>
            <option value="电信学院" name="teacher_college">电信学院</option>
            <option value="机械学院" name="teacher_college">机械学院</option>
            <option value="材料学院" name="teacher_college">材料学院</option>
            <option value="建筑工程学院" name="teacher_college">建筑工程学院</option>
            <option value="计算机与信息工程学院" name="teacher_college">计算机与信息工程学院</option>
            <option value="管理学院" name="teacher_college">管理学院</option>
            <option value="经济学院" name="teacher_college">经济学院</option>
            <option value="人文学院" name="teacher_college">人文学院</option>
            <option value="马克思主义学院" name="teacher_college">马克思主义学院</option>
            <option value="理学院" name="teacher_college">理学院</option>
            <option value="外国语学院" name="teacher_college">外国语学院</option>
            <option value="国际教育学院" name="teacher_college">国际教育学院</option>
            <option value="体育部" name="teacher_college">体育部</option>
            <option value="实训中心" name="teacher_college">实训中心</option>
          </select>
        </div>
        <label class="caption bold" style="margin-left:120px;">共&nbsp;<label class="font-green">{{count}}</label>&nbsp;人未分配</label>
      </div>
      
      <div class="tpl-block">
        <div class="">
          <button type="button" @click="back" style="margin-left:10px" class="am-btn am-btn-default am-btn-secondary"><span class="am-icon-undo"></span> 返回</button>
          <button type="button" @click="checkok" style="margin-left:10px" class="am-btn am-btn-success am-btn-secondary"><span class="am-icon-check"></span> 选好了</button>
        </div>
        <div class="am-g">
          <div class="am-u-sm-12">
            <div class="am-form" >
              <table class="am-table am-table-striped am-table-hover table-main">
                <thead>
                  <tr>
                    <th class="table-title"><input type="checkbox" class="tpl-table-fz-check" @click="checkAll" :checked="checked"/>&nbsp;全选</th>
                    <th class="tatypeble-id">学工号</th>
                    <th class="table-title">姓名</th>
                    <th class="table-author am-hide-sm-only">所属院系</th>
                  </tr>
                </thead>
                <tbody v-for='(item, index) in content'>
                  <tr>
                    <td class="am-hide-sm-only" ><input type="checkbox" :value="item.staff_id" v-model="checked_id"/></td>
                    <td class="am-hide-sm-only">{{item.staff_id}}</td>
                    <td class="am-hide-sm-only">{{item.staff_name}}</td>
                    <td class="am-hide-sm-only">{{item.college}}</td>
                  </tr>
                </tbody>
              </table>
              <div class="am-cf">
                            <div class="am-fr">
                                <ul class="am-pagination tpl-pagination" >
                                    <li ><a @click="fir" href="#">«</a></li>
                                    <li v-if="page-1" ><a @click="pre" href="#">上一页</a></li>
                                    <li class="bef" v-for='bef in before' >
                                        <a @click="link_left">{{bef}}</a>
                                    </li>
                                    <li class="am-disabled ellipsis"><a href="#">...</a></li>
                                    <li class="aft" v-for='aft in after' >
                                        <a @click="link_right">{{aft}}</a>
                                    </li>
                                    <li v-if="length-page"><a @click="next" href="#">下一页</a></li>
                                </ul>
                            </div>
                        </div>
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
  name: 'Supervise_setting',
  data() {
    return {
      content: {
      },
      edu:{
        id:'',
        staff_name:'',
        college:''
      },
      teacher_college:'',
      checked_id:[],
      checked:false,
      count:0,
      formsData:[],
      length: 0,
      arr: [],
      before: [],
      after: [],
      page: 1
    }
  },
  mounted() {
    var _this = this;
    this.edu=this.$route.query;
    this.axios.get(_global.baseUrl + 'edu_noTeacher?page=1').then(res => {
      _this.content = res.data.data.no_edu_teacher;
      _this.count=res.data.data.count;
      _this.formsData=_this.content.formsData;
      _this.length = Math.ceil(_this.count/11);
      var arr = [];
      for (var i = 1; i <= _this.length; i++) {
          arr.push(i);
      }
      _this.arr = arr;

      if(_this.length > 5) {
          var bef = [];
          var aft = [];

          bef.push(arr.slice(0, 4));
          aft.push(arr.slice(_this.length-3,_this.length));
          _this.before = bef[0];
          _this.after = aft[0];

      }


      
    })
    for(var i=0;i<this.count;i++){
      this.teacher_college.push(this.content[i].college)
    }
  },
  methods: {
      link_left: function(e) {
        var _this = this;
        $(e.target).parent().siblings().removeClass('am-active');
        var index = parseInt(e.target.firstChild.data);
        if(index === index) {
            _this.axios.get(_global.baseUrl + 'edu_noTeacher?page=' + index).then(body => {
                _this.content = body.data.data.no_edu_teacher;
            })

        var bef = [];//               0-4     3,7          
        if(index == 1) {
            var dom = $('.bef')[0];
            dom.setAttribute('class', 'bef am-active');
        }                 
        //         2          <        6                    2         3       4       5       6        
        if(index > 1 && index < _this.length - 4) {
            bef.push(_this.arr.slice(index-2, index+2));//1,2,3,4|2,3,4,5|3,4,5,6|4,5,6,7|5,6,7,8
            _this.before = bef[0];
        }
        //         6           6                             
        if(index == _this.length-4) {
            bef.push(_this.arr.slice(index-3, index+1))//4,5,6,7
            _this.before = bef[0];
        }
        //         7           7
        if(index == _this.length-3) {
            bef.push(_this.arr.slice(index-4, index))//4,5,6,7
            _this.before = bef[0];
        }
        //    5               5                                                  
        if(index >= _this.length - 5) {
            $('.ellipsis').hide();
        }else {
            $('.ellipsis').show();
        }

        _this.page = index;

        for(var box = 0;box<4;box++) {

            if(_this.before[box] == index) {
                var dom = $('.bef')[box];
                dom.setAttribute('class', 'bef am-active');
            }
          }
        }
      },
      link_right: function(e) {
          var _this = this;
          $(e.target).parent().siblings().removeClass('am-active');
          var index = parseInt(e.target.firstChild.data);
          if(index === index) {
              _this.axios.get(_global.baseUrl + 'edu_noTeacher?page='+index).then(body => {
                  _this.content = body.data.data.no_edu_teacher;
              })
              var bef = [];
              bef.push(_this.arr.slice(_this.length-7, _this.length-3));
              _this.before = bef[0];
              $('.ellipsis').hide();
          }
          _this.page = index;
          for(var box = 0;box<3;box++) {
              if(_this.after[box] == index) {
                  var dom = $('.aft')[box];
                  dom.setAttribute('class', 'aft am-active');
              }
          }
      },
      fir: function(e) {
          var _this = this;
          $(e.target).parent().siblings().removeClass('am-active');
          var index = parseInt(e.target.firstChild.data);
          _this.axios.get(_global.baseUrl + 'edu_noTeacher?page=1').then(body => {
              _this.content = body.data.data.no_edu_teacher;
          })
          var bef = [];
          bef.push(_this.arr.slice(0, 4));
          _this.before = bef[0];
          _this.page = 1;
          var dom = $('.bef')[0];
          dom.setAttribute('class', 'bef am-active');
          if(index >= _this.length - 5) {
              $('.ellipsis').hide();
          }else {
              $('.ellipsis').show();
          }
      },
      pre: function(e) {
          var _this = this;
          $(e.target).parent().siblings().removeClass('am-active');
          _this.axios.get(_global.baseUrl + 'edu_noTeacher?page='+(_this.page-1)).then(body => {
              _this.content = body.data.data.no_edu_teacher;
              _this.page -= 1;
              var index = _this.page;
              var bef = [];
              if(index == 1) {
                  var dom = $('.bef')[0];
                  dom.setAttribute('class', 'bef am-active');
              }
              if(index > 1 && index < _this.length - 4) {
                  bef.push(_this.arr.slice(index-2, index+2));
                  _this.before = bef[0];

                  for(var box = 0;box<4;box++) {

                      if(_this.before[box] == index) {
                          var dom = $('.bef')[box];
                          dom.setAttribute('class', 'bef am-active');
                      }
                  }
              }
              if(index == _this.length-4) {
                  bef.push(_this.arr.slice(index-3, index+1))
                  _this.before = bef[0];
                  for(var box = 0;box<4;box++) {
                      if(_this.before[box] == index) {
                          var dom = $('.bef')[box];
                          dom.setAttribute('class', 'bef am-active');
                      }
                  }
              }
              if(index == _this.length-3) {
                  bef.push(_this.arr.slice(index-4, index))
                  _this.before = bef[0];
                  for(var box = 0;box<4;box++) {
                      if(_this.before[box] == index) {
                          var dom = $('.bef')[box];
                          dom.setAttribute('class', 'bef am-active');
                      }
                  }
              }
                  //   8           7                        
                  if(index > _this.length-3) {
                      for(var box = 0;box<3;box++) {
                          if(_this.after[box] == index) {
                              var dom = $('.aft')[box];
                              dom.setAttribute('class', 'aft am-active');
                          }
                      }
                  }
                  if(index >= _this.length - 5) {
                      $('.ellipsis').hide();
                  }else {
                      $('.ellipsis').show();
                  }
                  
              })
      },
      next: function(e) {
          var _this = this;
          $(e.target).parent().siblings().removeClass('am-active');
          _this.axios.get(_global.baseUrl + 'edu_noTeacher?page='+(_this.page+1)).then(body => {
              _this.content = body.data.data.no_edu_teacher;
              _this.page += 1;
              var index = _this.page;
              var bef = [];

              if(index > 1 && index < _this.length - 4) {
                  bef.push(_this.arr.slice(index-2, index+2));
                  _this.before = bef[0];
                  for(var box = 0;box<4;box++) {

                      if(_this.before[box] == index) {
                          var dom = $('.bef')[box];
                          dom.setAttribute('class', 'bef am-active');
                      }
                  }
              }

              if(index == _this.length-4) {
                  bef.push(_this.arr.slice(index-3, index+1))
                  _this.before = bef[0];
                  for(var box = 0;box<4;box++) {
                      if(_this.before[box] == index) {
                          var dom = $('.bef')[box];
                          dom.setAttribute('class', 'bef am-active');
                      }
                  }
              }
              if(index == _this.length-3) {
                  bef.push(_this.arr.slice(index-4, index))
                  _this.before = bef[0];
                  for(var box = 0;box<4;box++) {
                      if(_this.before[box] == index) {
                          var dom = $('.bef')[box];
                          dom.setAttribute('class', 'bef am-active');
                      }
                  }
              }
              if(index > _this.length-3) {
                  for(var box = 0;box<3;box++) {
                      if(_this.after[box] == index) {
                          var dom = $('.aft')[box];
                          dom.setAttribute('class', 'aft am-active');
                      }
                  }
              }
              if(index >= _this.length - 5) {
                  $('.ellipsis').hide();
              }else {
                  $('.ellipsis').show();
              }
          })
      },
      back: function() {
        this.$router.go(-1);
      },
      select(){
        this.axios.get(_global.baseUrl + 'user_by_college?college='+this.teacher_college).then(body => {
          if(body.data.status==200){
            this.content = body.data.data;
            this.count=this.content.length;
          }else if(body.data.status==400){
            AMUI.dialog.alert({
              content: '该学院所有老师都已被分配！'
            });
            this.content=[]
          }
        })
      },
      checkAll(event){
        if(this.checked==false){
          this.checked=true;
          for(var i=0;i<this.content.length;i++){
            this.checked_id.push(this.content[i].staff_id);
          }
        }
        else{
          this.checked=false;
          this.checked_id=[]
        }
      },
      checkok(){
        var that=this;
        if (that.checked_id.length==0) {
          AMUI.dialog.alert({
            content: '您还没有选择老师!'
          });
        }else{
          AMUI.dialog.confirm({
            content: '确定要添加吗？',
            onConfirm: function() {
              var loading=AMUI.dialog.loading({
                title:'正在添加，请稍等'
              });
              var params = new URLSearchParams();
              params.append('edu_id', that.edu.id);
              params.append('staff_ids', that.checked_id);
              that.axios.post(_global.baseUrl + 'edu_toAddTeacher',params).then(res => {
                if(res.data.status==200){
                  loading.modal('close')
                  AMUI.dialog.alert({
                    content:'添加成功',
                    onConfirm:function(){
                      that.$router.go(-1);
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
    }
  };
  </script>