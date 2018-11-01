<template>

  <div class="tpl-content-wrapper">
    <div class="tpl-content-page-title">
      督学管理
    </div>
    <div class="tpl-portlet-components">
      <div class="portlet-title">
        <div class="caption font-green bold">
          <span class="am-icon-code"></span> 选择老师
        </div>
        <div class="am-u-md-3">
          <button type="button" @click="back" class="am-btn am-btn-default am-btn-secondary"><span class="am-icon-undo"></span> 返回</button>
          <button type="button" @click="checkok" class="am-btn am-btn-success am-btn-secondary"><span class="am-icon-check"></span> 选好了</button>
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

      <div class="tpl-block">
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
      teacher_college:'计算机与信息工程学院',
      checked_id:[],
      checked:false
    }
  },
  mounted() {
    this.edu=this.$route.query;
    this.axios.get(_global.baseUrl + 'user_by_college?college='+this.teacher_college).then(body => {
      if(body.data.status==200){
        this.content = body.data.data;
      }else if(body.data.status==400){
        this.content=[]
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
      select(){
        this.axios.get(_global.baseUrl + 'user_by_college?college='+this.teacher_college).then(body => {
          if(body.data.status==200){
            this.content = body.data.data;
          }else if(body.data.status==400){
            AMUI.dialog.alert({
              content: '该学院所有老师都已被分配！'
            });
            this.content=[]
          }
        })
      },
      checkAll(event){
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
        }else{
          AMUI.dialog.confirm({
            content: '确定要添加吗？',
            onConfirm: function() {
              var loading=AMUI.dialog.loading({
                title:'正在添加，请稍等'
              });
              var params = new URLSearchParams();
              params.append('edu_id', that.edu.id);
              params.append('staff_ids', that.checked_id);
              that.axios.post(_global.baseUrl + 'edu_toAddTeacher',params).then(res => {
                if(res.data.status==200){
                  loading.modal('close')
                  AMUI.dialog.alert({
                    content:'添加成功',
                    onConfirm:function(){
                      that.axios.get(_global.baseUrl + 'user_by_college?college='+that.teacher_college).then(body => {
                        if(body.data.status==200){
                          that.content = body.data.data;
                        }else if(body.data.status==400){
                          AMUI.dialog.alert({
                            content:'该学院所有老师都已被分配！'
                          });
                          that.content=[]
                        }
                      })}
                    });
                }else if(res.data.status==400){
                  loading.modal('close')
                  AMUI.dialog.alert({
                    content: res.data.message
                  });
                }else{
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