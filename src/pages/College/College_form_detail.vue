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
                    <div class="kuang" style="border: 1px solid #000;">
                        <div class="row num1">
                            <div class="number1">单&nbsp;位</div>
                            <div class="number5">{{content.form_college}}</div>
                            <div class="number6">教&nbsp;研&nbsp;室</div>
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
                                        <div v-for="item in date_before">{{item}}</div>
                                        <div v-for="item3 in before">{{item3}}</div>
                                    </div>
                                    <div class="number9">
                                        <div v-for="item1 in date_after">{{item1}}</div>
                                        <div v-for="item4 in before">{{item4}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="number1 num3">原&nbsp;&nbsp;因</div>
                            <div style="padding:5px 5px;width:750px;text-align: left;font-size: 18px;">{{content.form_reason}}</div>
                        </div>
                        <div class="row number3">
                            <div class="number2">教研室意见</div>
                            <div class="agree">同意</div>
                            <div style="margin-top:50px;margin-left:100px;width:220px;">
                                <div>教研室主任：{{leader[0]}}</div>
                                <div>{{datetime[1]}}</div>
                            </div>
                        </div>
                        <div class="row number3">
                            <div class="number2">教学单位意见</div>
                            <div class="agree">同意</div>
                            <div style="margin-top:50px;margin-left:100px;width:220px;">
                                <div>主管教学领导：{{leader[1]}}</div>
                                <div>{{datetime[2]}}</div>
                            </div>
                        </div>
                        <div class="row number3">
                            <div class="number2">教务处意见</div>
                            <div class="agree">同意</div>
                            <div style="margin-top:50px;margin-left:100px;width:220px;">
                                <div>教务处副处长：{{leader[2]}}</div>
                                <div>{{datetime[3]}}</div>
                            </div>
                        </div>
                        <div class="row last">
                            <div class="number1 beizhu">备&nbsp;&nbsp;注</div>
                            <div class="content">
                                        <div class="item">1.调串类型：调串申请时教师课表不会发生永久变化，此时无附件。<br></div>
                                        <div class="item">&nbsp;&nbsp;&nbsp;A.临时代课：调整前后时间保持不变填写，明确填写代课教师；<br></div>
                                        <div class="item">&nbsp;&nbsp;&nbsp;B.临时顺延：调整前后时间地点按二级学院教务科实际可行填写，代课教师可不填；<br></div>
                                        <div class="item">&nbsp;&nbsp;&nbsp;C.临时调串：若干次调串时间地点按二级学院教务科实际可行填写，代课教师可不填；<br></div>
                                        <div class="item">2.变更类型：变更申请时教师课表将永久变化，教务处教务科变更后新课表详见附件。<br></div>
                                        <div class="item">&nbsp;&nbsp;&nbsp;A.教师永久性变更：申请整门课程的任课教师永久性变更。<br></div>
                                        <div class="item">&nbsp;&nbsp;&nbsp;B.时间地点久性变更：申请整门课的上课时间地点永久性变更。<br></div>
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
            loading.modal('close')
          this.content = body.data.data;
          this.date_before=this.content.form_before_adjust.split(',');
          this.date_after=this.content.form_later_adjust.split(',');
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
.print_box {
    width:100%;
    margin: 0 auto;
}
.heikeji{

    font-size: 25px;
    letter-spacing:4px;
}
.print{
    width: 900px;
    font-family:SimSun;
    font-size: 20px;
    font-weight: 700;
    padding:10px 23px;
}
.form{
    font-size: 40px;
    font-weight: 700;
    font-family: SimHei;
}
.kuang{
    width: 850px;
}
.type{
    display: flex;
    flex-direction: row;
    margin-top: 20px;
}
.row{
    width: 850px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #000;
}
.last{
    border-bottom: none;
    height: 250px;

}
.item{
    line-height: 28px;
    text-align: left;
    font-size: 18px;
    margin-bottom: 3px;
}
.beizhu{
    height:250px;
    line-height: 250px;
    text-align: center;
}
.content{
    font-family: SimHei;
    width: 800px;
    padding: 20px 10px;
}
.biandong{
    height: 150px;
}
.number1{
    width: 100px;
    border-right: 1px solid #000;
}
.number2{
    height: 120px;
    line-height: 120px;
    text-align: center;
    width: 180px;
    border-right: 1px solid #000;
}
.number3{
    height: 120px;
}
.num3{
    height: 130px;
    line-height: 130px;
    text-align: center;

}
.number4{
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #000;
    height: 30px;
}
.number5{
    width: 250px;
    border-right: 1px solid #000;
}
.number6{
    width: 130px;
    border-right: 1px solid #000;
}
.number7{
    width:330px;
}
.number8{
    width:380px;
    border-right: 1px solid #000;
}
.number9{
    width:330px;
}
.num1{
    height: 60px;
    line-height: 60px;
    text-align: center;
}
.num2{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.agree{
    margin: 40px 130px;
    font-size: 28px;
}
.num4{
    height:150px;
    display: flex;
    flex-direction: column;
    width: 750px;
    font-size: 18px;
}
.num5{
    display: flex;
    flex-direction: row;
    width: 750px;
    height: 120px;
}
@page{
    size:  auto;   /* auto is the initial value */
    margin: 0mm;  /* this affects the margin in the printer settings */
}  
</style>