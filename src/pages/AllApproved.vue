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
                            <div class="portlet-title">
                                <div class="caption  bold">
                                  <label>选择学院:</label>
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
                            </div>

                            <form class="am-form" >
                                <table class="am-table am-table-striped am-table-hover table-main">
                                    <thead>
                                        <tr>
                                            <th class="table-check"><input type="checkbox" class="tpl-table-fz-check"></th>
                                            <th class="table-id">职工号</th>
                                            <th class="table-title">姓名</th>
                                            <th class="table-type">级别</th>
                                            <th class="table-author am-hide-sm-only">所属院系</th>
                                            <th class="table-date am-hide-sm-only">所属单位</th>
                                            <th class="table-set">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for='(item, key) in content.userdata'>
                                        <tr>
                                            <td><input type="checkbox"></td>
                                            <td>{{item.staff_id}}</td>
                                            <td><a href="#">{{item.staff_name}}</a></td>
                                            <td v-if="item.staff_level == 0">普通职工</td>
                                            <td v-if="item.staff_level == 1">教研室主任</td>
                                            <td v-if="item.staff_level == 2">教学院长</td>
                                            <td v-if="item.staff_level == 3">教务处处长</td>
                                            <td v-if="item.staff_level == 4">教务科</td>
                                            <td v-if="item.staff_level == 5">评估中心</td>
                                            <td v-if="item.staff_level == 6">督导</td>
                                            <td class="am-hide-sm-only">{{item.college}}</td>
                                            <td class="am-hide-sm-only">{{item.staff_room}}</td>
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
                            </form>
                        </div>
                    </div>
                </div>
                <div class="tpl-alert"></div>
            </div>
        </div>
</template>

<script>
import _global from '../components/Global'
export default {
  name: 'AllApproved',
  data() {
    return {
        content: {
            
        },
        teacher_college: '无',
        length: 0,
        arr: [],
        before: [],
        after: [],
        page: 1
    }
  },
  mounted() {
    var _this = this;
    _this.axios.get(_global.baseUrl + 'all_user?page=1').then(body => {
    _this.content = body.data.data;
    _this.length = Math.ceil(_this.content.count/11);

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
    
  },
  methods: {
    link_left: function(e) {
        var _this = this;
        $(e.target).parent().siblings().removeClass('am-active');
        var index = parseInt(e.target.firstChild.data);
        if(index === index) {
            _this.axios.get(_global.baseUrl + 'all_user?page=' + index).then(body => {
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
            console.log(_this.before)
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
            _this.axios.get(_global.baseUrl + 'all_user?page='+index).then(body => {
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
        _this.axios.get(_global.baseUrl + 'all_user?page=1').then(body => {
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
        _this.axios.get(_global.baseUrl + 'all_user?page='+(_this.page-1)).then(body => {
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
        _this.axios.get(_global.baseUrl + 'all_user?page='+(_this.page+1)).then(body => {
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

    select: function(e) {
        this.axios.get(_global.baseUrl + '?').then(body => {
          if(body.data.status==200){
            this.content = body.data.data;
          }else if(body.data.status==400){
            AMUI.dialog.alert({
              content: ''
            });
            this.content=[]
          }
        })
    },

    detail: function() {
        // this.$router.push({path:'/form-line',query:{id:item.form_id}})
    }
  }
}
</script>