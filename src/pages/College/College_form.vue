<template>
  <div class="tpl-content-wrapper">
    <div class="tpl-portlet-components">
        <div class="portlet-title">
            <div class="caption font-green bold">
                <span class="am-icon-code"></span> 列表
            </div>
        </div>
        <div class="tpl-block">
            <div class="am-g">
                <div class="am-u-sm-12">
                    <div class="portlet-title">
                        <div class="caption  bold">
                          <label>按学院查询:</label>
                          <select data-am-selected="{maxHeight: 200}" v-model="teacher_college" @click="select_click" @change="select">
                            <option v-for="(room, index) in staff_room" :value="staff_room[index]" name="staff_room_select">{{room}}</option>
                        </select>
                    </div>           
                </div>

                <form class="am-form" >
                    <table class="am-table am-table-striped am-table-hover table-main">
                        <thead>
                            <tr>
                                <th>教工号</th>
                                <th>姓名</th>
                                <th>申请类型</th>
                                <th>所属院系</th>
                                <th class="table-date am-hide-sm-only">所属单位</th>

                                <th>申请时间</th>
                                <th>详情</th>
                                <!-- <th class="table-set">操作</th> -->
                            </tr>
                        </thead>
                        <tbody v-for='(item, key) in formsData'>
                            <tr>
                                <td>{{item.form_proposer_id}}</td>
                                <td>{{item.form_proposer_name}}</td>
                                <td v-if="item.form_type == 1">变更</td>
                                <td v-else>调串</td>
                                <td class="am-hide-sm-only">{{item.form_college}}</td>
                                <td class="am-hide-sm-only">{{item.form_staff_room}}</td>

                                <td>{{item.create_time}}</td>
                                <td><router-link :to="{path:'/College-form-detail',query:{id:item.form_id}}">
                                    <button class="am-btn am-btn-default am-btn-xs am-text-secondary"><span class="am-icon-file-text-o"></span> 查看详情</button>
                                </router-link></td>
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
import _global from '../../components/Global'
export default {
  name: 'College_form',
  data() {
    return {
        content:{},
        college: '',
        formsData:[],
        teacher_college: '无',
        length: 0,
        arr: [],
        before: [],
        after: [],
        page: 1,
        search_staff_name:'',
        staff_room: []
    }
},
mounted() {
    var loading=AMUI.dialog.loading({
        title:'正在加载，请稍等'
    });
    var _this = this;
    _this.college = JSON.parse(sessionStorage.getItem("data")).college;
    _this.axios.get(_global.baseUrl + 'allPassForm?page=1'+'&college='+_this.college).then(body => {
        
        _this.content = body.data.data;
        _this.formsData=_this.content.formsData;
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

    _this.axios.get(_global.baseUrl + 'selectStaffroomForCollege' + '?college=' + _this.college).then(res => {
        loading.modal('close');
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
            _this.axios.get(_global.baseUrl + 'allPassForm?page=' + index+'&college='+_this.college).then(body => {
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
        _this.axios.get(_global.baseUrl + 'allPassForm?page='+index+ '&college=' + _this.college).then(body => {
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
            var dom = $('.aft')[box];
            dom.setAttribute('class', 'aft am-active');
        }
    }
},
fir: function(e) {
    var _this = this;
    $(e.target).parent().siblings().removeClass('am-active');
    var index = parseInt(e.target.firstChild.data);
    _this.axios.get(_global.baseUrl + 'allPassForm?page=1'+'&college='+college).then(body => {
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
    _this.axios.get(_global.baseUrl + 'allPassForm?page='+(_this.page-1)+'&college='+_this.college).then(body => {
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
    _this.axios.get(_global.baseUrl + 'allPassForm?page='+(_this.page+1)+'&college='+_this.college).then(body => {
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
select_click: function() {
    var loading=AMUI.dialog.loading({
        title:'正在加载，请稍等'
    });
    var _this = this;
    _this.axios.get(_global.baseUrl + 'selectStaffroomForCollege' + '?college=' + _this.college).then(res => {
        loading.modal('close');
        if(res.data.status==200){
            var staff_room = [];
            for(var i of res.data.data) {
                staff_room.push(i.staff_room);
            }
            _this.staff_room = staff_room;
            // _this.staff_room = res.data.data;
        }else{
            AMUI.dialog.alert({
                content: res.data.message
            });
        }
    })
},
select: function(e) {
    var loading=AMUI.dialog.loading({
        title:'正在加载，请稍等'
    });
    var that=this;
    this.axios.get(_global.baseUrl + 'allPassForm?page=1&college='+that.teacher_college).then(body => {
        loading.modal('close');
        if(body.data.status==200){
            that.content = body.data.data;
            that.formsData=that.content.formsData;
        }else if(body.data.status==400){
            AMUI.dialog.alert({
              content: body.data.message
          });
            this.formsData=[]
        }
    })
},
}
};
</script>