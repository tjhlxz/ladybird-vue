<template>
  <div class="tpl-content-wrapper"">
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
                                            <li @click="fir"><a href="#">«</a></li>
                                            <li class="bef" v-for='bef in before' @click="link_left">
                                                <a>{{bef}}</a>
                                            </li>
                                            <li class="am-disabled ellipsis"><a href="#">...</a></li>
                                            <li v-for='aft in after' @click="link_right">
                                                <a>{{aft}}</a>
                                            </li>
                                            <li @click="las"><a href="#">»</a></li>
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
        length: 9,
        arr: [],
        before: [],
        after: []
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
        var index = parseInt(e.target.firstChild.data);
    if(index === index) {
            _this.axios.get(_global.baseUrl + 'all_user?page='+index).then(body => {
            _this.content = body.data.data;
            })
        
        var bef = [];
        
        
        if(index > 1 && index < _this.length - 4) {
            bef.push(_this.arr.slice(index-2, index+2));
            _this.before = bef[0];
        }

        if(index == _this.length-4) {
            bef.push(_this.arr.slice(index-3, index+1))
            _this.before = bef[0];
        }
        if(index >= _this.length - 5) {
            $('.ellipsis').hide();
        }else {
            $('.ellipsis').show();
        }
    }
    },
    link_right: function(e) {
        var _this = this;
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
    },
    fir: function(e) {
        var _this = this;
        _this.axios.get(_global.baseUrl + 'all_user?page=1').then(body => {
        _this.content = body.data.data;
        })
        var bef = [];

        bef.push(_this.arr.slice(0, 4));
        _this.before = bef[0];
    },
    las: function(e) {
        var _this = this;
        _this.axios.get(_global.baseUrl + 'all_user?page='+_this.length).then(body => {
        _this.content = body.data.data;
        })
        var bef = [];

        bef.push(_this.arr.slice(_this.length-7, _this.length-3));
        _this.before = bef[0];
        $('.ellipsis').hide();
    },
    detail: function() {
        // this.$router.push({path:'/form-line',query:{id:item.form_id}})
    }
  }
}
</script>