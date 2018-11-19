<template>
  <div class="tpl-content-wrapper"> 
            <div class="tpl-portlet-components">
                <div class="portlet-title">
                    <div class="caption font-green bold">
                        <span class="am-icon-code"></span> 申请表
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

                    <div class="am-g">
                        <div class="tpl-form-body tpl-form-line">
                            <div class="am-form tpl-form-line-form">
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

                                <div class="am-form-group">
                                    <label for="user-weibo" class="am-u-sm-3 am-form-label">附件 <span class="tpl-form-line-small-title">attachment</span></label>
                                    <div class="am-u-sm-9">
                                        <div class="am-form-group am-form-file">
                                            <button type="button" class="am-btn am-btn-danger am-btn-sm">
    <i class="am-icon-cloud-upload"></i> 上传附件</button>
                                            <input @change="subFile" id="doc-form-file" type="file" >
                                        </div>
                                    </div>
                                </div>

                                <div class="am-form-group">
                                    <div class="am-u-sm-9 am-u-sm-push-3">
                                        <button type="button" @click="subForm" class="am-btn am-btn-primary tpl-btn-bg-color-success " data-am-modal="{target: '#your-modal'}">提交并通知 </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import _global from '../../components/Global'

var config = {
    Bucket: 'ladybird-1254250597',
    Region: 'ap-beijing'
};
var TaskId;
var showLogText = function (text, color) {
    if (typeof text === 'object') {
        try {
            text = JSON.stringify(text);
        } catch (e) {
        }
    }
};
var logger = {
    log: function (text) {
        console.log.apply(console, arguments);
        var args = [].map.call(arguments, function (v) {
            return typeof v === 'object' ? JSON.stringify(v) : v;
        });
        showLogText(args.join(' '));
    },
    error: function (text) {
        showLogText(text, 'red');
    },
};
var util = {
    createFile: function (options) {
        var buffer = new ArrayBuffer(options.size || 0);
        var arr = new Uint8Array(buffer);
        [].forEach.call(arr, function (char, i) {
            arr[i] = 0;
        });
        var opt = {};
        options.type && (opt.type = options.type);
        var blob = new Blob([buffer], options);
        return blob;
    }
};
var cos = new COS({
    getAuthorization: function (options,callback) {

    var authorization = COS.getAuthorization({
        SecretId: 'AKIDIUSq8Fjzb2Im9QrTRNBqS0Nfp8e4Co9J',
        SecretKey: '8A1iFbmYBg0vfEfv1v35wcKrDYlpjS0Q',
        Method: options.Method,
        Key: options.Key,
        Query: options.Query,
        Headers: options.Headers,
        Expires: 60,
    });
    callback(authorization);
    }
});
export default {
  name: 'Approving_detail',
  data() {
    return {
        content: '',
        fileName: '',
        message: '',
        loading: false
    }
  },
  mounted() {
    var loading=AMUI.dialog.loading({
        title:'正在加载，请稍等'
    });
    this.axios.get(_global.baseUrl + 'find_form?form_id=' + this.$route.query.id).then(body => {
        loading.modal('close')
      this.content = body.data.data;
    })
  },
  methods: {
    subFile: function(e) {
        var _this = this;

        var file = e.target.files[0];
        var et = '.' + file.name.split('.')[1];
        var timestamp = new Date().getTime();
        var fileName = timestamp + et;
        _this.fileName = fileName;
        
        if (file) {
            if (file.size > 1024 * 1024) {
                cos.sliceUploadFile({
                    Bucket: config.Bucket, // Bucket 格式：test-1250000000
                    Region: config.Region,
                    Key: fileName,
                    Body: file,
                    TaskReady: function (tid) {
                        TaskId = tid;
                    },
                    onHashProgress: function (progressData) {
                        logger.log('onHashProgress', JSON.stringify(progressData));
                    },
                    onProgress: function (progressData) {
                        logger.log('onProgress', JSON.stringify(progressData));
                    },
                }, function (err, data) {
                    logger.log(err || data);
                });
            } else {
                cos.putObject({
                    Bucket: config.Bucket, // Bucket 格式：test-1250000000
                    Region: config.Region,
                    Key: fileName,
                    Body: file,
                    TaskReady: function (tid) {
                        TaskId = tid;
                    },
                    onProgress: function (progressData) {
                        logger.log(JSON.stringify(progressData));
                    },
                }, function (err, data) {
                    logger.log(err || data);
                    if(!err) {
                        AMUI.dialog.alert({
                          title: ' ',
                          content: '上传成功',
                          onConfirm: function() { console.log('close');
                          }
                        });
                    }
                });
            }
        }
    },
    subForm: function() {
        var _this = this;
        var $loading = AMUI.dialog.loading();
        if(_this.fileName) {
            _this.axios.get(_global.baseUrl + 'sub_attachment?form_id=' + _this.$route.query.id + '&atta_name='+_this.fileName).then(body => {

            if(body.data.status == 200) {

                _this.axios.get(_global.baseUrl + 'last_relayForChangeCourse?form_id=' + _this.$route.query.id).then(body => {
                if(body.data.status == 200) {
                    _this.message = body.data.message;
                    $loading.modal('close');
                    AMUI.dialog.alert({
                      title: ' ',
                      content: _this.message
                    });
                } else {
                    _this.message = body.data.message;
                    $loading.modal('close');
                    AMUI.dialog.alert({
                      title: ' ',
                      content: _this.message
                    });
                }
            })
                

            }else {
                _this.message = body.data.message;
                    $loading.modal('close');
                    AMUI.dialog.alert({
                      title: ' ',
                      content: _this.message
                    });
            }
        })
        }else {
            $loading.modal('close');
            AMUI.dialog.alert({
              title: ' ',
              content: '请上传附件'
            });
}
    },
    back: function() {
        this.$router.go(-1);
    }
  }
};
</script>