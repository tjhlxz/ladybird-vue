<template>
  <div>
    <Header></Header>
    <Sider></Sider>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import Sider from '@/components/Sider'
  export default {
    name: 'Main',
    data() {
      return {

      }
    },
    components: {Header, Sider},
    mounted() {
      var $fullText = $('.admin-fullText');
        $('#admin-fullscreen').on('click', function() {
            $.AMUI.fullscreen.toggle();
        });

        $(document).on($.AMUI.fullscreen.raw.fullscreenchange, function() {
            $fullText.text($.AMUI.fullscreen.isFullscreen ? '退出全屏' : '开启全屏');
        });

        // var dataType = $('body').attr('data-type');
        // for (var key in pageData) {
        //     if (key == dataType) {
        //         pageData[key]();
        //     }
        // }

        $('.tpl-switch').find('.tpl-switch-btn-view').on('click', function() {
            $(this).prev('.tpl-switch-btn').prop("checked", function() {
                    if ($(this).is(':checked')) {
                        return false
                    } else {
                        return true
                    }
            })
        })
            
        $('.tpl-header-nav-hover-ico').on('click', function() {
            $('.tpl-left-nav').toggle();
            $('.tpl-content-wrapper').toggleClass('tpl-content-wrapper-hover');
        })

    },
    methods: {
      
    }
  }

</script>
<style>
  
</style>
