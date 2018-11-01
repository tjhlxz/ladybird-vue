<template>
  <div class="tpl-content-wrapper">
    <div class="tpl-content-page-title">
        督学管理
    </div>
    <div class="tpl-portlet-components">
        <div class="portlet-title">
            <div class="caption font-green bold">
                <span class="am-icon-bell-o"></span> 暂未分配
            </div>
            <div class="caption font-black bold">
                <label>&nbsp;&nbsp;(共&nbsp;{{this.count}}&nbsp;名老师未分配督学)</label>
            </div>
        </div>
        <div class="tpl-block">
            <div class="am-g">
                <div class="am-u-sm-12">
                    <form class="am-form" >
                        <table class="am-table am-table-striped am-table-hover table-main">
                            <thead>
                                <tr>
                                    <th class="table-author am-hide-sm-only">所属院系</th>
                                    <th class="table-name">总数</th>
                                </tr>
                            </thead>
                            <tbody v-for='(item, index) in college'>
                                <tr>
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

    </div>

</div>
</template>
<script>
import _global from '../../components/Global'
export default {
  name: 'Supervise_wait',
  data() {
    return {
        content: {

        },
        count:'',
        college:[],
        college_count:[]
    }
},
mounted() {
    this.axios.get(_global.baseUrl + 'edu_noTeacher').then(res => {
      this.content=res.data.data.no_edu_teacher;
      this.count=res.data.data.count;
      var college=[];
      this.college.push(this.content[0].college)
      for(var i=1;i<this.count;i++){
        if(this.content[i].college!==this.content[i-1].college){
            this.college.push(this.content[i].college)
      }
  }
  for(var a=0;a<this.college.length;a++){
    var count=0;
    for(var b=0;b<this.count;b++){
        if (this.content[b].college==this.college[a]) {
            count++;
        }
    }
    this.college_count.push(count);
  }
  })
},
methods: {
}
};
</script>