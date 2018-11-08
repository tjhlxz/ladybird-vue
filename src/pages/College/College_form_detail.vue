<template>
  <div class="tpl-content-wrapper"> 
    <div class="tpl-portlet-components">
        <div class="portlet-title">
            <div class="caption font-green bold">
                <span class="am-icon-code"></span> 课程表变更审批表
            </div>
        </div>

        <div class="tpl-block">
            <div class="am-g">
                <div class="am-u-sm-12 am-u-md-6">
                    <div class="am-btn-toolbar">
                        <div class="am-btn-group am-btn-group-xs">
                            <button type="button" @click="back" class="am-btn am-btn-default am-btn-secondary"><span class="am-icon-undo"></span> 返回</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="print_box">
                <div id="print_page">
                    <center>
                        <div class="print">
                            <center><div class="heikeji">黑龙江科技大学</div></center>
                            <center><div class="form">课程表变更审批表</div></center>
                            <center>
                                <div style="margin-right:350px;">申请时间：{{content.create_time}}</div>
                                <div class="kuang">
                                    <div class="row num1">
                                        <div class="number1">单&nbsp;位</div>
                                        <div class="number5">{{content.form_college}}</div>
                                        <div class="number6" style="letter-spacing:5px;">教研室</div>
                                        <div class="number7">{{content.form_staff_room}}</div>
                                    </div>
                                    <div class="row num1">
                                        <div class="number1">教&nbsp;师</div>
                                        <div class="number5">{{content.form_proposer_name}}</div>
                                        <div class="number6">课&nbsp;&nbsp;程</div>
                                        <div class="number7">{{content.form_course}}</div>
                                    </div>
                                    <div class="row biandong">
                                        <div class="number1 num2">
                                            <div class="type">
                                                <div>调串</div>
                                                <div v-if="content.form_type==2">
                                                    <img src='../../../static/assets/img/checked.png' style="width:20px;margin-top:4px;"/>
                                                </div>
                                                <div v-if="content.form_type==1">
                                                    <img src='../../../static/assets/img/nocheck.png' style="width:20px;margin-top:4px;"/>
                                                </div>
                                            </div>
                                            <div class="type">
                                                <div>变更</div>
                                                <div v-if="content.form_type==1">
                                                    <img src='../../../static/assets/img/checked.png' style="width:20px;margin-top:4px;"/>
                                                </div>
                                                <div v-if="content.form_type==2">
                                                    <img src='../../../static/assets/img/nocheck.png' style="width:20px;margin-top:4px;"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="num4">
                                            <div class="number4">
                                                <div  class="number8">调整前</div>
                                                <div class="number9">调整后</div>
                                            </div>
                                            <div class="num5">
                                            <div class="number8">
                                                <div v-if="date_before.length!==0" v-for="item in date_before">{{item}}</div>
                                                <div v-for="item3 in before">{{item3}}</div>
                                            </div>
                                            <div class="number9">
                                            <div v-if="date_before.length!==0" v-for="item1 in date_after">{{item1}}</div>
                                            <div v-for="item4 in before">{{item4}}</div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="number1 num3">原&nbsp;&nbsp;因</div>
                                        <div style="padding:5px 8px;width:16.5cm;text-align: left;font-size: 14pt;">{{content.form_reason}}</div>
                                    </div>
                                    <div class="row number3">
                                        <div class="number2">教研室意见</div>
                                        <div class="agree">同意</div>
                                        <div style="margin-top:50px;margin-left:200px;width:220px;">
                                            <div>教研室主任：{{leader[0]}}</div>
                                            <div>{{datetime[1]}}</div>
                                        </div>
                                    </div>
                                    <div class="row number3">
                                        <div class="number2">教学单位意见</div>
                                        <div class="agree">同意</div>
                                        <div style="margin-top:50px;margin-left:200px;width:220px;">
                                            <div>主管教学领导：{{leader[1]}}</div>
                                            <div>{{datetime[2]}}</div>
                                        </div>
                                    </div>
                                    <div class="row number3">
                                        <div class="number2">教务处意见</div>
                                        <div class="agree">同意</div>
                                        <div style="margin-top:50px;margin-left:200px;width:220px;">
                                            <div>教务处副处长：{{leader[2]}}</div>
                                            <div>{{datetime[3]}}</div>
                                        </div>
                                    </div>
                                    <div class="row last">
                                        <div class="number1 beizhu">备&nbsp;&nbsp;注</div>
                                        <div class="content">
                                            <div class="item">1.调串类型:调串申请时教师课表不会发生永久变化,此时无附件。<br></div>
                                            <div class="item">&nbsp;A.临时代课:调整前后时间保持不变填写,明确填写代课教师；<br></div>
                                            <div class="item">&nbsp;B.临时顺延:调整前后时间地点按二级学院教务科实际可行填写,代课教师可不填;<br></div>
                                            <div class="item">&nbsp;C.临时调串:若干次调串时间地点按二级学院教务科实际可行填写,代课教师可不填;<br></div>
                                            <div class="item">2.变更类型:变更申请时教师课表将永久变化,教务处教务科变更后新课表详见附件。<br></div>
                                            <div class="item">&nbsp;A.教师永久性变更:申请整门课程的任课教师永久性变更。<br></div>
                                            <div class="item">&nbsp;B.时间地点永久性变更:申请整门课的上课时间地点永久性变更。<br></div>
                                        </div>
                                    </div>
                                </div>
                            </center>
                        </div>
                    </center>
                </div>
            </div>
            <div class="am-u-sm-9 am-u-sm-push-3" style="margin-left:500px;">
                <button type="button" @click="print" class="am-btn am-btn-primary tpl-btn-bg-color-success " data-am-modal="{target: '#my-modal-loading'}">打印 </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import _global from '../../components/Global'

export default {
    name: 'College_form_detail',
    data() {
        return {
            content: '',
            isShow: false,
            datetime:[],
            leader:[],
            date_before:[],
            date_after:[],
            before:[]
        }
    },
    mounted() {
        var loading=AMUI.dialog.loading({
            title:'正在加载，请稍等'
        });
        this.axios.get(_global.baseUrl + 'find_form?form_id=' + this.$route.query.id).then(body => {
            loading.modal('close');
            
            this.content = body.data.data;
            if(this.content.form_before_adjust!==''){
            this.date_before=this.content.form_before_adjust.split(',');
            this.date_after=this.content.form_later_adjust.split(',');
            }
            else{
                this.date_before=[];
            }
            for(var i=0;i<4-this.date_before.length;i++){
                this.before.push('第 周 星期 第 节');
            }
            this.datetime=this.content.update_time.split(',');
            this.leader=this.content.form_flow_name.split(',');
        })
    },
    methods: {
        print: function(e) {
          $('#print_page').print({
            globalStyles: true,
            mediaPrint: false,
            stylesheet: null,
            noPrintSelector: ".no-print",
            iframe: false,
            append: null,
            prepend: null,
            manuallyCopyFormValues: true,
            deferred: $.Deferred()
        });
      },
      back: function() {
        this.$router.go(-1);
    }
}
};
</script>
<style media="print" type="text/css">
.heikeji{
    font-size: 16pt;
    letter-spacing:11px;
}
.print_box{
    width: 100%;
}
.print_page{
    width: 21cm;
    height:29.7cm;
}
.print{
    width: 21cm;
    height:29.7;
    font-family:SimSun;
    font-size: 14pt;
    padding:1.5cm 1cm;
}
.form{
    font-family:SimHei;
    height:1.5cm;
    line-height: 1.5cm;
    font-size: 28pt;
}
.kuang{
    width: 19cm;
    height:23cm;
    border:1pt solid #000;
}
.row{
    width: 19cm;
    display: flex;
    flex-direction: row;
    border-bottom: 1pt solid #000;
}
.number1{
    width:2.5cm;
    border-right: 1pt solid #000;
}
.num1{
    height:1.1cm;
    line-height: 1.1cm;
}
.number5{
    width: 5.2cm;
    border-right: 1pt solid #000;
}
.number6{
    width: 3cm;
    border-right: 1pt solid #000;
}
.number7{
    width: 8.2cm;
}
.biandong{
    height:3.3cm;
    line-height: 3.3cm
}
.num2{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.type{
    height:0.8cm;
    line-height: 0.8cm;
    margin-top: 0.5cm;
    display: flex;
    flex-direction: row;
}
.num4{
    width: 16.5cm;
}
.number4{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 1cm;
    line-height: 1cm;
    text-align: center;
    border-bottom:1pt solid #000;
}
.num3{
    height: 3cm;
    line-height: 3cm;
}
.number8{
    width:8.2cm;
    border-right: 1pt solid #000;
    display: flex;
    flex-direction: column;
}
.number9{
    width: 8.2cm;
}
.num5{
    height: 2.3cm;
    padding:0;
    display: flex;
    flex-direction: row;
}
.number8 div{
    height: 0.56cm;
    line-height: 0.56cm;
    font-size: 12pt;
}
.number9 div{
    height: 0.56cm;
    line-height: 0.56cm;
    font-size: 12pt;
}
.number2{
    width: 4.5cm;
    height: 3cm;
    line-height: 3cm;
    border-right: 1pt solid #000;
}
.agree{
    font-size: 24pt;
    margin-top: 1cm;
    margin-left: 1cm;
}
.beizhu{
    height:5.3cm;
    line-height: 5.3cm;
    text-align: center;
}
.last{
    border-bottom: 0;
    height: 5.3cm;
}
.content{
    padding: 0.2cm 0.1cm;
    font-family:SimHei;
    font-size: 12pt;
    height:5.3cm;
    line-height: 0.7cm;
    text-align: left;
}
@page{
    size:  auto;   /* auto is the initial value */
    margin: 0mm;  /* this affects the margin in the printer settings */
}  
</style>