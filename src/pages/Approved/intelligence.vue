<template>
    <div class="tpl-content-wrapper">
        <div class="tpl-content-page-title">
          学院请假率
        </div>
        <div class="tpl-portlet-components">
            <div class="am-g tpl-amazeui-form">
              <div class="am-u-sm-12 am-u-md-9">
                <div class="am-form am-form-horizontal">
                    <div class="am-form-group">
                        <input style="width:100px;position: absolute;left:20px; top:0px;" type="text" v-model="years" placeholder="请输入年份">

                        <div class="am-form-select" style="width: 250px;position: absolute;left:150px; top:0px;">
                          <select class="am-input-sm" v-model="date" readonly>
                            <option value="-08-01,-02-01" name="date">第一学期</option>
                            <option value="-02-01,-08-01" name="date">第二学期</option>
                          </select>
                        </div>

                            <button style="position: absolute;top: 0px;left: 425px;" type="button" @click="seach_app" class="am-btn am-btn-default am-btn-success"> 查询</button>
                    <table class="gridtable" style="margin-top: 80px;">
                        <tr>
                            <th>学院名称</th>
                            <th>学院总人数</th>
                            <th>提交审批表数</th>
                            <th>请假率</th>
                        </tr>
                        <tr v-for="item in table">
                            <td>{{item.college}}</td>
                            <td>{{item.people}}</td>
                            <td>{{item.form}}</td>
                            <td>{{item.form/item.people*100+'%'}}</td>
                        </tr>
                    </table>
                                   

                        <div class="tpl-echarts" id="tpl-echarts-A" style="width: 800px;height: 400px;margin-top: 40px;">
                        </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        <div class="tpl-content-page-title">
          历史请假率
        </div>
        <div class="tpl-portlet-components">
            <div class="am-g tpl-amazeui-form">
              <div class="am-u-sm-12 am-u-md-9">
                <div class="caption  bold">
                      <label style="margin-right: 10px;">按学院查询:</label>
                      <select v-model="teacher_college">
                       <option v-for="(item,index) in college" :value="item.college" name="teacher_college">{{item.college}}</option>
                      </select>
                </div>
                      <button style="position: absolute;top: 0px;left: 320px;" type="button" @click="seach_self" class="am-btn am-btn-default am-btn-success"> 查询</button>
                                   

                    <div class="tpl-echarts" id="tpl-echarts-B" style="width: 800px;height: 400px;margin-top: 40px;">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import _global from '../../components/Global'
  export default {
    name: 'Intelligence',
    data() {
        return {
            content: {},
            option: {},
            date: '',
            years: '',
            teacher_college: '无',
            college: [],
            table: []
        }
    },
    mounted() {
        var _this = this;
        _this.echartsA = echarts.init(document.getElementById('tpl-echarts-A'));
        _this.echartsB = echarts.init(document.getElementById('tpl-echarts-B'));
        var option = {
            legend: {},
                tooltip: {},
                dataset: {
                    source: [
                        ['product', '2018-2019 第一学期']
                    ]
                },
                xAxis: [
                    {type: 'category'}
                ],
                yAxis: [
                    {gridIndex: 0}
                ],
                grid: [
                    {bottom: '25%'},
                    {top: '55%'}
                ],
                series: [
                    {type: 'bar', seriesLayoutBy: 'row'}
                ]
        };
            _this.option = option;
            _this.echartsA.setOption(option);
            _this.echartsB.setOption(option);
        _this.axios.get(_global.baseUrl + 'allCollege').then(res => {
            if(res.status==200){
              _this.college = res.data.data;
            }else{
              AMUI.dialog.alert({
                content: res.data.message
            });
          }
        })
    },
    methods: {
        seach_app: function() {
            var _this = this;
            var date = _this.date.split(',');
            _this.years = _this.years.split('-')[0];
            if(date[0] == '-08-01') {
                //-08-01,-02-01
                var timestart = _this.years + date[0];
                var timeend = +_this.years + 1 + date[1];
                _this.axios.get(_global.baseUrl + 'statistics_leaveRate?timestart=' + timestart + '&timeend=' + timeend).then(res => {
                    if(res.data.status == 200) {
                        var table = [];
                        for(var item in res.data.data) {
                            table.push({'college': item, 'people': res.data.data[item].people, 'form': res.data.data[item].form});
                        }
                        _this.table = table;
                        _this.echartsA.clear();
                        _this.option.dataset.source = [];
                        _this.option.series = [];
                        _this.content = res.data.data;
                        _this.years = _this.years +'-'+ (+_this.years+1);
                        var source = [['product', _this.years+' 第一学期']];

                        for(var echart in _this.content) {
                            source.push([echart, (_this.content[echart].form/_this.content[echart].people).toFixed(2)]);

                        }

                        var len = source.length;
                        var data = [];
                        for(var i = 0;i<len-1;i++) {
                            data.push({type: 'bar', seriesLayoutBy: 'row'});
                        }

                            var option = {
                                legend: {
                                    type: 'scroll',
                                    bottom: 20
                                },
                                tooltip: {},
                                dataset: {
                                    source: source
                                },
                                xAxis: [
                                    {type: 'category', gridIndex: 0}
                                ],
                                yAxis: [
                                    {type: 'value', name:'请假率', gridIndex: 0}
                                ],
                                grid: [
                                    {bottom: '25%'}
                                ],
                                series: data
                            }
                        _this.option = option;
                        _this.echartsA.setOption(option);
                    }else {

                    }
                })
                
            }else if(date[0] == '-02-01'){
                //-02-01,-08-01
                var timestart = +_this.years + 1 + date[0];
                var timeend = +_this.years + 1 + date[1];
                _this.axios.get(_global.baseUrl + 'statistics_leaveRate?timestart=' + timestart + '&timeend=' + timeend).then(res => {
                    if(res.data.status == 200) {
                        var table = [];
                        for(var item in res.data.data) {
                            table.push({'college': item, 'people': res.data.data[item].people, 'form': res.data.data[item].form});
                        }
                        _this.table = table;
                        _this.echartsA.clear();
                        _this.option.dataset.source = [];
                        _this.option.series = [];
                        _this.content = res.data.data;
                        _this.years = _this.years +'-'+ (+_this.years+1);
                        var source = [['product', _this.years+' 第二学期']];

                        for(var echart in _this.content) {
                            source.push([echart, (_this.content[echart].form/_this.content[echart].people).toFixed(2)]);

                        }

                        var len = source.length;
                        var data = [];
                        for(var i = 0;i<len-1;i++) {
                            data.push({type: 'bar', seriesLayoutBy: 'row'});
                        }

                        // var echartsA = echarts.init(document.getElementById('tpl-echarts-A'));
                            var option = {
                                legend: {
                                    type: 'scroll',
                                    bottom: 20
                                },
                                tooltip: {},
                                dataset: {
                                    source: source
                                },
                                xAxis: [
                                    {type: 'category', gridIndex: 0}
                                ],
                                yAxis: [
                                    {type: 'value', name:'请假率', gridIndex: 0}
                                ],
                                grid: [
                                    {bottom: '25%'}
                                ],
                                series: data
                            }
                        _this.option = option;
                        _this.echartsA.setOption(option);
                    }else {

                    }
                })
            }
        },
        seach_self: function() {
          var _this = this;
          _this.axios.get(_global.baseUrl + 'statistics_one_college' + '?college='+_this.teacher_college).then(res => {
            if(res.data.status==200) {
                _this.echartsB.clear();
                _this.option.dataset.source = [];
                _this.option.series = [];
                var source = [['product', _this.teacher_college]];
                for(var item in res.data.data) {
                    source.push([item, (res.data.data[item].count/res.data.data[item].people).toFixed(2)]);
                }

                var len = source.length;
                var data = [];
                for(var i = 0;i<len-1;i++) {
                    data.push({type: 'bar', seriesLayoutBy: 'row'});
                }

                    var option = {
                        legend: {
                            type: 'scroll',
                            bottom: 20
                        },
                        tooltip: {},
                        dataset: {
                            source: source
                        },
                        xAxis: [
                            {type: 'category', gridIndex: 0}
                        ],
                        yAxis: [
                            {type: 'value', name:'请假率', gridIndex: 0}
                        ],
                        grid: [
                            {bottom: '25%'}
                        ],
                        series: data
                    }
                _this.option = option;
                _this.echartsB.setOption(option);
            }
          })
        }
    }
  }
</script>

<style scoped>
.gridtable {
  font-family: verdana,arial,sans-serif;
  font-size:11px;
  color:#333333;
  border-width: 1px;
  border-color: #666666;
  border-collapse: collapse;
}
.gridtable th {
 border-width: 1px;
 padding: 8px;
 border-style: solid;
 border-color: #666666;
 background-color: #dedede;
 text-align: center;
}
.gridtable td {
 border-width: 1px;
 padding: 8px;
 border-style: solid;
 border-color: #666666;
 background-color: #ffffff;
 text-align: center;
}
</style>