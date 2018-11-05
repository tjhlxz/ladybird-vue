<template>
    <div class="tpl-content-wrapper">
        <div class="row">
            <div class="am-u-md-12 am-u-sm-12 row-mb">
                <div class="tpl-portlet">
                    <div class="tpl-portlet-title">
                        <div class="tpl-caption font-green ">
                            <i class="am-icon-cloud-download"></i>
                            <span> Cloud 数据统计</span>
                        </div>
                        <div class="actions">
                            <ul class="actions-btn">
                                <li class="red-on">昨天</li>
                                <li class="green">前天</li>
                                <li class="blue">本周</li>
                            </ul>
                        </div>
                    </div>

                    <!--此部分数据请在 js文件夹下中的 app.js 中的 “百度图表A” 处修改数据 插件使用的是 百度echarts-->
                    <div class="tpl-echarts" id="tpl-echarts-A">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Home',
  }
</script>