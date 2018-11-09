<template>
	<div class="tpl-content-wrapper">
		<div class="tpl-content-page-title">
			任务管理
		</div>
		<div class="tpl-portlet-components">
			<div class="portlet-title">
				<div class="caption font-green bold">
					<span class="am-icon-file-text-o"></span> 任务详情
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
					<label class="font-green" v-for='(item, index) in temp'>{{item}}&nbsp;</label>
				</div>
				<div class="caption  bold">
					<label class="font-black">&nbsp;&nbsp;&nbsp;&nbsp;共负责<label class="font-green">{{content.length}}</label>人</label>
				</div>
			</div>
			<div class="tpl-block"> 
				<div class="" >
					<button type="button" style="margin-left:10px" @click="back" class="am-btn am-btn-default am-btn-secondary"><span class="am-icon-undo"></span> 返回</button>
					<button type="button"  style="margin-left:10px" @click="checkok" class="am-btn am-btn-danger"><span class="am-icon-trash-o"></span>  移除</button>
					<router-link :to="{path:'/ladybird_cms/supervise-setting',query:{id:edu.id,staff_name:edu.staff_name,college:edu.college}}">
						<button type="button"  style="margin-left:10px" class="am-btn am-btn-success"><span class="am-icon-plus"></span>  添加更多</button>
					</router-link>
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
										<th>所属院系</th>
									</tr>
								</thead>
								<tbody v-for='(item, index) in content'>
									<tr>
										<td class="am-hide-sm-only" ><input type="checkbox" :value="item.staff_id" v-model="checked_id"/></td>
										<td class="am-hide-sm-only">{{item.staff_id}}</td>
										<td class="am-hide-sm-only">{{item.staff_name}}</td>
										<td>{{item.college}}</td>
									</tr>
								</tbody>
							</table>
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
	name: 'Supervise_detail',
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
			teacher_college:[],
			temp:[]
		}
	},
	mounted() {
		var loading=AMUI.dialog.loading({
			title:'正在加载，请稍等'
		});
		this.edu=this.$route.query;
		this.axios.get(_global.baseUrl + 'edu_toTeacher?edu_id='+this.edu.id).then(body => {
				loading.modal('close');
			if(body.status==200){
				this.content = body.data.data;
				for(var i=0;i<this.content.length;i++){
					this.teacher_college.push(this.content[i].college)
				}
				var temp=[]
				for(var j=0;j<this.teacher_college.length;j++){
					if(temp.indexOf(this.teacher_college[j])==-1){
						temp.push(this.teacher_college[j]);
					}
				}
				this.temp=temp;
			}else{
				AMUI.dialog.alert({
					content: body.data.message
				});
			}
		})
	},
	methods: {
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
										var loading=AMUI.dialog.loading({
											title:'正在加载，请稍等'
										});
										that.content=[];
										that.teacher_college=[];
										that.edu=that.$route.query;
										that.axios.get(_global.baseUrl + 'edu_toTeacher?edu_id='+that.edu.id).then(body => {
											if(body.status==200){
												loading.modal('close');
												that.content = body.data.data;
												for(var i=0;i<that.content.length;i++){
													that.teacher_college.push(that.content[i].college)
												}
												var temp=[]
												for(var j=0;j<that.teacher_college.length;j++){
													if(temp.indexOf(that.teacher_college[j])==-1){
														temp.push(that.teacher_college[j]);
													}
												}
												that.temp=temp;
												console.log(that.temp)
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