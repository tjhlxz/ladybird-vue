<template>
  <div class="tpl-content-wrapper"> 
            <div class="tpl-portlet-components">
                <div class="portlet-title">
                    <div class="caption font-green bold">
                        <span class="am-icon-code"></span> 申请表
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
                                    <button type="button" @click="back" class="am-btn am-btn-default am-btn-secondary"><span class="am-icon-undo"></span> 返回</button>
                                </div>
                            </div>
                        </div>
                    </div>
<section ref="print">
                    <div class="am-g" style="border: 1px solid #000;">
                        <div class="tpl-form-body tpl-form-line">
                            <form class="am-form tpl-form-line-form">
                                <div class="am-form-group">
                                    <label for="user-name" class="am-u-sm-3 am-form-label">姓名 <span class="tpl-form-line-small-title">Name</span></label>
                                    <div class="am-u-sm-9">
                                        <input type="text" class="tpl-form-input" id="user-name" v-model='content.form_proposer_name' readonly style="background-color: #fff"/>
                                    </div>
                                </div>

                                <div class="am-form-group">
                                    <label for="user-email" class="am-u-sm-3 am-form-label">所属院系 <span class="tpl-form-line-small-title">college</span></label>
                                    <div class="am-u-sm-9">
                                        <input type="text" class="am-form-field tpl-form-no-bg" v-model="content.form_college" readonly/>
                                    </div>
                                </div>

                                <div class="am-form-group">
                                    <label for="user-email" class="am-u-sm-3 am-form-label">所属教研室 <span class="tpl-form-line-small-title">room</span></label>
                                    <div class="am-u-sm-9">
                                        <input type="text" class="am-form-field tpl-form-no-bg" v-model="content.form_staff_room" readonly/>
                                    </div>
                                </div>

                                <div class="am-form-group">
                                    <label for="user-email" class="am-u-sm-3 am-form-label">申请时间 <span class="tpl-form-line-small-title">Time</span></label>
                                    <div class="am-u-sm-9">
                                        <input type="text" class="am-form-field tpl-form-no-bg" v-model="content.create_time" disabled/>
                                    </div>
                                </div>

                                <div class="am-form-group">
                                    <label for="user-email" class="am-u-sm-3 am-form-label">课程 <span class="tpl-form-line-small-title">course</span></label>
                                    <div class="am-u-sm-9">
                                        <input type="text" class="am-form-field tpl-form-no-bg" v-model="content.form_course" disabled/>
                                    </div>
                                </div>
                                
                                <div v-if="content.form_type-1">
                                    <div class="am-form-group">
                                        <label for="user-email" class="am-u-sm-3 am-form-label">调整前 <span class="tpl-form-line-small-title">before</span></label>
                                        <div class="am-u-sm-9">
                                            <input type="text" class="am-form-field tpl-form-no-bg" v-model="content.form_before_adjust" disabled/>
                                        </div>
                                    </div>

                                    <div class="am-form-group">
                                        <label for="user-email" class="am-u-sm-3 am-form-label">调整后 <span class="tpl-form-line-small-title">later</span></label>
                                        <div class="am-u-sm-9">
                                            <input type="text" class="am-form-field tpl-form-no-bg" v-model="content.form_later_adjust" disabled/>
                                        </div>
                                    </div>
                                </div>

                                    <div class="am-form-group">
                                        <label for="user-intro" class="am-u-sm-3 am-form-label">申请内容</label>
                                        <div class="am-u-sm-9">
                                            <textarea class="" rows="10" id="user-intro" v-model="content.form_reason" readonly style="background-color: #fff"></textarea>
                                        </div>
                                    </div>
                                
                                <div class="am-modal am-modal-no-btn" tabindex="-1" id="your-modal">
                                  <div class="am-modal-dialog">
                                    <div class="am-modal-bd">
                                      <!-- {{message}} -->
                                    </div>
                                    <div class="am-modal-bd" v-if="isShow">
                                      <span class="am-icon-spinner am-icon-spin"></span>
                                    </div>
                                  </div>
                                </div>

                                <div class="am-form-group no-print">
                                    <div class="am-u-sm-9 am-u-sm-push-3">
                                        <button type="button" @click="print" class="am-btn am-btn-primary tpl-btn-bg-color-success " data-am-modal="{target: '#my-modal-loading'}">打印 </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
</section>
                </div>
            </div>
        </div>
</template>

<script>
  import _global from '../components/Global'

  export default {
  name: 'ApprovedDetail',
  data() {
    return {
        content: '',
        isShow: false
    }
  },
  mounted() {

    this.axios.get(_global.baseUrl + 'find_form?form_id=' + this.$route.query.id).then(body => {
      this.content = body.data.data;
      console.log(this.content)
    })
  },
  methods: {
    print: function(e) {
      this.$print(this.$refs.print)
    },
    back: function() {
        this.$router.go(-1);
    }
  }
}
</script>