<template>
    <div class="tpl-content-wrapper">
        <div class="tpl-content-page-title">
          教研室请假率
        </div>
        <div class="tpl-portlet-components">
            <div class="am-g tpl-amazeui-form">
              <div class="am-u-sm-12 am-u-md-9">
                <div class="am-form am-form-horizontal">
                    <div class="am-form-group" style="width: 80px;">

                        <input type="text" v-model="years" placeholder="请输入年份">

                        <div class="am-form-select" style="width: 250px;position: absolute;left:120px; top:5px;">
                          <select class="am-input-sm" v-model="date" readonly>
                            <option value="-08-01,-02-01" name="date">第一学期</option>
                            <option value="-02-01,-08-01" name="date">第二学期</option>
                          </select>
                        </div>
                                        <button style="position: absolute;top: 0px;left: 500px;" type="button" @click="seach_app" class="am-btn am-btn-default am-btn-success">查询</button>

                    <div class="tpl-echarts" id="tpl-echarts-A" style="width: 800px;height: 400px;margin-top: 40px;">
                    </div>
                </div>
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
    name: 'Intelligence_college',
    data() {
        return {
            content: {},
            option: {},
            date: '',
            years: '',
            staff_room_select: '',
            staff_room: ''
        }
    },
    mounted() {
        var _this = this;
        _this.college = JSON.parse(sessionStorage.getItem("data")).college;
        _this.echartsA = echarts.init(document.getElementById('tpl-echarts-A'));
           var option = {
                legend: {
                    type: 'scroll',
                    bottom: 20
                },
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
                    // These series are in the first grid.
                    {type: 'bar', seriesLayoutBy: 'row'}
                ]
        };
            _this.option = option;
            _this.echartsA.setOption(option);
            _this.college = JSON.parse(sessionStorage.getItem("data")).college;
    },
    methods: {
        select_click: function(e) {

        },
        seach_app: function() {
            var _this = this;
            var date = _this.date.split(',');
            if(date[0] == '-08-01') {
                //-08-01,-02-01
                var timestart = _this.years + date[0];
                var timeend = +_this.years + 1 + date[1];
                _this.axios.get(_global.baseUrl + 'statistics_forCollege'+'?college='+_this.college+'&timestart=' + timestart + '&timeend=' + timeend).then(res => {
                    if(res.data.status == 200) {
                        _this.echartsA.clear();
                        _this.option.dataset.source = [];
                        _this.option.series = [];
                        _this.content = res.data.data;
                        var source = [['product', _this.years+'-'+(+_this.years+1)+' 第一学期']];

                        for(var echart in _this.content) {
                            source.push([echart, (_this.content[echart].form/_this.content[echart].people).toFixed(2)]);
                        }

                        var len = source.length-1;
                        var data = [];
                        for(var i = 0;i<len;i++) {
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
                _this.axios.get(_global.baseUrl + 'statistics_forCollege'+'?college='+_this.college+'&timestart=' + timestart + '&timeend=' + timeend).then(res => {
                    if(res.data.status == 200) {
                        _this.echartsA.clear();
                        _this.content = res.data.data;
                        _this.option.dataset.source = [];
                        _this.option.series = [];
                        var source = [['product', _this.years+'-'+(+_this.years+1)+' 第二学期']];

                        for(var echart in _this.content) {
                            source.push([echart, (_this.content[echart].form/_this.content[echart].people).toFixed(2)]);
                        }

                        var len = source.length;
                        var data = [];
                        for(var i = 0;i<len;i++) {
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
                                axisLabel: {  
                                   interval:0,  
                                   rotate:40  
                                },
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
        }
    }
  }
</script>