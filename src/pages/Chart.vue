<template>
  <div class="tpl-content-wrapper">
            <div class="tpl-content-page-title">
                Amaze UI 表单
            </div>
            <ol class="am-breadcrumb">
                <li><a href="#" class="am-icon-home">首页</a></li>
                <li><a href="#">表单</a></li>
                <li class="am-active">Amaze UI 表单</li>
            </ol>
            <div class="tpl-portlet-components">
                <div class="portlet-title">
                    <div class="caption font-green bold">
                        <span class="am-icon-code"></span> 折线图
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
                        <div class="am-u-sm-12 am-u-md-6">
                            <div class="am-btn-toolbar">
                                <div class="am-btn-group am-btn-group-xs">
                                    <button type="button" class="am-btn am-btn-default am-btn-success"><span class="am-icon-plus"></span> 新增</button>
                                    <button type="button" class="am-btn am-btn-default am-btn-secondary"><span class="am-icon-save"></span> 保存</button>
                                    <button type="button" class="am-btn am-btn-default am-btn-warning"><span class="am-icon-archive"></span> 审核</button>
                                    <button type="button" class="am-btn am-btn-default am-btn-danger"><span class="am-icon-trash-o"></span> 删除</button>
                                </div>
                            </div>
                        </div>
                        <div class="am-u-sm-12 am-u-md-3">
                            <div class="am-form-group">
                                <select data-am-selected="{btnSize: 'sm'}">
                                  <option value="option1">所有类别</option>
                                  <option value="option2">IT业界</option>
                                  <option value="option3">数码产品</option>
                                  <option value="option3">笔记本电脑</option>
                                  <option value="option3">平板电脑</option>
                                  <option value="option3">只能手机</option>
                                  <option value="option3">超极本</option>
                                </select>
                            </div>
                        </div>
                        <div class="am-u-sm-12 am-u-md-3">
                            <div class="am-input-group am-input-group-sm">
                                <input type="text" class="am-form-field">
                                <span class="am-input-group-btn">
                                    <button class="am-btn  am-btn-default am-btn-success tpl-am-btn-success am-icon-search" type="button"></button>
                                </span>
                            </div>
                        </div>
                    </div>

                    <!--此部分数据请在 js文件夹下中的 app.js 中的 “百度图表A” 处修改数据 插件使用的是百度echarts-->
                    <div class="tpl-echarts tpl-chart-mb" id="tpl-echarts-A">

                    </div>
                    <div class="portlet-title">
                        <div class="caption font-green bold">
                            <span class="am-icon-code"></span> 雷达图
                        </div>
                    </div>
                    <div class="tpl-echarts tpl-chart-mb" id="tpl-echarts-B">

                    </div>

                    <div class="portlet-title">
                        <div class="caption font-green bold">
                            <span class="am-icon-code"></span> 折线柱图
                        </div>
                    </div>
                    <div class="tpl-echarts tpl-chart-mb" id="tpl-echarts-C">

                    </div>
                </div>

            </div>

            </div>
</template>

<script>
    
var pageData = {
        // ===============================================
        // 首页
        // ===============================================
        'index': function indexData() {

            var myScroll = new IScroll('#wrapper', {
                scrollbars: true,
                mouseWheel: true,
                interactiveScrollbars: true,
                shrinkScrollbars: 'scale',
                preventDefault: false,
                fadeScrollbars: true
            });

            var myScrollA = new IScroll('#wrapperA', {
                scrollbars: true,
                mouseWheel: true,
                interactiveScrollbars: true,
                shrinkScrollbars: 'scale',
                preventDefault: false,
                fadeScrollbars: true
            });

            var myScrollB = new IScroll('#wrapperB', {
                scrollbars: true,
                mouseWheel: true,
                interactiveScrollbars: true,
                shrinkScrollbars: 'scale',
                preventDefault: false,
                fadeScrollbars: true
            });



            // document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);

            // ==========================
            // 百度图表A http://echarts.baidu.com/
            // ==========================

            var echartsA = echarts.init(document.getElementById('tpl-echarts-A'));
            option = {

                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    data: ['邮件', '媒体', '资源']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: true,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }],

                yAxis: [{
                    type: 'value'
                }],
                series: [{
                        name: '邮件',
                        type: 'line',
                        stack: '总量',
                        areaStyle: { normal: {} },
                        data: [120, 132, 101, 134, 90, 230, 210],
                        itemStyle: {
                            normal: {
                                color: '#59aea2'
                            },
                            emphasis: {

                            }
                        }
                    },
                    {
                        name: '媒体',
                        type: 'line',
                        stack: '总量',
                        areaStyle: { normal: {} },
                        data: [220, 182, 191, 234, 290, 330, 310],
                        itemStyle: {
                            normal: {
                                color: '#e7505a'
                            }
                        }
                    },
                    {
                        name: '资源',
                        type: 'line',
                        stack: '总量',
                        areaStyle: { normal: {} },
                        data: [150, 232, 201, 154, 190, 330, 410],
                        itemStyle: {
                            normal: {
                                color: '#32c5d2'
                            }
                        }
                    }
                ]
            };
            echartsA.setOption(option);
        },
        // ===============================================
        // 图表页
        // ===============================================
        'chart': function chartData() {
            // ==========================
            // 百度图表A http://echarts.baidu.com/
            // ==========================

            var echartsC = echarts.init(document.getElementById('tpl-echarts-C'));


            optionC = {
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    top: '0',
                    feature: {
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                legend: {
                    data: ['蒸发量', '降水量', '平均温度']
                },
                xAxis: [{
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                }],
                yAxis: [{
                        type: 'value',
                        name: '水量',
                        min: 0,
                        max: 250,
                        interval: 50,
                        axisLabel: {
                            formatter: '{value} ml'
                        }
                    },
                    {
                        type: 'value',
                        name: '温度',
                        min: 0,
                        max: 25,
                        interval: 5,
                        axisLabel: {
                            formatter: '{value} °C'
                        }
                    }
                ],
                series: [{
                        name: '蒸发量',
                        type: 'bar',
                        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                    },
                    {
                        name: '降水量',
                        type: 'bar',
                        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                    },
                    {
                        name: '平均温度',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                    }
                ]
            };

            echartsC.setOption(optionC);

            var echartsB = echarts.init(document.getElementById('tpl-echarts-B'));
            optionB = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    x: 'center',
                    data: ['某软件', '某主食手机', '某水果手机', '降水量', '蒸发量']
                },
                radar: [{
                        indicator: [
                            { text: '品牌', max: 100 },
                            { text: '内容', max: 100 },
                            { text: '可用性', max: 100 },
                            { text: '功能', max: 100 }
                        ],
                        center: ['25%', '40%'],
                        radius: 80
                    },
                    {
                        indicator: [
                            { text: '外观', max: 100 },
                            { text: '拍照', max: 100 },
                            { text: '系统', max: 100 },
                            { text: '性能', max: 100 },
                            { text: '屏幕', max: 100 }
                        ],
                        radius: 80,
                        center: ['50%', '60%'],
                    },
                    {
                        indicator: (function() {
                            var res = [];
                            for (var i = 1; i <= 12; i++) {
                                res.push({ text: i + '月', max: 100 });
                            }
                            return res;
                        })(),
                        center: ['75%', '40%'],
                        radius: 80
                    }
                ],
                series: [{
                        type: 'radar',
                        tooltip: {
                            trigger: 'item'
                        },
                        itemStyle: { normal: { areaStyle: { type: 'default' } } },
                        data: [{
                            value: [60, 73, 85, 40],
                            name: '某软件'
                        }]
                    },
                    {
                        type: 'radar',
                        radarIndex: 1,
                        data: [{
                                value: [85, 90, 90, 95, 95],
                                name: '某主食手机'
                            },
                            {
                                value: [95, 80, 95, 90, 93],
                                name: '某水果手机'
                            }
                        ]
                    },
                    {
                        type: 'radar',
                        radarIndex: 2,
                        itemStyle: { normal: { areaStyle: { type: 'default' } } },
                        data: [{
                                name: '降水量',
                                value: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3],
                            },
                            {
                                name: '蒸发量',
                                value: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3]
                            }
                        ]
                    }
                ]
            };
            echartsB.setOption(optionB);
            var echartsA = echarts.init(document.getElementById('tpl-echarts-A'));
            option = {

                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    data: ['邮件', '媒体', '资源']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: true,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }],

                yAxis: [{
                    type: 'value'
                }],
                series: [{
                        name: '邮件',
                        type: 'line',
                        stack: '总量',
                        areaStyle: { normal: {} },
                        data: [120, 132, 101, 134, 90, 230, 210],
                        itemStyle: {
                            normal: {
                                color: '#59aea2'
                            },
                            emphasis: {

                            }
                        }
                    },
                    {
                        name: '媒体',
                        type: 'line',
                        stack: '总量',
                        areaStyle: { normal: {} },
                        data: [220, 182, 191, 234, 290, 330, 310],
                        itemStyle: {
                            normal: {
                                color: '#e7505a'
                            }
                        }
                    },
                    {
                        name: '资源',
                        type: 'line',
                        stack: '总量',
                        areaStyle: { normal: {} },
                        data: [150, 232, 201, 154, 190, 330, 410],
                        itemStyle: {
                            normal: {
                                color: '#32c5d2'
                            }
                        }
                    }
                ]
            };
            echartsA.setOption(option);
        }
}
    
    // import EChart from '@/components/EChart'
    // export default {
    //     components: {
    //         'v-chart': EChart
    //     },
    // }
</script>