<template>
  <div class="tpl-content-wrapper">
    <div class="tpl-content-page-title">
      督学管理
    </div>
    <div class="tpl-portlet-components">
      <div class="portlet-title">
        <div class="caption font-green bold">
          <span class="am-icon-plus"></span> 添加督学
        </div>
      </div>
      <div class="tpl-block ">

        <div class="am-g tpl-amazeui-form">

          <div class="am-u-sm-12 am-u-md-9">
            <form class="am-form am-form-horizontal" @submit.prevent="add_edu">
              <div class="am-form-group">
                <label for="user-id" class="am-u-sm-3 am-form-label">督学教工号</label>
                <div class="am-u-sm-9">
                  <input type="text" id="user-id" maxlength="10" v-model="staff_id" placeholder="请在此处填写督学教工号">
                </div>
              </div>
              <div class="am-form-group">
                <label for="user-name" class="am-u-sm-3 am-form-label">督学姓名</label>
                <div class="am-u-sm-9">
                  <input type="text" id="user-name" maxlength="10" v-model="staff_name" placeholder="请在此处填写督学姓名">
                </div>
              </div>
              <div class="am-form-group">
                <div class="am-u-sm-9 am-u-sm-push-3">
                  <input type="submit" value="添加督学" class="am-btn am-btn-success">
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="portlet-title">
          <div class="caption font-green bold">
            <span class="am-icon-code"></span> 督学列表
          </div>
        </div>
        <div class="am-g">
          <div class="am-u-sm-12">
            <div class="am-form" >
              <table class="am-table am-table-striped am-table-hover table-main">
                <thead>
                  <tr>
                    <th class="table-title">教工号</th>
                    <th class="table-title">姓名</th>
                    <th class="table-author am-hide-sm-only">所属院系</th>
                    <th class="table-set">删除</th>
                  </tr>
                </thead>
                <tbody v-for='(item, index) in content'>
                  <tr>
                    <td class="am-hide-sm-only">{{item.staff_id}}</td>
                    <td class="am-hide-sm-only">{{item.staff_name}}</td>
                    <td class="am-hide-sm-only">{{item.college}}</td>
                    <td class="am-hide-sm-only"><button @click="edu_clear(index)" class="am-btn am-btn-default am-btn-xs am-hide-sm-only"><span class="am-icon-trash-o"></span> 删除</button></td>
                  </tr>
                </tbody>
              </table>
              <hr>
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
  name: 'Supervise_add',
  data(){
   return {
    content:[],
    staff_id:'',
    staff_name:''
  }
},
mounted() {
  var loading=AMUI.dialog.loading({
    title:'正在加载，请稍等'
  });
  this.axios.get(_global.baseUrl + 'edu_list').then(res => {
    if(res.status==200){
      loading.modal('close');
      this.content = res.data.data;
    }else{
      loading.modal('close');
      AMUI.dialog.alert({
        content: res.data.message
      });
    }
  })
},
methods: {
  detail: function() {
          // this.$router.push({path:'/form-line',query:{id:item.form_id}})
        },
        add_edu(e){
          if(this.staff_id==''){
            AMUI.dialog.alert({
              title: '提示',
              content: '请填写督学教工号'
            });
          }
          else{
            var regex="^\\d+$";
            if(/^[0-9]+$/.test(this.staff_id)==false||this.staff_id.length!==10){
              AMUI.dialog.alert({
                title: '提示',
                content: '教工号为10位数字'
              });
            }else{
              if(this.staff_name==''){
                AMUI.dialog.alert({
                  title: '提示',
                  content: '请填写督学姓名'
                });
              }else{
                var loading=AMUI.dialog.loading({
                  title:'正在添加，请稍等'
                });
                var params = new URLSearchParams();
                params.append('staff_id', this.staff_id);
                params.append('staff_name', this.staff_name);
                this.axios.post(_global.baseUrl + 'add_edu',params).then(res => {
                  loading.modal('close')
                  if(res.status==200){
                    this.axios.get(_global.baseUrl + 'edu_list').then(res => {
                      this.content = res.data.data;
                    })
                    this.staff_id=''
                    this.staff_name=''
                    AMUI.dialog.alert({
                      content: res.data.message
                    });
                  }
                  else if(res.status==400){
                    loading.modal('close')
                    this.staff_id=''
                    this.staff_name=''
                    AMUI.dialog.alert({
                      content: res.data.message
                    });
                  }else{
                    loading.modal('close')
                    AMUI.dialog.alert({
                      content: '添加失败请重试'
                    });
                  }
                })
              }
            }
          }
          
        },
        edu_clear(index){
          var that=this;
          AMUI.dialog.confirm({
            content:'删除后不可撤回，确定要删除吗?',
            onConfirm(){
              var loading=AMUI.dialog.loading({
                title:'正在删除，请稍等'
              });
              that.axios.get(_global.baseUrl + 'edu_clear?edu_id='+that.content[index].staff_id).then(res => {
                if(res.data.status==200){
                  loading.modal('close')
                  AMUI.dialog.alert({
                    content:'移除成功',
                    onConfirm:function(){
                      that.axios.get(_global.baseUrl + 'edu_list').then(res => {
                        that.content = res.data.data;
                      })
                    }
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
    };
    </script>