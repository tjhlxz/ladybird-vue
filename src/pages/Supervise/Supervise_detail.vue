<template>

  <div class="tpl-content-wrapper">
    <div class="tpl-content-page-title">
      督学管理
    </div>
    <div class="tpl-portlet-components">
      <div class="portlet-title">
        <div class="caption font-green bold">
          <span class="am-icon-code"></span> 查看详情
        </div>
        <div class="am-u-md-3">
          <button type="button" @click="back" class="am-btn am-btn-default am-btn-secondary"><span class="am-icon-undo"></span> 返回</button>
          <button type="button" @click="checkok" class="am-btn am-btn-danger"><span class="am-icon-trash-o"></span>  移除</button>
        </div>
      </div>
      <div class="portlet-title">
        <div class="caption font-black bold">
          督学信息：
        </div>
        <div class="caption bold">
          <label class="font-green">{{edu.staff_name}}&nbsp;{{edu.id}}&nbsp;{{edu.college}}&nbsp;&nbsp;&nbsp;&nbsp;</label>
        </div>
        <div class="caption  bold">
          <label class="font-black">负责学院:</label>
          <label class="font-green" v-for='(item, index) in teacher_college'>{{item}}&nbsp;</label>
        </div>
        <div class="caption  bold">
          <label class="font-black">&nbsp;&nbsp;&nbsp;&nbsp;共负责<label class="font-green">{{content.length}}</label>人</label>
        </div>
      </div>
      <div class="tpl-block">

        <div class="am-g">

        </div>
        <div class="am-g">
          <div class="am-u-sm-12">

          </div>
        </div>
        
        <div class="am-g">
          <div class="am-u-sm-12">
            <form class="am-form" >
              <table class="am-table am-table-striped am-table-hover table-main">
                <thead>
                  <tr>
                    <th class="table-title"><input type="checkbox" class="tpl-table-fz-check" @click="checkAll" :checked="checked"/>&nbsp;全选</th>
                    <th class="tatypeble-id">学工号</th>
                    <th class="table-title">姓名</th>
                    <th class="table-author am-hide-sm-only">所属院系</th>
                  </tr>
                </thead>
                <tbody v-for='(item, index) in content'>
                  <tr>
                    <td class="am-hide-sm-only" ><input type="checkbox" :value="item.staff_id" v-model="checked_id"/></td>
                    <td class="am-hide-sm-only">{{item.staff_id}}</td>
                    <td class="am-hide-sm-only">{{item.staff_name}}</td>
                    <td class="am-hide-sm-only">{{item.college}}</td>
                  </tr>
                </tbody>
              </table>
              <div class="am-cf">
                <div class="am-fr">
                  <ul class="am-pagination tpl-pagination">
                    <li class="am-disabled"><a href="#">«</a></li>
                    <li class="am-active"><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
                    <li><a href="#">»</a></li>
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
  name: 'Supervise_setting',
  data() {
    return {
      content: {
      },
      edu:{
        id:'',
        staff_name:'',
        college:''
      },
      checked_id:[],
      checked:false,
      teacher_college:[]
    }
  },
  mounted() {
    this.edu=this.$route.query;
    this.axios.get(_global.baseUrl + 'edu_toTeacher?edu_id='+this.edu.id).then(body => {
      if(body.status==200){
        this.content = body.data.data;
        this.teacher_college=[];
        this.teacher_college.push(this.content[0].college);
        for(var i=1;i<this.content.length;i++){
         if(this.content[i].college!==this.content[i-1].college){
          this.teacher_college.push(this.content[i].college);
        }
      }
    }
  })
  },
  methods: {
    detail: function() {
        // this.$router.push({path:'/form-line',query:{id:item.form_id}})
      },
      back: function() {
        this.$router.go(-1);
      },
      checkAll(){
        if(this.checked==false){
          this.checked=true;
          for(var i=0;i<this.content.length;i++){
            this.checked_id.push(this.content[i].staff_id);
          }
        }
        else{
          this.checked=false;
          this.checked_id=[]
        }
      },
      checkok(){   
        var that=this;
        if (that.checked_id.length==0) {
          AMUI.dialog.alert({
            content: '您还没有选择老师!'
          });
        }
        else{
          AMUI.dialog.confirm({
            content: '移除后不可撤回，确定要移除吗？',
            onConfirm: function() {
              var loading=AMUI.dialog.loading({
                title:'正在移除，请稍等'
              });
              var params = new URLSearchParams();
              params.append('staff_id', that.checked_id);
              that.axios.post(_global.baseUrl + 'edu_delete_teacher',params).then(res => {
                if(res.data.status==200){
                  loading.modal('close')
                  AMUI.dialog.alert({
                    content:'移除成功',
                    onConfirm:function(){
                      that.axios.get(_global.baseUrl + 'edu_toTeacher?edu_id='+that.edu.id).then(body => {
                        if(body.status==200){
                          that.content = body.data.data;
                          that.teacher_college=[];
                          that.teacher_college.push(that.content[0].college);
                          for(var i=1;i<that.content.length;i++){
                           if(that.content[i].college!==that.content[i-1].college){
                            that.teacher_college.push(that.content[i].college);
                          }
                        }
                      }else{
                        AMUI.dialog.alert({
                          content: body.data.message
                        });
                      }
                    })
                    }
                  })
                }else if(res.data.status==400){
                  loading.modal('close')
                  AMUI.dialog.alert({
                    content: res.data.message
                  });
                }
                else{
                  loading.modal('close')
                  AMUI.dialog.alert({
                    content: '失败，请重试'
                  });
                }
              })
            } 
          });
        }
      }
    }
  };
  </script>