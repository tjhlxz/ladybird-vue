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
                                <input type="text" v-model="search_value" @keyup.enter="search" class="form-control form-control-solid" placeholder="按老师姓名搜索..."></div>
                        </div>
                    </div>
                </div>
                <div class="tpl-block">
                    <div class="tpl-portlet-components">
                      <div class="portlet-title">
                        <div class="caption font-green bold">
                          <span class="am-icon-plus"></span> 添加教师
                        </div>
                      </div>
                      <div class="tpl-block ">
                        <div class="am-g tpl-amazeui-form">
                          <div class="am-u-sm-12 am-u-md-9">
                            <div class="am-form am-form-horizontal">
                              <div class="am-form-group">
                                <label for="user-id" class="am-u-sm-3 am-form-label">教师教工号</label>
                                <div class="am-u-sm-9">
                                  <input type="text" id="user-id" v-model="staff_id" maxlength="10" placeholder="请在此处填写教师教工号">
                                </div>
                              </div>
                              <div class="am-form-group">
                                <label for="user-name" class="am-u-sm-3 am-form-label">教师姓名</label>
                                <div class="am-u-sm-9">
                                  <input type="text" id="user-name" v-model="staff_name" maxlength="10" placeholder="请在此处填写教师姓名">
                                </div>
                              </div>
                                <div class="portlet-title" >
                                      <label class="am-u-sm-3 am-form-label">教研室</label>
                                      <div class="am-u-sm-9">
                                          <select data-am-selected="{maxHeight: 200}" @click="select_click" v-model="staff_room_select" class="am-input-sm data-am-selected">
                                            <option v-for="(room, index) in staff_room" :value="staff_room[index]" name="staff_room_select">{{room}}</option>
                                          </select>
                                      </div>
                                </div>
                              <div class="am-form-group">
                                <div class="am-u-sm-9 am-u-sm-push-3">
                                  <input type="submit" value="添加教师" @click="add_teacher" class="am-btn am-btn-success">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="portlet-title">
                        <div class="caption font-green bold">
                          <span class="am-icon-code"></span> 教师列表
                        </div>
                        <div class="portlet-title">
                        <div class="caption  bold">
                          <label class="font-black">&nbsp;&nbsp;&nbsp;&nbsp;共有<label class="font-green">{{content.count}}</label>人</label>
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
                                            <th>教工号</th>
                                            <th>姓名</th>
                                            <th>所属教研室</th>
                                            <th>操作</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for='(item, index) in content.teachers' :key="index">
                                        <tr>
                                            <td></td>
                                            <td>{{item.staff_id}}</td>
                                            <td><a href="#">{{item.staff_name}}</a></td>
                                            <td class="am-hide-sm-only">{{item.staff_room}}</td>
                                            <td>
                                                <div class="am-btn-toolbar">
                                                    <div class="am-btn-group am-btn-group-xs">
                                                            <button @click="change($event, index)" class="am-btn am-btn-default am-btn-xs am-text-secondary"><span class="am-icon-pencil-square-o"></span> 修改</button>
                                                        
                                                            <button @click="del($event, index)" class="am-btn am-btn-default am-btn-xs am-hide-sm-only"><span class="am-icon-copy"></span> 删除</button>
                                                    </div>
                                                </div>
                                            </td>
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
                <div class="am-modal am-modal-prompt" tabindex="-1" id="my-prompt">
                  <div class="am-modal-dialog">
                    <div class="am-modal-hd">修改教研室</div>
                    <div class="am-modal-bd">
                      将 {{staff_room_old}} 修改为
                      <!-- <input type="text" class="am-modal-prompt-input"> -->
                      <select data-am-selected="{maxHeight: 200}" @click="select_click" v-model="staff_room_select"  class="am-input-sm data-am-selected">
                        <option v-for="(room, index) in staff_room" :value="staff_room[index]" name="staff_room_select">{{room}}</option>
                      </select>
                    </div>
                    <div class="am-modal-footer">
                      <span class="am-modal-btn" data-am-modal-cancel>取消</span>
                      <span class="am-modal-btn" data-am-modal-confirm>提交</span>
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
  name: 'College_teacher',
  data() {
    return {
        content: {
            teachers: []
        },
        search_value: '',
        staff_room_old: '',
        staff_room: '',
        staff_room_select: '',
        staff_id: '',
        staff_name: '',
        college: '',
        _id: 0
    }
  },
  mounted() {
    var _this = this;
    _this.college = JSON.parse(sessionStorage.getItem("data")).college;
    _this.axios.get(_global.baseUrl + 'teacher_list' + '?college=' + _this.college + '&page=1').then(res => {
        _this.content = res.data.data;
        _this.length = Math.ceil(_this.content.count/11);

        if(res.data.status==200){
            this.content = res.data.data;
        }
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
    _this.axios.get(_global.baseUrl + 'selectStaffroomForCollege' + '?college=' + _this.college).then(res => {
          if(res.data.status==200){
            var staff_room = [];
            for(var i of res.data.data) {
                staff_room.push(i.staff_room);
            }
            _this.staff_room = staff_room;
          }
        })
  },
  methods: {
    link_left: function(e) {
        var _this = this;
        $(e.target).parent().siblings().removeClass('am-active');
        var index = parseInt(e.target.firstChild.data);
        if(index === index) {
            _this.axios.get(_global.baseUrl + 'teacher_list' + '?college=' + _this.college + '&page=' + index).then(body => {
            _this.content = body.data.data;
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
            _this.axios.get(_global.baseUrl + 'teacher_list' + '?college=' + _this.college + '&page='+index).then(body => {
            _this.content = body.data.data;
            })
            var bef = [];


            bef.push(_this.arr.slice(_this.length-7, _this.length-3));
            _this.before = bef[0];
            $('.ellipsis').hide();
        }
        _this.page = index;
        for(var box = 0;box<3;box++) {
            if(_this.after[box] == index) {
                console.log(_this.after[box])
                    var dom = $('.aft')[box];
                    dom.setAttribute('class', 'aft am-active');
                }
        }
    },
    fir: function(e) {
        var _this = this;
        $(e.target).parent().siblings().removeClass('am-active');
        var index = parseInt(e.target.firstChild.data);
        _this.axios.get(_global.baseUrl + 'teacher_list' + '?college=' + _this.college + '&page=1').then(body => {
        _this.content = body.data.data;
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
        _this.axios.get(_global.baseUrl + 'teacher_list' + '?college=' + _this.college + '&page='+(_this.page-1)).then(body => {
            _this.content = body.data.data;
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
        _this.axios.get(_global.baseUrl + 'teacher_list' + '?college=' + _this.college + '&page='+(_this.page+1)).then(body => {
            _this.content = body.data.data;
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
    select_click: function(e) {
        var _this = this;
        _this.axios.get(_global.baseUrl + 'selectStaffroomForCollege' + '?college=' + _this.college).then(res => {
          if(res.data.status==200){
            var staff_room = [];
            for(var i of res.data.data) {
                staff_room.push(i.staff_room);
            }
            _this.staff_room = staff_room;
            // _this.staff_room = res.data.data;
          }
        })
    },
    add_teacher: function() {
        var _this = this;
        var staff_id = _this.staff_id;
        var staff_name = _this.staff_name;
        var staff_room_select = _this.staff_room_select;

        if(!staff_id) {
            AMUI.dialog.alert({
              content: '请输入教工号'
            });
            return false;
        }
        if(!staff_name) {
            AMUI.dialog.alert({
              content: '请输入教师姓名'
            });
            return false;
        }
        if(!staff_room_select) {
            AMUI.dialog.alert({
              content: '请选择教研室'
            });
            return false;
        }

        AMUI.dialog.confirm({
            content: '是否要添加教师？',
            onConfirm: function() {
                var params = new URLSearchParams();
                params.append('college', _this.college);
                params.append('staff_room', staff_room_select);
                params.append('staff_id', staff_id);
                params.append('staff_name', staff_name);
                _this.axios.post(_global.baseUrl + 'addStaff',params).then(res => {
                  if(res.status==200){
                    AMUI.dialog.alert({
                      content: res.data.message,
                      onConfirm:function(){
                        _this.college = JSON.parse(sessionStorage.getItem("data")).college;
                        _this.axios.get(_global.baseUrl + 'teacher_list' + '?college=' + _this.college + '&page=1').then(res => {
                            _this.content = res.data.data;
                            _this.length = Math.ceil(_this.content.count/11);

                            if(res.data.status==200){
                                _this.content = res.data.data;
                            }
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
                        _this.axios.get(_global.baseUrl + 'selectStaffroomForCollege' + '?college=' + _this.college).then(res => {
                              if(res.data.status==200){
                                var staff_room = [];
                                for(var i of res.data.data) {
                                    staff_room.push(i.staff_room);
                                }
                                _this.staff_room = staff_room;
                              }
                            })
                      }
                    })
                  }
                })
            },
            onCancel: function() {
            }

        })
    },
    change: function(e, index) {
        var _this = this;
        var _e = e;
        _this._id = _this.content.teachers[index].id;
        console.log(_this._id)
        _this.staff_room_old = _this.content.teachers[index].staff_room;

        $('#my-prompt').modal({

            onConfirm: function(e) {

                var params = new URLSearchParams();
                params.append('id', _this._id);
                params.append('staff_room', _this.staff_room_select);
                AMUI.dialog.confirm({
                    title: ' ',
                    content: '是否修改？',
                    onConfirm: function(e) {
                        _this.axios.post(_global.baseUrl + 'reviseStaff',params).then(res => {

                              if(res.status==200){
                                console.log(res.data)

                                AMUI.dialog.alert({
                                  content: res.data.message
                                })
                                _this.college = JSON.parse(sessionStorage.getItem("data")).college;
                                    _this.axios.get(_global.baseUrl + 'teacher_list' + '?college=' + _this.college + '&page=1').then(res => {
                                        _this.content = res.data.data;
                                        _this.length = Math.ceil(_this.content.count/11);

                                        if(res.data.status==200){
                                            _this.content = res.data.data;
                                        }
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
                                    _this.axios.get(_global.baseUrl + 'selectStaffroomForCollege' + '?college=' + _this.college).then(res => {
                                          if(res.data.status==200){
                                            var staff_room = [];
                                            for(var i of res.data.data) {
                                                staff_room.push(i.staff_room);
                                            }
                                            _this.staff_room = staff_room;
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
        var _id = _this.content.teachers[index].id;

        AMUI.dialog.confirm({
            title: ' ',
            content: '是否删除该老师？',
            onConfirm: function(e) {
                _this.axios.delete(_global.baseUrl + 'reviseStaff', {params:{'id':_id}}).then(res => {

                      if(res.status==200){
                        console.log(res.data)

                        AMUI.dialog.alert({
                          content: res.data.message
                        })
                        _this.college = JSON.parse(sessionStorage.getItem("data")).college;
                        _this.axios.get(_global.baseUrl + 'teacher_list' + '?college=' + _this.college + '&page=1').then(res => {
                            _this.content = res.data.data;
                            _this.length = Math.ceil(_this.content.count/11);

                            if(res.data.status==200){
                                _this.content = res.data.data;
                            }
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
                        _this.axios.get(_global.baseUrl + 'selectStaffroomForCollege' + '?college=' + _this.college).then(res => {
                              if(res.data.status==200){
                                var staff_room = [];
                                for(var i of res.data.data) {
                                    staff_room.push(i.staff_room);
                                }
                                _this.staff_room = staff_room;
                              }
                            })
                      }
                })
            }  
        })
    },
    search: function() {
        var _this = this;
        var value = _this.search_value;

        _this.axios.post(_global.baseUrl + 'selectTeacherForName' + '?college=' + _this.college + '&name=' + value).then(res => {
          if(res.data.status == 200){
            _this.content.teachers = res.data.data;
            _this.search_value = '';
            AMUI.dialog.alert({
                content: res.data.message
            })
          }else {
            _this.content.teachers = res.data.data;
            AMUI.dialog.alert({
                content: res.data.message
            })
          }
        })
    }
  }
}
</script>